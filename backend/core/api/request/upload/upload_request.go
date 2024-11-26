package request

import "mime/multipart"

// UserProfileImageRequest représente la requête pour uploader une image de profil utilisateur
type UserProfileImageRequest struct {
	File multipart.File `form:"profile_image" binding:"required"`
}

// OwnerProfileImageRequest représente la requête pour uploader une image de profil owner
type OwnerProfileImageRequest struct {
	File multipart.File `form:"owner_image" binding:"required"`
}

// EventImagesRequest représente la requête pour uploader des images d'événement
type EventImagesRequest struct {
	Files []*multipart.FileHeader `form:"event_images" binding:"required"`
}

// EventVideosRequest représente la requête pour uploader des vidéos d'événement
type EventVideosRequest struct {
	Files []*multipart.FileHeader `form:"event_videos" binding:"required"`
}
