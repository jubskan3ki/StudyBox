package owner

import (
	"backend/core/services/upload"
	"backend/core/stores/owner"
	"fmt"
	"mime/multipart"
)

type OwnerUploadServiceType struct {
	upload     upload.UploadService
	ownerStore *owner.OwnerStoreType
}

func OwnerUploadService(upload upload.UploadService, ownerStore *owner.OwnerStoreType) *OwnerUploadServiceType {
	return &OwnerUploadServiceType{
		upload:     upload,
		ownerStore: ownerStore,
	}
}

// UploadOwnerProfileImage télécharge une seule image de profil pour un owner et met à jour son URL
func (s *OwnerUploadServiceType) UploadOwnerProfileImage(ownerID uint, file multipart.File) (string, error) {
	// Générer un nom de fichier unique pour le propriétaire
	fileName := fmt.Sprintf("owners/%d/profile.jpg", ownerID)

	// Téléchargement du fichier sur S3
	url, err := s.upload.UploadFile(file, fileName)
	if err != nil {
		return "", fmt.Errorf("échec du téléchargement de l'image de profil du propriétaire : %w", err)
	}

	// Mettre à jour l'URL de l'image de profil dans la base de données
	err = s.ownerStore.UpdateProfileImage(ownerID, url)
	if err != nil {
		return "", fmt.Errorf("échec de la mise à jour du profil du propriétaire : %w", err)
	}

	return url, nil
}
