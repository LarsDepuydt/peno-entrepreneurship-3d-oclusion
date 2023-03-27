package help_functions

import (
	"database/sql"
	"fmt"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
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

func GetResponseMakerScan(database *sql.DB, statement string) ([]int64, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []float32, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, error
	}

	type RowData struct {
		id   int64
		lower_x    float32
		lower_y    float32
		lower_z    float32
		lower_r_x  float32
		lower_r_y  float32
		lower_r_z  float32
		upper_x    float32
		upper_y    float32
		upper_z    float32
		upper_r_x  float32
		upper_r_y  float32
		upper_r_z  float32
		date string
	}

	var (
		idArray   []int64
		lower_xArray    []float32
		lower_yArray    []float32
		lower_zArray    []float32
		lower_r_xArray  []float32
		lower_r_yArray  []float32
		lower_r_zArray  []float32
		upper_xArray    []float32
		upper_yArray    []float32
		upper_zArray    []float32
		upper_r_xArray  []float32
		upper_r_yArray  []float32
		upper_r_zArray  []float32
		dateArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.lower_x, &rowData.lower_y, &rowData.lower_z, &rowData.lower_r_x, &rowData.lower_r_y, &rowData.lower_r_z, 
			&rowData.upper_x, &rowData.upper_y, &rowData.upper_z, &rowData.upper_r_x, &rowData.upper_r_y, &rowData.upper_r_z, &rowData.date)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		lower_xArray = append(lower_xArray, rowData.lower_x)
		lower_yArray = append(lower_yArray, rowData.lower_y)
		lower_zArray = append(lower_zArray, rowData.lower_z)
		lower_r_xArray = append(lower_r_xArray, rowData.lower_r_x)
		lower_r_yArray = append(lower_r_yArray, rowData.lower_r_y)
		lower_r_zArray = append(lower_r_zArray, rowData.lower_r_z)

		upper_xArray = append(upper_xArray, rowData.upper_x)
		upper_yArray = append(upper_yArray, rowData.upper_y)
		upper_zArray = append(upper_zArray, rowData.upper_z)
		upper_r_xArray = append(upper_r_xArray, rowData.upper_r_x)
		upper_r_yArray = append(upper_r_yArray, rowData.upper_r_y)
		upper_r_zArray = append(upper_r_zArray, rowData.upper_r_z)
		dateArray = append(dateArray, rowData.date)
	}

	return idArray, lower_xArray, lower_yArray, lower_zArray, lower_r_xArray, lower_r_yArray, lower_r_zArray, upper_xArray, upper_yArray, upper_zArray, upper_r_xArray, upper_r_yArray, upper_r_zArray, dateArray, nil

}

func GetResponseMakerTag(database *sql.DB, statement string) ([]*threedoclusionv1.RowDataTag, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	var rowArray []*threedoclusionv1.RowDataTag
	for rows.Next() {
		var rowData *threedoclusionv1.RowDataTag
		error = rows.Scan(&rowData.Id, &rowData.Bite)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, &threedoclusionv1.RowDataTag{Id: rowData.Id, Bite: rowData.Bite})
	}

	return rowArray, nil
}


func GetResponseMakerPatient(database *sql.DB, statement string) ([]*threedoclusionv1.Patient, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	var rowArray []*threedoclusionv1.Patient

	for rows.Next() {
		var rowData *threedoclusionv1.Patient
		error = rows.Scan(&rowData.Id, &rowData.FirstName, &rowData.LastName, &rowData.Pinned, &rowData.Notes)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, &threedoclusionv1.Patient{Id: rowData.Id, FirstName: rowData.FirstName, LastName: rowData.LastName, Pinned: rowData.Pinned, Notes: rowData.Notes})
	}

	return rowArray, nil

}
