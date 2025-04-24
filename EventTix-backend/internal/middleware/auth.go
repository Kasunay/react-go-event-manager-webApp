package middleware

import (
	"TickVibe-EventTix-backend/internal/utils"
	"context"
	"net/http"
)

type contextKey string

const userContextKey contextKey = "user"

func RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		cookie, err := request.Cookie("token")
		if err != nil {
			http.Error(writer, "Unauthorized - token not found", http.StatusUnauthorized)
			return
		}

		claims, err := utils.ParseJWT(cookie.Value)
		if err != nil {
			http.Error(writer, "Unauthorized - invalid token", http.StatusUnauthorized)
			return
		}

		// Add user info to request context
		ctx := context.WithValue(request.Context(), userContextKey, claims)
		request = request.WithContext(ctx)

		next(writer, request)
	}
}

// GetUserFromContext extracts user info from context
func GetUserFromContext(r *http.Request) (*utils.Claims, bool) {
	claims, ok := r.Context().Value(userContextKey).(*utils.Claims)
	return claims, ok
}
