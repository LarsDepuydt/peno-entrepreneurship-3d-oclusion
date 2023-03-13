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

func GetResponseMakerScan(database *sql.DB, statement string) ([]int64, []string, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, nil, error
	}

	type RowData struct {
		id   int64
		scan string
		date string
	}

	var (
		idArray   []int64
		scanArray []string
		dateArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.scan, &rowData.date)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		scanArray = append(scanArray, rowData.scan)
		dateArray = append(dateArray, rowData.date)
	}

	return idArray, scanArray, dateArray, nil

}

func GetResponseMakerTag(database *sql.DB, statement string) ([]int64, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, error
	}

	type RowData struct {
		id   int64
		bite string
	}

	var (
		idArray   []int64
		biteArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.bite)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		biteArray = append(biteArray, rowData.bite)
	}

	return idArray, biteArray, nil

}

func GetResponseMakerPatient(database *sql.DB, statement string) ([]int64, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, error
	}

	type RowData struct {
		id   int64
		bite string
	}

	var (
		idArray   []int64
		biteArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.bite)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		biteArray = append(biteArray, rowData.bite)
	}

	return idArray, biteArray, nil

}

func GetResponseMakerDentist(database *sql.DB, statement string) ([]int64, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, error
	}

	type RowData struct {
		id   int64
		bite string
	}

	var (
		idArray   []int64
		biteArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.bite)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		biteArray = append(biteArray, rowData.bite)
	}

	return idArray, biteArray, nil

}
