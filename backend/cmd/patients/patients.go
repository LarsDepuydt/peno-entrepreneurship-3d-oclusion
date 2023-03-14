package patients

import (
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)



func AddPatient(req *connect.Request[threedoclusionv1.AddPatientRequest]) (*connect.Response[threedoclusionv1.AddPatientResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO patient (first_name, last_name, pinned, notes) VALUES ($1, $2, $3, $4)")

	if error != nil {
		return nil, error
	}

	defer statement.Close()

	// Perform database modifications, adding a patient
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

func DeletePatient(req *connect.Request[threedoclusionv1.DeletePatientRequest]) (*connect.Response[threedoclusionv1.DeletePatientResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM patient WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Id)
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

func GetAllPatients(req *connect.Request[threedoclusionv1.GetAllPatientsRequest]) (*connect.Response[threedoclusionv1.GetAllPatientsResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM patient;"

	result, error := help_functions.GetResponseMakerPatient(database, statement)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all patients succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllPatientsResponse{
		Patients: result,
	})

	return res, nil
}

func GetPatientByID(req *connect.Request[threedoclusionv1.GetPatientByIDRequest]) (*connect.Response[threedoclusionv1.GetPatientByIDResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM patient WHERE id = $1;"

	result, error := help_functions.GetResponseMakerPatient(database, statement)
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

func GetPatientByName(req *connect.Request[threedoclusionv1.GetPatientByNameRequest]) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM patient WHERE id = $1;"

	result, error := help_functions.GetResponseMakerPatient(database, statement)
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
