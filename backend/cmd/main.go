package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/serve"
)

const (
	host     = "db"
	port     = 5432
	user     = "docker"
	password = "docker1"
	dbname   = "patient_server"
)

func main() {
	/*
	connectionName := os.Getenv("CLOUD_SQL_CONNECTION_NAME")
	fmt.Print(connectionName)
    dbUser := os.Getenv("postgres_user")
	fmt.Print(dbUser)
    dbPassword := os.Getenv("postgres_password")
	fmt.Print(dbPassword)
    dbName := os.Getenv("db_name")
	fmt.Print(dbName)

    connectionString := fmt.Sprintf("user=%s password=%s dbname=%s host=/cloudsql/%s sslmode=disable", dbUser, dbPassword, dbName, connectionName)

    database, err := sql.Open("postgres", connectionString)*/ // FOR CLOUD
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	"password=%s dbname=%s sslmode=disable",
	host, port, user, password, dbname)
	database, err := sql.Open("postgres", psqlInfo)
    if err != nil {
        log.Fatalf("Failed to open database connection: %v", err)
    }
	defer database.Close()

	
	// Check if the database connection works
	err = database.Ping()
	if err != nil {
		panic(err)
	}

  	fmt.Println("Successfully connected!")

	serve.Server(database)
}
