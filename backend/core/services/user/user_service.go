package user

import (
	"backend/core/services/upload"
	stores "backend/core/stores/user"

	"gorm.io/gorm"
)

// UserServiceType regroupe tous les sous-services pour l'utilisateur
type UserServiceType struct {
	Management   *UserManagementServiceType
	Retrieval    *UserRetrievalServiceType
	UserPassword *UserPasswordServiceType
	Upload       *UserUploadServiceType
}

// UserService crée une nouvelle instance de UserService avec ses sous-services
func UserService(db *gorm.DB, uploadService upload.UploadService) *UserServiceType {
	// Initialiser les stores
	userStore := stores.UserStore(db)
	userPasswordStore := stores.UserPasswordStore(db)

	// Initialiser les services avec les stores appropriés
	userUploadService := UserUploadService(uploadService, userStore)
	userManagementService := UserManagementService(userStore)
	userPasswordService := UserPasswordService(userPasswordStore, userStore)
	userRetrievalService := UserRetrievalService(userStore)

	return &UserServiceType{
		Management:   userManagementService,
		Retrieval:    userRetrievalService,
		UserPassword: userPasswordService,
		Upload:       userUploadService,
	}
}
