package upload

import (
	"backend/config"
	"errors"
	"log"
	"mime/multipart"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

// Définition des erreurs de stockage
var (
	ErrFileNotFound = errors.New("file not found")
	ErrUploadFailed = errors.New("upload failed")
	ErrDeleteFailed = errors.New("delete failed")
)

// UploadService définit l'interface pour les opérations de stockage
type UploadService interface {
	UploadFile(file multipart.File, fileName string) (string, error)
	DeleteFile(fileName string) error
	GetFileURL(fileName string) string
}

type S3UploadType struct {
	svc    *s3.S3
	bucket string
}

// S3UploadService crée une nouvelle instance de S3Upload utilisant la configuration
func S3UploadService() *S3UploadType {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(config.AppConfig.S3Region),
		Credentials: credentials.NewStaticCredentials(
			config.AppConfig.AWSAccessKey,
			config.AppConfig.AWSSecretKey,
			"",
		),
	})
	if err != nil {
		log.Fatalf("Failed to create AWS session: %v", err)
	}

	return &S3UploadType{
		svc:    s3.New(sess),
		bucket: config.AppConfig.S3Bucket,
	}
}

// UploadFile télécharge un fichier sur S3 et retourne son URL
func (s *S3UploadType) UploadFile(file multipart.File, fileName string) (string, error) {
	if file == nil {
		return "", ErrFileNotFound
	}

	// Lire les premiers octets pour détecter le Content-Type
	buffer := make([]byte, 512)
	_, err := file.Read(buffer)
	if err != nil {
		return "", err
	}

	// Détecter le type de contenu du fichier
	contentType := http.DetectContentType(buffer)

	// Remettre le pointeur du fichier au début
	_, err = file.Seek(0, 0)
	if err != nil {
		return "", err
	}

	_, err = s.svc.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(fileName),
		Body:        file,
		ContentType: aws.String(contentType),
	})
	if err != nil {
		log.Printf("Erreur lors de l'upload sur S3 : %v", err)
		return "", ErrUploadFailed
	}

	return s.GetFileURL(fileName), nil
}

// DeleteFile supprime un fichier de S3
func (s *S3UploadType) DeleteFile(fileName string) error {
	_, err := s.svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(fileName),
	})
	if err != nil {
		return ErrDeleteFailed
	}
	return nil
}

// GetFileURL retourne l'URL du fichier stocké
func (s *S3UploadType) GetFileURL(fileName string) string {
	return "https://" + s.bucket + ".s3.amazonaws.com/" + fileName
}
