package help_functions

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func ConnectToDataBase() (*sql.DB, error) {

	database, error := sql.Open("postgres", "host=host.docker.internal port=5430 user=docker password=docker1 dbname=patient_server sslmode=disable")

	fmt.Println("Connection succesfull")

	if error != nil {
		return nil, error
	}

	return database, nil
}

type RowDataScan struct {
	Id   int64
	Scan string
	Date string
}

func GetResponseMakerScan(database *sql.DB, statement string) ([]RowDataScan, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	var rowArray []RowDataScan

	for rows.Next() {
		var rowData RowDataScan
		error = rows.Scan(&rowData.Id, &rowData.Scan, &rowData.Date)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, rowData)
	}

	return rowArray, nil

}

type RowDataTag struct {
	Id   int64
	Bite string
}

func GetResponseMakerTag(database *sql.DB, statement string) ([]RowDataTag, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	var rowArray []RowDataTag
	for rows.Next() {
		var rowData RowDataTag
		error = rows.Scan(&rowData.Id, &rowData.Bite)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, rowData)
	}

	return rowArray, nil

}

type RowDataPatient struct {
	Id         int64
	First_name string
	Last_name  string
	Pinned     int64
	Notes      string
}

func GetResponseMakerPatient(database *sql.DB, statement string) ([]RowDataPatient, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	var rowArray []RowDataPatient

	for rows.Next() {
		//var rowData RowDataPatient
		error = rows.Scan(&id, &first_name, &last_name, &pinned, &notes)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, RowDataPatient{Id: id, First_name: first_name, Last_name: last_name, Pinned: pinned, Notes: notes})
	}

	return rowArray, nil

}
