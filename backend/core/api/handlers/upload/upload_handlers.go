package upload

import (
	responseGlobal "backend/core/api/response"
	response "backend/core/api/response/upload"
	"backend/core/services/event"
	"backend/core/services/owner"
	"backend/core/services/upload"
	"backend/core/services/user"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// HandleUploadUserProfileImage gère l'upload d'une image de profil utilisateur
func HandleUploadUserProfileImage(c *gin.Context, userService *user.UserServiceType) {
	userIDParam := c.Param("id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Invalid user ID", err))
		return
	}

	file, fileHeader, err := c.Request.FormFile("profile_image")
	if err != nil || fileHeader == nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("No profile image uploaded", err))
		return
	}
	defer file.Close()

	imageURL, err := userService.Upload.UploadProfileImage(uint(userID), file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to upload profile image", err))
		return
	}

	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Profile image uploaded successfully", response.UploadResponse{URL: imageURL}))
}

// HandleUploadOwnerProfileImage gère l'upload d'une image de profil pour les owners
func HandleUploadOwnerProfileImage(c *gin.Context, ownerService *owner.OwnerServiceType) {
	ownerIDParam := c.Param("id")
	ownerID, err := strconv.Atoi(ownerIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Invalid owner ID", err))
		return
	}

	file, fileHeader, err := c.Request.FormFile("owner_image")
	if err != nil || fileHeader == nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("No profile image uploaded", err))
		return
	}
	defer file.Close()

	imageURL, err := ownerService.Upload.UploadOwnerProfileImage(uint(ownerID), file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to upload owner profile image", err))
		return
	}

	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Owner profile image uploaded successfully", response.UploadResponse{URL: imageURL}))
}

// HandleUploadEventImages gère l'upload des images d'événements
func HandleUploadEventImages(c *gin.Context, eventService *event.EventServiceType) {
	eventIDParam := c.Param("id")
	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Invalid event ID", err))
		return
	}

	form, err := c.MultipartForm()
	if err != nil || len(form.File["event_images"]) == 0 {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("No event images uploaded", err))
		return
	}

	var uploadedFiles []multipart.File
	for _, fileHeader := range form.File["event_images"] {
		file, err := fileHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to open file", err))
			return
		}
		defer file.Close()
		uploadedFiles = append(uploadedFiles, file)
	}

	imageURLs, err := eventService.Upload.UploadEventImages(uint(eventID), uploadedFiles)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to upload event images", err))
		return
	}

	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Event images uploaded successfully", response.UploadResponse{URL: imageURLs}))
}

// HandleUploadEventVideos gère l'upload des vidéos d'événements
func HandleUploadEventVideos(c *gin.Context, eventService *event.EventServiceType, uploadService upload.UploadService) {
	eventIDParam := c.Param("id")
	eventID, err := strconv.Atoi(eventIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("Invalid event ID", err))
		return
	}

	form, err := c.MultipartForm()
	if err != nil || len(form.File["event_videos"]) == 0 {
		c.JSON(http.StatusBadRequest, responseGlobal.ErrorResponse("No event videos uploaded", err))
		return
	}

	var uploadedFiles []multipart.File
	for _, fileHeader := range form.File["event_videos"] {
		file, err := fileHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to open file", err))
			return
		}
		defer file.Close()
		uploadedFiles = append(uploadedFiles, file)
	}

	videoURLs, err := eventService.Upload.UploadEventVideos(uint(eventID), uploadedFiles, uploadService)
	if err != nil {
		c.JSON(http.StatusInternalServerError, responseGlobal.ErrorResponse("Failed to upload event videos", err))
		return
	}

	c.JSON(http.StatusOK, responseGlobal.SuccessResponse("Event videos uploaded successfully", response.UploadResponse{URL: videoURLs}))
}
