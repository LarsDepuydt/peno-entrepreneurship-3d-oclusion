package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

// add or remove a tag to the database
// true = add
// false = remove

func alterTag(id int, bite string, action bool) error {
	// Connect to the database
	fmt.Print("starting to alter the tag table")
	db, err := sql.Open("postgres", "host=host.docker.internal port=5432 user=docker password=docker1 dbname=patient_server sslmode=disable")
	if err != nil {
		return err
	}
	defer db.Close()

	// adding a tag
	if action {
		// Prepare a statement with placeholders for the values
		statement, err := db.Prepare("INSERT INTO tag (id, bite) VALUES ($1, $2)")
		if err != nil {
			return err
		}
		defer statement.Close()

		// Perform database modifications, adding a tag
		_, err = statement.Exec(id, bite)
		if err != nil {
			return err
		}

		fmt.Println("Added tag succesfully")
		return nil

	} else if !action {

		// Prepare a statement with placeholders for the condition
		statement := "DELETE FROM tag WHERE id = $1"

		// Execute the statement with the parameter value adding a tag
		_, err = db.Exec(statement, id)
		if err != nil {
			return err
		}

		fmt.Println("Deleted tag succesfully")
		return nil

	}

	return nil

}
