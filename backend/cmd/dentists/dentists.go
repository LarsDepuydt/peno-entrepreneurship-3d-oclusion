package dentists

import (
	"fmt"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
)

func AddDentist(req *connect.Request[threedoclusionv1.AddDentistRequest]) (*connect.Response[threedoclusionv1.AddDentistResponse], error) {
	// Connect to database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Perform the database modification
	_, error = database.Query(
		"INSERT INTO dentist (email, pass_word, first_name, last_name) VALUES ($1, $2, $3, $4);", 
		req.Msg.Email, req.Msg.Password, req.Msg.FirstName, req.Msg.LastName,
	)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %s added with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddDentistResponse{
		Message: responseMessage,
	})

	return res, nil
}

func DeleteDentist(req *connect.Request[threedoclusionv1.DeleteDentistByIdRequest]) (*connect.Response[threedoclusionv1.DeleteDentistByIdResponse], error) {
	// Connect to database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Perform the database modification
	_, error = database.Query("DELETE FROM dentist WHERE id = $1;", req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with id: %s deleted with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteDentistByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}

func GetAllDentists(req *connect.Request[threedoclusionv1.GetAllDentistsRequest]) (*connect.Response[threedoclusionv1.GetAllDentistsResponse], error) {
	// Connect to database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Perform the database modification
	rows, error := database.Query("SELECT * FROM dentist;")
	if error != nil {
		return nil, error
	}


	responseMessage := fmt.Sprintf("Got all dentists with succes")
	fmt.Println(responseMessage)

	// TODO: Fix this rows issue
	res := connect.NewResponse(&threedoclusionv1.GetAllDentistsResponse{
		Dentists: rows,
	})

	return res, nil
}

func GetDentistById(req *connect.Request[threedoclusionv1.GetDentistByIdRequest]) (*connect.Response[threedoclusionv1.GetDentistByIdResponse], error) {
	// Connect to database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Perform the database modification
	rows, error := database.Query("SELECT * FROM dentist WHERE id = $1;", req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentists with id: %s returned with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	// TODO: Check this out as well
	res := connect.NewResponse(&threedoclusionv1.GetDentistByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}