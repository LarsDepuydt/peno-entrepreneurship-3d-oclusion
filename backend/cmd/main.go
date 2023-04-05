package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/backend/cmd/serve"
)

const (
  host     = "db"
  port     = 5432
  user     = "docker"
  password = "docker1"
  dbname   = "patient_server"
)



func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	"password=%s dbname=%s sslmode=disable",
	host, port, user, password, dbname)

	database, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer database.Close()

	// Check if the database connection works
	err = database.Ping()
  	if err != nil {
    	panic(err)
  	}

  	fmt.Println("Successfully connected!")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Set a default port if not provided
	}
  
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World!")
	})
		
	log.Printf("Starting server on :%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
	
	serve.Server(database)
}

