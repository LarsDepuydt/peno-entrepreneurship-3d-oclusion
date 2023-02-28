package main

import "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/cmd/serve"



func main() {
	serve.Server()
}

// func AddPatient(id int, bite string) error {
// 	// Connect to the database
// 	db, err := sql.Open("postgres", "host=host.docker.internal port=5432 user=docker password=docker1 dbname=patient_server sslmode=disable")
// 	if err != nil {
// 		return err
// 	}
// 	defer db.Close()

// 	// Prepare a statement with placeholders for the values
// 	stmt, err := db.Prepare("INSERT INTO tag (id, bite) VALUES ($1, $2)")
// 	if err != nil {
// 		return err
// 	}
// 	defer stmt.Close()

// 	// Perform database modifications
// 	_, err = stmt.Exec(id, bite)
// 	if err != nil {
// 		return err
// 	}

// 	fmt.Println("Row added successfully")
// 	return nil

// }
