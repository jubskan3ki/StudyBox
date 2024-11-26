package event

import (
	request "backend/core/api/request/event"
	stores "backend/core/stores/event"
	"backend/core/utils"
	"backend/database/models"
	"errors"
	"fmt"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type EventManagementServiceType struct {
	eventStore       *stores.EventStoreType
	tagStore         *stores.EventTagStoreType
	categoryStore    *stores.EventCategoryStoreType
	tarifStore       *stores.EventTarifStoreType
	optionStore      *stores.EventOptionStoreType
	descriptionStore *stores.EventDescriptionStoreType
}

func EventManagementService(
	eventStore *stores.EventStoreType,
	tagStore *stores.EventTagStoreType,
	categoryStore *stores.EventCategoryStoreType,
	tarifStore *stores.EventTarifStoreType,
	optionStore *stores.EventOptionStoreType,
	descriptionStore *stores.EventDescriptionStoreType,
) *EventManagementServiceType {
	return &EventManagementServiceType{
		eventStore:       eventStore,
		tagStore:         tagStore,
		categoryStore:    categoryStore,
		tarifStore:       tarifStore,
		optionStore:      optionStore,
		descriptionStore: descriptionStore,
	}
}

func (s *EventManagementServiceType) DeleteEvent(eventID uint, userID uint, role string) error {
	// Récupérer l'événement par son ID
	event, err := s.eventStore.GetByID(eventID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return gorm.ErrRecordNotFound // Renvoie une erreur spécifique
		}
		return fmt.Errorf("erreur lors de la récupération de l'événement : %w", err)
	}

	// Vérifier si l'utilisateur est Admin ou est le propriétaire de l'événement
	if role != "Admin" && event.OwnerID != userID {
		return errors.New("non autorisé à supprimer cet événement")
	}

	// Démarrer une transaction
	tx := s.eventStore.GetDB().Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Supprimer les descriptions associées
	if err := s.descriptionStore.DeleteByEventIDWithTx(eventID, tx); err != nil {
		tx.Rollback()
		return fmt.Errorf("erreur lors de la suppression des descriptions : %w", err)
	}

	// Supprimer les options associées
	if err := s.optionStore.DeleteByEventIDWithTx(eventID, tx); err != nil {
		tx.Rollback()
		return fmt.Errorf("erreur lors de la suppression des options : %w", err)
	}

	// Supprimer les tarifs associés
	if err := s.tarifStore.DeleteByEventIDWithTx(eventID, tx); err != nil {
		tx.Rollback()
		return fmt.Errorf("erreur lors de la suppression des tarifs : %w", err)
	}

	// Supprimer l'événement lui-même
	if err := s.eventStore.DeleteWithTx(eventID, tx); err != nil {
		tx.Rollback()
		return fmt.Errorf("erreur lors de la suppression de l'événement : %w", err)
	}

	// Commit de la transaction
	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("erreur lors du commit de la transaction : %w", err)
	}

	return nil
}

// CreateEvent crée un nouvel événement
func (s *EventManagementServiceType) CreateEvent(input request.CreateEventRequest, ownerID uint, ownerType string) (*models.Event, error) {
	event := &models.Event{
		OwnerID:     ownerID,
		OwnerType:   ownerType,
		Title:       input.Title,
		Subtitle:    input.Subtitle,
		Address:     input.Address,
		City:        input.City,
		PostalCode:  input.PostalCode,
		Region:      input.Region,
		Country:     input.Country,
		IsOnline:    input.IsOnline,
		IsPublic:    input.IsPublic,
		UseStudibox: input.UseStudibox,
		CategoryIDs: pq.Int64Array(input.CategoryIDs),
		TagIDs:      pq.Int64Array(input.TagIDs),
	}

	if err := s.eventStore.Create(event); err != nil {
		return nil, fmt.Errorf("erreur lors de la création de l'événement : %w", err)
	}

	// Gérer les options, tarifs et descriptions
	if err := s.manageAssociations(event.ID, input.Options, input.Tarifs, input.Descriptions); err != nil {
		return nil, err
	}

	return event, nil
}

// UpdateEvent met à jour un événement existant
func (s *EventManagementServiceType) UpdateEvent(eventID uint, input request.UpdateEventRequest) error {
	// Récupérer l'événement existant
	event, err := s.eventStore.GetByID(eventID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("événement introuvable")
		}
		return fmt.Errorf("erreur lors de la récupération de l'événement : %w", err)
	}

	// Préparer les champs à mettre à jour avec comportement de type PUT
	updates := s.prepareEventUpdates(input, event)
	if len(updates) > 0 {
		if err := s.eventStore.UpdateFields(eventID, updates); err != nil {
			return fmt.Errorf("erreur lors de la mise à jour de l'événement : %w", err)
		}
	}

	// Gérer les associations (options, tarifs, descriptions)
	return s.manageAssociations(eventID, input.Options, input.Tarifs, input.Descriptions)
}

// prepareEventUpdates génère la map des champs à mettre à jour
func (s *EventManagementServiceType) prepareEventUpdates(input request.UpdateEventRequest, event *models.Event) map[string]interface{} {
	updates := map[string]interface{}{
		"title":        utils.CoalesceString(input.Title, event.Title),
		"subtitle":     utils.CoalesceString(input.Subtitle, event.Subtitle),
		"address":      utils.CoalesceString(input.Address, event.Address),
		"city":         utils.CoalesceString(input.City, event.City),
		"postal_code":  utils.CoalesceInt32(input.PostalCode, event.PostalCode),
		"region":       utils.CoalesceString(input.Region, event.Region),
		"country":      utils.CoalesceString(input.Country, event.Country),
		"is_online":    utils.CoalesceBool(input.IsOnline, event.IsOnline),
		"is_public":    utils.CoalesceBool(input.IsPublic, event.IsPublic),
		"use_studibox": utils.CoalesceBool(input.UseStudibox, event.UseStudibox),
		"category_ids": utils.CoalesceSlice(input.CategoryIDs, event.CategoryIDs),
		"tag_ids":      utils.CoalesceSlice(input.TagIDs, event.TagIDs),
	}

	finalUpdates := make(map[string]interface{})
	for key, value := range updates {
		if value != nil {
			finalUpdates[key] = value
		}
	}
	return finalUpdates
}

// Gérer les associations (options, tarifs, descriptions)
func (s *EventManagementServiceType) manageAssociations(eventID uint, options []request.EventOptionRequest, tarifs []request.EventTarifRequest, descriptions []request.EventDescriptionRequest) error {
	if err := s.manageOptions(eventID, options); err != nil {
		return err
	}
	if err := s.manageTarifs(eventID, tarifs); err != nil {
		return err
	}
	return s.manageDescriptions(eventID, descriptions)
}

func (s *EventManagementServiceType) manageOptions(eventID uint, options []request.EventOptionRequest) error {
	for _, option := range options {
		var existingOption *models.EventOption
		if option.ID != 0 {
			var err error
			existingOption, err = s.optionStore.GetByID(option.ID)
			if err != nil {
				return fmt.Errorf("erreur lors de la récupération de l'option : %w", err)
			}
		} else {
			existingOption = &models.EventOption{EventID: eventID}
		}

		existingOption.Title = utils.CoalesceString(option.Title, existingOption.Title)
		existingOption.Description = utils.CoalesceString(option.Description, existingOption.Description)
		existingOption.Price = utils.CoalesceFloat64(option.Price, existingOption.Price)
		existingOption.Stock = utils.CoalesceInt32(option.Stock, existingOption.Stock)

		if option.ID != 0 {
			s.optionStore.Update(existingOption)
		} else {
			s.optionStore.Create(existingOption)
		}
	}
	return nil
}

func (s *EventManagementServiceType) manageTarifs(eventID uint, tarifs []request.EventTarifRequest) error {
	for _, tarif := range tarifs {
		var existingTarif *models.EventTarif
		if tarif.ID != 0 {
			var err error
			existingTarif, err = s.tarifStore.GetByID(tarif.ID)
			if err != nil {
				return fmt.Errorf("erreur lors de la récupération du tarif : %w", err)
			}
		} else {
			existingTarif = &models.EventTarif{EventID: eventID}
		}

		existingTarif.Title = utils.CoalesceString(tarif.Title, existingTarif.Title)
		existingTarif.Description = utils.CoalesceString(tarif.Description, existingTarif.Description)
		existingTarif.Price = utils.CoalesceFloat64(tarif.Price, existingTarif.Price)
		existingTarif.Stock = utils.CoalesceInt32(tarif.Stock, existingTarif.Stock)

		if tarif.ID != 0 {
			s.tarifStore.Update(existingTarif)
		} else {
			s.tarifStore.Create(existingTarif)
		}
	}
	return nil
}

func (s *EventManagementServiceType) manageDescriptions(eventID uint, descriptions []request.EventDescriptionRequest) error {
	for _, desc := range descriptions {
		var existingDesc *models.EventDescription
		if desc.ID != 0 {
			var err error
			existingDesc, err = s.descriptionStore.GetByID(desc.ID)
			if err != nil {
				return fmt.Errorf("erreur lors de la récupération de la description : %w", err)
			}
		} else {
			existingDesc = &models.EventDescription{EventID: eventID}
		}

		existingDesc.Title = utils.CoalesceString(desc.Title, existingDesc.Title)
		existingDesc.Description = utils.CoalesceString(desc.Description, existingDesc.Description)

		if desc.ID != 0 {
			s.descriptionStore.Update(existingDesc)
		} else {
			s.descriptionStore.Create(existingDesc)
		}
	}
	return nil
}
