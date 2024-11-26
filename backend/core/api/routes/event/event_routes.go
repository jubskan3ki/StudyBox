package event_routes

import (
	eventHandlers "backend/core/api/handlers/event"
	"backend/core/api/middleware"
	"backend/core/services/event"
	"backend/core/services/owner"
	"backend/core/services/user"

	"github.com/gin-gonic/gin"
)

// EventRoutes enregistre les routes des événements avec le service d'événements
func EventRoutes(routerGroup *gin.RouterGroup, eventService *event.EventServiceType, ownerService *owner.OwnerServiceType, userService *user.UserServiceType) {
	eventGroup := routerGroup.Group("/events")
	eventGroup.Use(middleware.AuthMiddleware())

	{
		// Création d'un événement
		eventGroup.POST("/", func(c *gin.Context) {
			eventHandlers.HandleCreateEvent(c, eventService, ownerService)
		})

		// Récupérer un événement par ID
		eventGroup.GET("/:id", func(c *gin.Context) {
			eventHandlers.HandleGetEvent(c, eventService)
		})

		// Mettre à jour un événement
		eventGroup.PUT("/:id", func(c *gin.Context) {
			eventHandlers.HandleUpdateEvent(c, eventService, ownerService)
		})

		// Supprimer un événement (seulement pour Admin et Owner)
		eventGroup.DELETE("/:id", middleware.RoleMiddleware(userService, []string{"Admin", "Owner"}), func(c *gin.Context) {
			eventHandlers.HandleDeleteEvent(c, eventService, userService)
		})

		// Récupérer tous les événements
		eventGroup.GET("/all", func(c *gin.Context) {
			eventHandlers.HandleListEvents(c, eventService)
		})

		// Récupérer les recommandations d'événements
		eventGroup.GET("/recommendations", func(c *gin.Context) {
			eventHandlers.HandleGetRecommendations(c, eventService)
		})

		// Liker un événement
		eventGroup.POST("/like/:id", func(c *gin.Context) {
			eventHandlers.HandleLikeEvent(c, eventService)
		})

		// Unliker un événement
		eventGroup.DELETE("/like/:id", func(c *gin.Context) {
			eventHandlers.HandleUnlikeEvent(c, eventService)
		})

		// Récupérer les événements likés par l'utilisateur
		eventGroup.GET("/liked", func(c *gin.Context) {
			eventHandlers.HandleGetLikedEvents(c, eventService)
		})

		// Récupérer les événements créés par l'utilisateur connecté
		eventGroup.GET("/mine", func(c *gin.Context) {
			eventHandlers.HandleGetMyEvents(c, eventService, userService)
		})

		// Récupérer tous les tags d'événements
		eventGroup.GET("/tags", func(c *gin.Context) {
			eventHandlers.HandleGetAllTags(c, eventService)
		})

		// Récupérer toutes les catégories d'événements
		eventGroup.GET("/categories", func(c *gin.Context) {
			eventHandlers.HandleGetAllCategories(c, eventService)
		})
	}
}
