package response

// UploadResponse représente la réponse après l'upload d'un fichier
type UploadResponse struct {
	URL string `json:"url,omitempty"`
}
