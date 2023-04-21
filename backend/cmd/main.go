package main

import (
	"database/sql"
	"fmt"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/serve"
)

const (
  host     = "34.78.71.210"
  port     = 5432
  user     = "postgres"
  password = "relu-sql-db"
  dbname   = "relu-backend:europe-west1:relu-sql-db"
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

	
	serve.Server(database)
}



