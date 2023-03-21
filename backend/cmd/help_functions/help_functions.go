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

func GetResponseMakerScan(database *sql.DB, statement string) ([]int64, []float32, []float32, []float32, []float32, []float32, []float32, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, nil, nil, nil, nil, nil, nil, error
	}

	type RowData struct {
		id   int64
		x    float32
		y    float32
		z    float32
		r_x  float32
		r_y  float32
		r_z  float32
		date string
	}

	var (
		idArray   []int64
		xArray    []float32
		yArray    []float32
		zArray    []float32
		r_xArray  []float32
		r_yArray  []float32
		r_zArray  []float32
		dateArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.x, &rowData.y, &rowData.z, &rowData.r_x, &rowData.r_y, &rowData.r_z, &rowData.date)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		xArray = append(xArray, rowData.x)
		yArray = append(yArray, rowData.y)
		zArray = append(zArray, rowData.z)
		r_xArray = append(r_xArray, rowData.r_x)
		r_yArray = append(r_yArray, rowData.r_y)
		r_zArray = append(r_zArray, rowData.r_z)
		dateArray = append(dateArray, rowData.date)
	}

	return idArray, xArray, yArray, zArray, r_xArray, r_yArray, r_zArray, dateArray, nil

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
