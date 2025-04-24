package main

import (
	"TickVibe-EventTix-backend/database"
	"TickVibe-EventTix-backend/internal/handlers"
	"TickVibe-EventTix-backend/internal/middleware"
	"log"
	"net/http"
)

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	db := database.Connect()
	defer db.Close()

	mux := http.NewServeMux()
	mux.HandleFunc("/events", handlers.GetEvents(db))
	mux.HandleFunc("/signup", handlers.SignUp(db))
	mux.HandleFunc("/test", handlers.GetEvents(db))
	mux.HandleFunc("/login", handlers.Login(db))
	mux.HandleFunc("/api/jwtTest", middleware.RequireAuth(handlers.JwtTest()))

	// Wrap with CORS middleware
	handlerWithCors := CORSMiddleware(mux)

	log.Println("🚀 Starting server on :8080")
	err := http.ListenAndServe(":8080", handlerWithCors)
	if err != nil {
		log.Fatal(err)
	}
}
