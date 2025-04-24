package handlers

import (
	"TickVibe-EventTix-backend/internal/utils"
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

func Login(db *sql.DB) http.HandlerFunc {
	return func(writer http.ResponseWriter, response *http.Request) {
		var request struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := json.NewDecoder(response.Body).Decode(&request); err != nil {
			sendErrorResponse(writer, "Invalid request body", http.StatusBadRequest)
			return
		}

		request.Email = strings.TrimSpace(request.Email)
		request.Password = strings.TrimSpace(request.Password)

		if request.Email == "" || request.Password == "" {
			sendErrorResponse(writer, "Email and password are required", http.StatusBadRequest)
			return
		}

		var storedHash string
		var userID int

		err := db.QueryRow("SELECT id, password_hash FROM users WHERE email=$1", request.Email).Scan(&userID, &storedHash)
		if err == sql.ErrNoRows {
			sendErrorResponse(writer, "Invalid email or password", http.StatusBadRequest)
			return
		} else if err != nil {
			sendErrorResponse(writer, "Database error", http.StatusInternalServerError)
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(request.Password))
		if err != nil {
			sendErrorResponse(writer, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		tokenString, err := utils.GenerateJWT(userID, request.Email)
		if err != nil {
			sendErrorResponse(writer, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		http.SetCookie(writer, &http.Cookie{
			Name:     "token",
			Value:    tokenString,
			Path:     "/",
			HttpOnly: true,
			Secure:   false, // for localhost, set to true in production
			SameSite: http.SameSiteLaxMode,
			MaxAge:   3600,
		})

		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusOK)
		json.NewEncoder(writer).Encode(map[string]interface{}{
			"success": true,
			"message": "Login successful",
			"userId":  userID,
		})
	}
}
