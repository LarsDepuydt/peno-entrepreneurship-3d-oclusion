package patients

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)



func AddPatient(req *connect.Request[threedoclusionv1.AddPatientRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddPatientResponse], error) {
	const sqlStatement = `
	INSERT INTO patient (dentist_id, firstname, lastname, pinned, notes) 
	VALUES ($1, $2, $3, $4, $5) 
	RETURNING id;`
	var id int32

	pinnedDatabase := 0
	if req.Msg.Pinned == true {
		pinnedDatabase = 1
	}

	// Perform the database modification
	error := database.QueryRow(
		sqlStatement, 
		req.Msg.DentistId, req.Msg.FirstName, req.Msg.LastName, pinnedDatabase, req.Msg.Notes,
	).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with name: %s added with succes;", req.Msg.FirstName)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddPatientResponse{
		Message: responseMessage,
		Id: id,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeletePatientById(req *connect.Request[threedoclusionv1.DeletePatientByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeletePatientByIdResponse], error) {
	const sqlStatement = `
		DELETE FROM patient 
		WHERE id = $1
		RETURNING id, firstname, lastname;`
	var id int32
	var firstName string
	var lastName string
	
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &firstName, &lastName)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeletePatientByIdResponse{
		Message: responseMessage,
		Id: id,
		FirstName: firstName,
    LastName: lastName,
	})

	return res, nil
}

func GetAllPatients(req *connect.Request[threedoclusionv1.GetAllPatientsRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllPatientsResponse], error) {
	rows, error := database.Query("SELECT id, firstname, lastname, pinned, notes, dentist_id FROM patient;")
	if error != nil {
		return nil, error
	}

	patients, error := GetResponseMakerPatient(rows)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got all patients successfully")

	patientsApi := MapPatientsToApi(patients)

	res := connect.NewResponse(&threedoclusionv1.GetAllPatientsResponse{
		Patients: patientsApi,
	})

	return res, nil
}

func GetPatientById(req *connect.Request[threedoclusionv1.GetPatientByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByIdResponse], error) {
	const sqlStatement = `
		SELECT id, firstname, lastname, pinned, notes, dentist_id
		FROM patient
		WHERE id = $1;`
	var id int32
	var firstName string
	var lastName string
	var pinned bool
	var notes string
	var dentistId int32

	// Perform the database query
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &firstName, &lastName, &pinned, &notes, &dentistId)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetPatientByIdResponse{
		Id:        id,
		FirstName: firstName,
		LastName:  lastName,
		Pinned:    pinned,
		Notes:     notes,
		DentistId: dentistId,
	})

	return res, nil
}

func GetPatientByName(req *connect.Request[threedoclusionv1.GetPatientByNameRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	firstName := req.Msg.FirstName
	lastName := req.Msg.LastName

	var error error
	var rows *sql.Rows
	 
	if (firstName != nil && lastName != nil ) {
		rows, error = database.Query("SELECT id, firstname, lastname, pinned, notes, dentist_id FROM patient WHERE firstname = $1 AND last_name = $2;", req.Msg.FirstName, req.Msg.LastName)
	}else{
		if firstName != nil {
			rows, error = database.Query("SELECT id, firstname, lastname, pinned, notes, dentist_id FROM patient WHERE firstname = $1;", req.Msg.FirstName)
		}else if lastName != nil {
			rows, error = database.Query("SELECT id, firstname, lastname, pinned, notes, dentist_id FROM patient WHERE lastname = $1;", req.Msg.LastName)
		}
		
	}
	if error != nil {
		return nil, error
	}

	patients, error := GetResponseMakerPatient(rows)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with first name: %s returned with succes;", req.Msg.FirstName)
	fmt.Println(responseMessage)

	patientsApi := MapPatientsToApi(patients)

	res := connect.NewResponse(&threedoclusionv1.GetPatientByNameResponse{
		Patients: patientsApi,
	})

	return res, nil
}

func UpdatePatientById(req *connect.Request[threedoclusionv1.UpdatePatientByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.UpdatePatientByIdResponse], error) {
	const sqlStatement = `
		UPDATE patient
		SET firstname=$2, lastname=$3, pinned=$4, notes=$5, dentist_id=$6
		WHERE id = $1
		RETURNING id;`
	var id int32

	pinnedDatabase := 0
	if req.Msg.Pinned == true {
		pinnedDatabase = 1
	}

	error := database.QueryRow(sqlStatement, req.Msg.Id, req.Msg.FirstName, req.Msg.LastName, pinnedDatabase, req.Msg.Notes, req.Msg.DentistId).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Patient with id: %d updated with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.UpdatePatientByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}
