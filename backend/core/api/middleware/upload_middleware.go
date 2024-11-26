package middleware

import (
	"backend/core/services/upload"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// UploadFileMiddleware gère l'upload des fichiers (images, vidéos, etc.)
func UploadFileMiddleware(uploadService upload.UploadService, keys []string, maxFilesPerKey int) gin.HandlerFunc {
	return func(c *gin.Context) {
		uploadedFiles := make(map[string][]string) // Map pour stocker les URLs des fichiers

		// Parcourir toutes les clés spécifiées pour les fichiers (ex: "profile_image", "event_image")
		for _, key := range keys {
			urls, err := handleFileUpload(c, uploadService, key, maxFilesPerKey)
			if err != nil {
				log.Printf("Failed to upload files for key '%s': %v", key, err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Internal Server Error",
					"message": fmt.Sprintf("Failed to upload files for key '%s'", key),
				})
				c.Abort()
				return
			}
			uploadedFiles[key] = urls
		}

		// Ajouter les URLs des fichiers dans le contexte pour les handlers
		c.Set("uploaded_files", uploadedFiles)
		c.Next()
	}
}

// handleFileUpload gère l'upload pour une clé spécifique
func handleFileUpload(c *gin.Context, uploadService upload.UploadService, key string, maxFiles int) ([]string, error) {
	var urls []string

	// Gérer plusieurs fichiers pour la même clé (si applicable)
	for i := 0; i < maxFiles; i++ {
		fileKey := key
		if maxFiles > 1 {
			fileKey = fmt.Sprintf("%s%d", key, i+1)
		}

		header, err := c.FormFile(fileKey)
		if err != nil || header == nil {
			continue // Passer au fichier suivant si aucun fichier n'est fourni pour cette clé
		}

		// Ouvrir le fichier
		file, err := header.Open()
		if err != nil {
			log.Printf("Failed to open file: %v", err)
			return nil, err
		}
		defer file.Close()

		// Générer un nom de fichier unique avec horodatage
		fileName := generateUniqueFileName(header.Filename)
		url, err := uploadFileToUpload(uploadService, file, fileName)
		if err != nil {
			log.Printf("Failed to upload file: %v", err)
			return nil, err
		}

		urls = append(urls, url)
	}

	return urls, nil
}

// uploadFileToUpload utilise le service de stockage pour téléverser le fichier
func uploadFileToUpload(uploadService upload.UploadService, file multipart.File, fileName string) (string, error) {
	url, err := uploadService.UploadFile(file, fileName)
	if err != nil {
		return "", err
	}
	return url, nil
}

// generateUniqueFileName génère un nom de fichier unique en utilisant un timestamp
func generateUniqueFileName(originalName string) string {
	ext := ""
	if idx := strings.LastIndex(originalName, "."); idx != -1 {
		ext = originalName[idx:]
	}
	return fmt.Sprintf("%d%s", time.Now().Unix(), ext)
}
