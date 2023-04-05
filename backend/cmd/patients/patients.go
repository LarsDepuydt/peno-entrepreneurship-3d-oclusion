package patients

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/backend/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/backend/gen/proto/threedoclusion/v1"
)



func AddPatient(req *connect.Request[threedoclusionv1.AddPatientRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddPatientResponse], error) {
	statement, error := database.Prepare("INSERT INTO patient (first_name, last_name, pinned, notes) VALUES ($1, $2, $3, $4)")
	if error != nil {
		return nil, error
	}
	defer statement.Close()

	_, error = statement.Exec(req.Msg.FirstName, req.Msg.LastName, req.Msg.Pinned, req.Msg.Notes)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with name: %s added with succes;", req.Msg.FirstName)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddPatientResponse{
		Message: "responseMessage",
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeletePatient(req *connect.Request[threedoclusionv1.DeletePatientRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeletePatientResponse], error) {
	statement := "DELETE FROM patient WHERE id = $1"
	_, error := database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("patient with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeletePatientResponse{
		Message: responseMessage,
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

func GetPatientByID(req *connect.Request[threedoclusionv1.GetPatientByIDRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByIDResponse], error) {
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

	res := connect.NewResponse(&threedoclusionv1.GetPatientByIDResponse{
		Id:        result[0].Id,
		FirstName: result[0].FirstName,
		LastName:  result[0].LastName,
		Pinned:    result[0].Pinned,
		Notes:     result[0].Notes,
	})

	return res, nil
}

func GetPatientByName(req *connect.Request[threedoclusionv1.GetPatientByNameRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	first_name := req.Msg.FirstName
	last_name := req.Msg.LastName

	var error error
	var rows *sql.Rows
	 
	if (first_name != nil && last_name != nil ) {
		statement := "SELECT * FROM patient WHERE first_name = $1 AND last_name = $2;"
		rows, error = database.Query(statement, req.Msg.FirstName, req.Msg.LastName)
	}else{
		if first_name != nil {
			statement := "SELECT * FROM patient WHERE first_name = $1;"
			rows, error = database.Query(statement, req.Msg.FirstName)
		}else if last_name != nil {
			statement := "SELECT * FROM patient WHERE last_name = $1;"
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
