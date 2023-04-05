package help_functions

import (
	"database/sql"

	"fmt"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/backend/gen/proto/threedoclusion/v1"
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

func GetResponseMakerScan(rows *sql.Rows) ([]*threedoclusionv1.Scan, error) {
	var rowArray []*threedoclusionv1.Scan
	for rows.Next() {
		var rowData *threedoclusionv1.Scan
		error := rows.Scan(&rowData.Id, &rowData.LowerX, &rowData.LowerY, &rowData.LowerZ, &rowData.LowerRX, &rowData.LowerRY, &rowData.LowerRZ,
			&rowData.UpperX, &rowData.UpperY, &rowData.UpperZ, &rowData.UpperRX, &rowData.UpperRY, &rowData.UpperRZ, &rowData.Date)
		if error != nil {
			panic(error)
		}
		
		rowArray = append(rowArray, &threedoclusionv1.Scan{Id: rowData.Id, Date: rowData.Date, 
			LowerX: rowData.LowerX,  LowerY: rowData.LowerY,  LowerZ: rowData.LowerZ,
			LowerRX: rowData.LowerRX,  LowerRY: rowData.LowerRY,  LowerRZ: rowData.LowerRZ,
			UpperX: rowData.UpperX,  UpperY: rowData.UpperY,  UpperZ: rowData.UpperZ,
			UpperRX: rowData.UpperRX,  UpperRY: rowData.UpperRY,  UpperRZ: rowData.UpperRZ})
	}

	return rowArray, nil;

}

func GetResponseMakerTag(rows *sql.Rows) ([]*threedoclusionv1.RowDataTag, error) {
	var rowArray []*threedoclusionv1.RowDataTag
	for rows.Next() {
		var rowData *threedoclusionv1.RowDataTag
		error := rows.Scan(&rowData.Id, &rowData.Bite)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, &threedoclusionv1.RowDataTag{Id: rowData.Id, Bite: rowData.Bite})
	}
	return rowArray, nil
}

func GetResponseMakerPatient(rows *sql.Rows) ([]*threedoclusionv1.Patient, error) {
	var rowArray []*threedoclusionv1.Patient
	for rows.Next() {
		var rowData *threedoclusionv1.Patient
		error := rows.Scan(&rowData.Id, &rowData.FirstName, &rowData.LastName, &rowData.Pinned, &rowData.Notes)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, &threedoclusionv1.Patient{Id: rowData.Id, FirstName: rowData.FirstName, LastName: rowData.LastName, Pinned: rowData.Pinned, Notes: rowData.Notes})
	}
	return rowArray, nil

}

func GetResponseMakerDentist(rows *sql.Rows) ([]*threedoclusionv1.Dentist, error) {
	var rowArray []*threedoclusionv1.Dentist

	for rows.Next() {
		var rowData *threedoclusionv1.Dentist
		error := rows.Scan(&rowData.Id, &rowData.Email, &rowData.FirstName, &rowData.LastName)
		if error != nil {
			panic(error)
		}
		rowArray = append(rowArray, &threedoclusionv1.Dentist{Id: rowData.Id, Email: rowData.Email, FirstName: rowData.FirstName, LastName: rowData.LastName})
	}

	return rowArray, nil

}