package main

import (
	"database/sql"
	"fmt"

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
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	"password=%s dbname=%s sslmode=disable",
	host, port, user, password, dbname)

	database, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer database.Close()

	// Check if the database connection works
	/*err = database.Ping()
	if err != nil {
		panic(err)
	}

  	fmt.Println("Successfully connected!"
	So no error -> still won't be able to use database but better than panic
	)*/

	serve.Server(database)
}
