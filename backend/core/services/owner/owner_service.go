package owner

import (
	"backend/core/services/upload"
	stores "backend/core/stores/owner"

	"gorm.io/gorm"
)

type OwnerServiceType struct {
	Management *OwnerManagementServiceType
	Retrieval  *OwnerRetrievalServiceType
	Upload     *OwnerUploadServiceType
}

// NewOwnerService crée une nouvelle instance de OwnerService avec ses sous-services
func OwnerService(db *gorm.DB, uploadService upload.UploadService) *OwnerServiceType {
	store := stores.OwnerStore(db)

	ownerUploadService := OwnerUploadService(uploadService, store)
	managementService := OwnerManagementService(store)
	retrievaltService := OwnerRetrievalService(store)

	return &OwnerServiceType{
		Management: managementService,
		Retrieval:  retrievaltService,
		Upload:     ownerUploadService,
	}
}
