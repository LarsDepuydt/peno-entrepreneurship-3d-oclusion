package patients

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
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
	statement := "SELECT * FROM patient;"
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerPatient(rows)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all patients succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllPatientsResponse{
		Patients: result,
	})

	return res, nil
}

func GetPatientByID(req *connect.Request[threedoclusionv1.GetPatientByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByIdResponse], error) {
	statement := "SELECT * FROM patient WHERE id = $1;"
	rows, error := database.Query(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerPatient(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("patient with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetPatientByIdResponse{
		Id:        result[0].Id,
		FirstName: result[0].FirstName,
		LastName:  result[0].LastName,
		Pinned:    result[0].Pinned,
		Notes:     result[0].Notes,
	})

	return res, nil
}

func GetPatientByName(req *connect.Request[threedoclusionv1.GetPatientByNameRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	firstName := req.Msg.FirstName
	lastName := req.Msg.LastName

	var error error
	var rows *sql.Rows
	 
	if (firstName != nil && lastName != nil ) {
		statement := "SELECT * FROM patient WHERE firstname = $1 AND last_name = $2;"
		rows, error = database.Query(statement, req.Msg.FirstName, req.Msg.LastName)
	}else{
		if firstName != nil {
			statement := "SELECT * FROM patient WHERE firstname = $1;"
			rows, error = database.Query(statement, req.Msg.FirstName)
		}else if lastName != nil {
			statement := "SELECT * FROM patient WHERE lastname = $1;"
			rows, error = database.Query(statement, req.Msg.LastName)
		}
		
	}
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerPatient(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("patient with id: %d returned with succes;", req.Msg.FirstName)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetPatientByNameResponse{
		Patients: result,
	})

	return res, nil
}
