package dentists

import (
	"database/sql"
	"fmt"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
)

func AddDentist(req *connect.Request[threedoclusionv1.AddDentistRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddDentistResponse], error) {
	sqlStatement := `
		INSERT INTO dentist (email, password, firstname, lastname)
		VALUES ($1, $2, $3, $4)
		RETURNING id;`
	var id int32
	
	// Perform the database modification
	error := database.QueryRow(
		sqlStatement, 
		req.Msg.Email, req.Msg.Password, req.Msg.FirstName, req.Msg.LastName,
	).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %s added with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddDentistResponse{
		Message: responseMessage,
		Id: id,
	})

	return res, nil
}

func DeleteDentistById(req *connect.Request[threedoclusionv1.DeleteDentistByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteDentistByIdResponse], error) {
	sqlStatement := `
		DELETE FROM dentist 
		WHERE id = $1
		RETURNING id, email;`
	var id int32
	var email string
	
	// Perform the database query
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &email)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with id: %d deleted with succes", id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteDentistByIdResponse{
		Message: responseMessage,
		Id: id,
		Email: email,
	})

	return res, nil
}

func GetAllDentists(req *connect.Request[threedoclusionv1.GetAllDentistsRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllDentistsResponse], error) {
	// Perform the database query
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
	sqlStatement := `
		SELECT id, email, first_name, last_name
		FROM dentist
		WHERE id = $1;
	`
	var id int32
	var email string
	var firstName string
	var lastName string
	
	// Perform the database query
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &email, &firstName, &lastName)
	if error != nil {
		return nil, error
	}
	
	responseMessage := fmt.Sprintf("Dentists with id: %d returned with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetDentistByIdResponse{
		Id: id,
		Email: email,
		FirstName: firstName,
		LastName: lastName,
	})

	return res, nil
}

func Login(req *connect.Request[threedoclusionv1.LoginRequest], database *sql.DB) (*connect.Response[threedoclusionv1.LoginResponse], error) {
	sqlStatement := `
		SELECT id, email, first_name, last_name
		FROM dentist
		WHERE email = $1;
	`
	var id int32
	var email string
	var firstName string
	var lastName string
	
	// Perform the database query
	error := database.QueryRow(sqlStatement, req.Msg.Email).Scan(&id, &email, &firstName, &lastName)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentists with email: %s logged in with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.LoginResponse{
		Message: responseMessage,
		Token: "Test token",
		Id: id,
		Email: email,
		FirstName: firstName,
		LastName: lastName,
	})

	return res, nil
}

func Register(req *connect.Request[threedoclusionv1.RegisterRequest], database *sql.DB) (*connect.Response[threedoclusionv1.RegisterResponse], error) {
	sqlStatement := `
		INSERT INTO dentist (email, password, firstname, lastname)
		VALUES ($1, $2, $3, $4)
		RETURNING id;`
	var id int32
	
	// Perform the database modification
	error := database.QueryRow(
		sqlStatement, 
		req.Msg.Email, req.Msg.Password, req.Msg.FirstName, req.Msg.LastName,
	).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %s added with succes", req.Msg.Email)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.RegisterResponse{
		Message: responseMessage,
		Token: "Test token",
		Id: id,
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