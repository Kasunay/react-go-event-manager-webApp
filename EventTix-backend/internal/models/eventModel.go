// internal/models/event.go
package models

import "time"

type Event struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Location    string    `json:"location"`
	Date        time.Time `json:"date"` // Changed to time.Time for proper date handling
	OrganizerID int       `json:"organizer_id"`
}
