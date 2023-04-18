package dentists

import (
	"database/sql"
	"fmt"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
)

func AddDentist(req *connect.Request[threedoclusionv1.AddDentistRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddDentistResponse], error) {
	// Perform the database modification
	_, error := database.Exec(
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

func DeleteDentistById(req *connect.Request[threedoclusionv1.DeleteDentistByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteDentistByIdResponse], error) {
	// Perform the database modification
	_, error := database.Exec("DELETE FROM dentist WHERE id = $1;", req.Msg.Id)
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

func GetAllDentists(req *connect.Request[threedoclusionv1.GetAllDentistsRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllDentistsResponse], error) {
	// Perform the database modification
	rows, error := database.Query("SELECT * FROM dentist;")
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerDentist(rows)
	if error != nil {
		return nil, error
	}
	
	fmt.Println("Got all dentists with succes")
	
	// TODO: Fix this rows issue
	res := connect.NewResponse(&threedoclusionv1.GetAllDentistsResponse{
		Dentists: result,
	})
	
	return res, nil
}

func GetDentistById(req *connect.Request[threedoclusionv1.GetDentistByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetDentistByIdResponse], error) {
	// Perform the database modification
	rows, error := database.Query("SELECT * FROM dentist WHERE id = $1;", req.Msg.Id)
	if error != nil {
		return nil, error
	}
	
	result, error := help_functions.GetResponseMakerDentist(rows)
	if error != nil {
		return nil, error
	}
	
	responseMessage := fmt.Sprintf("Dentists with id: %s returned with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	// TODO: Check this out as well
	res := connect.NewResponse(&threedoclusionv1.GetDentistByIdResponse{
		Id: result[0].Id,
		Email: result[0].Email,
		FirstName: result[0].FirstName,
		LastName: result[0].LastName,
	})

	return res, nil
}

func Login(req *connect.Request[threedoclusionv1.LoginRequest], database *sql.DB) (*connect.Response[threedoclusionv1.LoginResponse], error) {
	fmt.Println("test")
	
	// Perform the database modification
	_, error := database.Query("SELECT * FROM dentist WHERE email = $1;", req.Msg.Email)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentists with email: %s logged in with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.LoginResponse{
		Message: responseMessage,
		Token: "Test token",
	})

	return res, nil
}

func Register(req *connect.Request[threedoclusionv1.RegisterRequest], database *sql.DB) (*connect.Response[threedoclusionv1.RegisterResponse], error) {
	// Perform the database modification
	_, error := database.Exec(
		"INSERT INTO dentist (email, pass_word, first_name, last_name) VALUES ($1, $2, $3, $4);", 
		req.Msg.Email, req.Msg.Password, req.Msg.FirstName, req.Msg.LastName,
	)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %s added with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.RegisterResponse{
		Message: responseMessage,
		Token: "Test token",
	})

	return res, nil
}

func UpdateDentistById(req *connect.Request[threedoclusionv1.UpdateDentistByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.UpdateDentistByIdResponse], error) {
	// Perform the database modification
	_, error := database.Exec(
		"UPDATE dentist SET email = $2, pass_word = $3, first_name = 4, last_name = 5 WHERE id = $1 ;", 
		req.Msg.Id, req.Msg.Email, req.Msg.Password, req.Msg.FirstName, req.Msg.LastName,
	)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %d updated with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.UpdateDentistByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}