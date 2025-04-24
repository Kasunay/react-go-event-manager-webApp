package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"regexp"
	"strings"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// isValidEmail validates email format using a regex
func isValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// sendErrorResponse creates a consistent JSON error response
func sendErrorResponse(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// sendSuccessResponse creates a consistent JSON success response
func sendSuccessResponse(w http.ResponseWriter, data map[string]interface{}, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

func isPasswordComplex(password string) (bool, string) {
	if len(password) < 8 {
		return false, "Password must be at least 8 characters long"
	}
	if len(password) > 72 {
		return false, "Password is too long"
	}

	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	hasSpecial := regexp.MustCompile(`[!@#$%^&*.]`).MatchString(password)

	if !hasUpper || !hasLower || !hasNumber || !hasSpecial {
		return false, "Password must contain uppercase, lowercase, number, and special character"
	}

	return true, ""
}

func SignUp(db *sql.DB) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		// 1. Define request struct (only what we need)
		var requestStruct struct {
			FullName string `json:"fullName"`
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		// 2. Parse request
		if err := json.NewDecoder(request.Body).Decode(&requestStruct); err != nil {
			sendErrorResponse(writer, "Invalid request body", http.StatusBadRequest)
			return
		}

		// 3. Validate inputs
		requestStruct.Email = strings.TrimSpace(requestStruct.Email)
		requestStruct.FullName = strings.TrimSpace(requestStruct.FullName)

		if requestStruct.FullName == "" || requestStruct.Email == "" || requestStruct.Password == "" {
			sendErrorResponse(writer, "All fields are required", http.StatusBadRequest)
			return
		}

		// ...existing code...

		if valid, message := isPasswordComplex(requestStruct.Password); !valid {
			sendErrorResponse(writer, message, http.StatusBadRequest)
			return
		}

		// ...existing code...

		// Validate email format
		if !isValidEmail(requestStruct.Email) {
			sendErrorResponse(writer, "Invalid email format", http.StatusBadRequest)
			return
		}

		// 4. Check if email exists
		var exists bool
		err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", requestStruct.Email).Scan(&exists)
		if err != nil && err != sql.ErrNoRows {
			sendErrorResponse(writer, "Database error", http.StatusInternalServerError)
			return
		}
		if exists {
			sendErrorResponse(writer, "Email already in use", http.StatusConflict)
			return
		}

		// 5. Hash password
		hashedPassword, err := hashPassword(requestStruct.Password)
		if err != nil {
			sendErrorResponse(writer, "Error processing password", http.StatusInternalServerError)
			return
		}

		// 6. Create user
		query := `INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at) 
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

		var userID int
		currentTime := time.Now().Format(time.RFC3339)
		err = db.QueryRow(query,
			requestStruct.FullName,
			requestStruct.Email,
			hashedPassword,
			"user",
			currentTime,
			currentTime,
		).Scan(&userID)

		if err != nil {
			sendErrorResponse(writer, "Error creating user", http.StatusInternalServerError)
			return
		}

		// 7. Return success response
		sendSuccessResponse(writer, map[string]interface{}{
			"success": true,
			"message": "User created successfully",
			"userId":  userID,
		}, http.StatusCreated)
	}
}
