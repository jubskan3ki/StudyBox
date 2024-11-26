package event

import (
	"backend/core/services/upload"
	"backend/core/stores/event"
	"fmt"
	"mime/multipart"
	"strings"
)

type EventUploadServiceType struct {
	upload     upload.UploadService
	eventStore *event.EventStoreType
}

func EventUploadService(upload upload.UploadService, eventStore *event.EventStoreType) *EventUploadServiceType {
	return &EventUploadServiceType{
		upload:     upload,
		eventStore: eventStore,
	}
}

func (s *EventUploadServiceType) UploadEventImages(eventID uint, files []multipart.File) (string, error) {
	var urls []string
	for _, file := range files {
		fileName := fmt.Sprintf("events/%d/image.jpg", eventID)
		url, err := s.upload.UploadFile(file, fileName)
		if err != nil {
			return "", err
		}
		urls = append(urls, url)
	}

	err := s.eventStore.UpdateEventImages(eventID, urls)
	return strings.Join(urls, ","), err
}

// UploadEventVideos télécharge des vidéos pour un événement
func (s *EventUploadServiceType) UploadEventVideos(eventID uint, files []multipart.File, uploadService upload.UploadService) (string, error) {
	var urls []string
	for _, file := range files {
		fileName := fmt.Sprintf("events/%d/image.jpg", eventID)
		url, err := s.upload.UploadFile(file, fileName)
		if err != nil {
			return "", err
		}
		urls = append(urls, url)
	}

	err := s.eventStore.UpdateEventVideos(eventID, urls)
	return strings.Join(urls, ","), err
}
