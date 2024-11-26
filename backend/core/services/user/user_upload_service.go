package user

import (
	"backend/core/services/upload"
	"backend/core/stores/user"
	"fmt"
	"mime/multipart"
)

type UserUploadServiceType struct {
	upload    upload.UploadService
	userStore *user.UserStoreType
}

func UserUploadService(upload upload.UploadService, userStore *user.UserStoreType) *UserUploadServiceType {
	return &UserUploadServiceType{
		upload:    upload,
		userStore: userStore,
	}
}

func (s *UserUploadServiceType) UploadProfileImage(userID uint, file multipart.File) (string, error) {
	// Générer un nom de fichier unique pour l'utilisateur
	fileName := fmt.Sprintf("users/%d/profile.jpg", userID)

	// Téléchargement du fichier sur S3
	url, err := s.upload.UploadFile(file, fileName)
	if err != nil {
		return "", fmt.Errorf("échec du téléchargement de l'image de profil : %w", err)
	}

	// Mettre à jour l'URL de l'image de profil dans la base de données
	err = s.userStore.UpdateProfileImage(userID, url)
	if err != nil {
		return "", fmt.Errorf("échec de la mise à jour du profil utilisateur : %w", err)
	}

	return url, nil
}
