package handlers

import (
	"TickVibe-EventTix-backend/internal/models"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetEvents(db *sql.DB) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		rows, err := db.Query("SELECT id, title, location, date, organizer_id FROM events")
		if err != nil {
			http.Error(writer, "Database error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var events []models.Event
		for rows.Next() {
			var e models.Event
			err = rows.Scan(&e.ID, &e.Title, &e.Location, &e.Date, &e.OrganizerID)
			if err != nil {
				http.Error(writer, "Scan error", http.StatusInternalServerError)
				return
			}
			events = append(events, e)
		}

		writer.Header().Set("Content-Type", "application/json")
		json.NewEncoder(writer).Encode(events)
	}
}
