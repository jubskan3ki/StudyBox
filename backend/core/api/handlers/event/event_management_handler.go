package events

import (
	request "backend/core/api/request/event"
	responseGlobal "backend/core/api/response"
	"backend/core/services/event"
	"backend/core/services/owner"
	"backend/core/services/user"
	"backend/core/utils"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// HandleCreateEvent gère la création d'un événement
func HandleCreateEvent(c *gin.Context, eventService *event.EventServiceType, ownerService *owner.OwnerServiceType) {
	var createEventReq request.CreateEventRequest
	if err := c.ShouldBindJSON(&createEventReq); err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Entrée invalide", err))
		return
	}

	// Récupérer les claims pour obtenir l'ID utilisateur
	claims, err := utils.GetClaimsFromContext(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, responseGlobal.ErrorResponse("Jeton invalide ou expiré", err))
		return
	}

	// Récupérer les informations de l'owner à partir du service
	owner, err := ownerService.Retrieval.GetOwnerByUserID(claims.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur lors de la récupération des informations de l'owner", err))
		return
	}

	// Créer l'événement en utilisant le service avec OwnerID et OwnerType séparément
	event, err := eventService.Management.CreateEvent(createEventReq, owner.ID, owner.Type)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur lors de la création de l'événement", err))
		return
	}

	resp := buildEventResponse(event, eventService)
	c.JSON(http.StatusCreated, responseGlobal.SuccessResponse("Événement créé avec succès", resp))
}

func HandleUpdateEvent(c *gin.Context, eventService *event.EventServiceType, ownerService *owner.OwnerServiceType) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("ID de l'événement invalide", err))
		return
	}

	var updateEventReq request.UpdateEventRequest
	if err := c.ShouldBindJSON(&updateEventReq); err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Entrée invalide", err))
		return
	}

	event, err := eventService.Retrieval.GetEvent(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, responseGlobal.ErrorResponse("Événement non trouvé", err))
			return
		}
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur interne", err))
		return
	}

	claims, err := utils.GetClaimsFromContext(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, responseGlobal.ErrorResponse("Jeton invalide ou expiré", err))
		return
	}

	owner, err := ownerService.Retrieval.GetOwnerByUserID(claims.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur lors de la récupération des informations de l'owner", err))
		return
	}

	if event.OwnerID != owner.ID {
		c.JSON(http.StatusUnauthorized, responseGlobal.ErrorResponse("Non autorisé à modifier cet événement", nil))
		return
	}

	// Mettre à jour l'événement avec le service
	if err := eventService.Management.UpdateEvent(uint(id), updateEventReq); err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur lors de la mise à jour", err))
		return
	}

	resp := buildEventResponse(event, eventService)
	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Événement mis à jour avec succès", resp))
}

func HandleDeleteEvent(c *gin.Context, eventService *event.EventServiceType, userService *user.UserServiceType) {
	// Récupérer l'ID de l'événement depuis les paramètres
	eventID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("ID de l'événement invalide", err))
		return
	}

	// Récupérer les informations utilisateur depuis les claims JWT
	claims, err := utils.GetClaimsFromContext(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, responseGlobal.ErrorResponse("Jeton invalide ou expiré", err))
		return
	}

	// Récupérer l'ID de l'utilisateur à partir des claims
	userID := claims.UserID

	// Récupérer le rôle de l'utilisateur à partir du service utilisateur
	user, err := userService.Retrieval.GetUserByID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, responseGlobal.ErrorResponse("Utilisateur non trouvé", err))
			return
		}
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Erreur lors de la récupération de l'utilisateur", err))
		return
	}

	// Supprimer l'événement en fonction du rôle et de l'utilisateur
	if err := eventService.Management.DeleteEvent(uint(eventID), *user.OwnerID, user.Role.Name); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, responseGlobal.ErrorResponse("Événement non trouvé", err))
			return
		}
		c.JSON(http.StatusForbidden, responseGlobal.ErrorResponse("Erreur lors de la suppression", err))
		return
	}

	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Événement supprimé avec succès", nil))
}
