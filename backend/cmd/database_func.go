package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

// connect to database function
// always close database with : defer database.Close()
func ConnectToDataBase() (*sql.DB, error) {
	fmt.Print("Connecting to database")

	database, error := sql.Open("postgres", "host=host.docker.internal port=5432 user=docker password=docker1 dbname=patient_server sslmode=disable")
	if error != nil {
		return nil, error
	}

	defer database.Close()
	return database, nil
}

// add or remove a patient to the database
// true = add
// false = remove

func AlterPatient(id int, first_name string, last_name string, pinned int, notes string, action bool) error {
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// adding a patient
	if action {
		// Prepare a statement with placeholders for the values
		statement, error := database.Prepare("INSERT INTO patient (id, first_name, last_name, pinned, notes) VALUES ($1, $2)")
		if error != nil {
			return error
		}
		defer statement.Close()

		// Perform database modifications, adding a patient
		_, error = statement.Exec(id, first_name, last_name, pinned, notes)
		if error != nil {
			return error
		}

		fmt.Println("Added patient succesfully")
		return nil

	} else if !action {

		// Prepare a statement with placeholders for the condition
		statement := "DELETE FROM patient WHERE id = $1"

		// Execute the statement with the parameter value adding a tag
		_, error = database.Exec(statement, id)
		if error != nil {
			return error
		}

		fmt.Println("Deleted patient succesfully")
		return nil

	}

	return nil

}

// add or remove a tag to the database
// true = add
// false = remove

func AlterTag(id int, bite string, action bool) error {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// adding a tag
	if action {
		// Prepare a statement with placeholders for the values
		statement, error := database.Prepare("INSERT INTO tag (id, bite) VALUES ($1, $2)")
		if error != nil {
			return error
		}
		defer statement.Close()

		// Perform database modifications, adding a tag
		_, error = statement.Exec(id, bite)
		if error != nil {
			return error
		}

		fmt.Println("Added tag succesfully")
		return nil

	} else if !action {

		// Prepare a statement with placeholders for the condition
		statement := "DELETE FROM tag WHERE id = $1"

		// Execute the statement with the parameter value adding a tag
		_, error = database.Exec(statement, id)
		if error != nil {
			return error
		}

		fmt.Println("Deleted tag succesfully")
		return nil

	}

	return nil

}
