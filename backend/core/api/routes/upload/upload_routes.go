package upload_routes

import (
	uploadHandlers "backend/core/api/handlers/upload"
	"backend/core/api/middleware"
	"backend/core/services/event"
	"backend/core/services/owner"
	"backend/core/services/upload"
	"backend/core/services/user"

	"github.com/gin-gonic/gin"
)

// FileRoutes enregistre les routes pour le téléversement de fichiers
func UploadRoutes(routerGroup *gin.RouterGroup, uploadService upload.UploadService, userService *user.UserServiceType, ownerService *owner.OwnerServiceType, eventService *event.EventServiceType) {
	uploadGroup := routerGroup.Group("/upload")
	uploadGroup.Use(middleware.AuthMiddleware())

	{
		// Route pour uploader une photo de profil utilisateur
		uploadGroup.PUT("/users/image/:id",
			middleware.UploadFileMiddleware(uploadService, []string{"proupload_image"}, 1),
			func(c *gin.Context) {
				uploadHandlers.HandleUploadUserProfileImage(c, userService)
			},
		)

		// Route pour uploader une image de profil pour les owners
		uploadGroup.PUT("/owners/image/:id",
			middleware.UploadFileMiddleware(uploadService, []string{"owner_image"}, 1),
			func(c *gin.Context) {
				uploadHandlers.HandleUploadOwnerProfileImage(c, ownerService)
			},
		)

		// Route pour uploader des images d'événements (jusqu'à 4 images)
		uploadGroup.PUT("/events/images/:id",
			middleware.UploadFileMiddleware(uploadService, []string{"event_images"}, 4),
			func(c *gin.Context) {
				uploadHandlers.HandleUploadEventImages(c, eventService)
			},
		)

		// Route pour uploader des vidéos d'événements (jusqu'à 2 vidéos)
		uploadGroup.PUT("/events/videos/:id",
			middleware.UploadFileMiddleware(uploadService, []string{"event_videos"}, 2),
			func(c *gin.Context) {
				uploadHandlers.HandleUploadEventVideos(c, eventService, uploadService)
			},
		)
	}
}
