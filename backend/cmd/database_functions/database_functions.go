package database_functions

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

// connect to database function
// always close database with : defer database.Close()
func ConnectToDataBase() (*sql.DB, error) {

	database, error := sql.Open("postgres", "host=host.docker.internal port=5430 user=docker password=docker1 dbname=patient_server sslmode=disable")

	fmt.Println("Connection succesfull")

	if error != nil {
		return nil, error
	}

	return database, nil
}

func AddPatient(id int, first_name string, last_name string, pinned int, notes string) error {
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO patient (id, first_name, last_name, pinned, notes) VALUES ($1, $2, $3, $4, $5)")
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
	defer database.Close()
	return nil
}

func RemovePatient(id int) error {
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM patient WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, id)
	if error != nil {
		return error
	}

	fmt.Println("Deleted patient succesfully")
	defer database.Close()
	return nil
}

func AddTag(id int, bite string) error {

	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

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
	defer database.Close()
	return nil
}

func RemoveTag(id int) error {
	// Connect to the database
	database, error := ConnectToDataBase()
	if database == nil || error != nil {
		return error
	}
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM tag WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, id)
	if error != nil {
		return error
	}

	fmt.Println("Deleted tag succesfully")
	defer database.Close()
	return nil
}

func AddScan(id int, scan_file string, scan_date string, action bool) error {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO scan (id, scan_file, scan_date) VALUES ($1, $2, $3)")
	if error != nil {
		return error
	}
	defer statement.Close()

	// Perform database modifications, adding a tag
	_, error = statement.Exec(id, scan_file, scan_date)
	if error != nil {
		return error
	}

	fmt.Println("Added scan succesfully")
	defer database.Close()
	return nil
}

func RemoveScan(id int) error {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM scan WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, id)
	if error != nil {
		return error
	}

	fmt.Println("Deleted scan succesfully")
	defer database.Close()
	return nil
}

func AddDentist(id int, email string, pass_word string, first_name string, last_name string) error {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}

	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO dentist (id, email, pass_word, first_name, last_name) VALUES ($1, $2, $3, $4, $5)")
	if error != nil {
		return error
	}
	defer statement.Close()

	// Perform database modifications
	_, error = statement.Exec(id, email, pass_word, first_name, last_name)
	if error != nil {
		return error
	}

	fmt.Println("Added dentist succesfully")
	defer database.Close()
	return nil
}

func RemoveDentist(id int) error {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return error
	}
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM dentist WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, id)
	if error != nil {
		return error
	}

	fmt.Println("Deleted dentist succesfully")
	defer database.Close()
	return nil
}
