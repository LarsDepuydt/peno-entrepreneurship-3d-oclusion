package dentists

import (
	"database/sql"
	"fmt"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
)

func AddDentist(req *connect.Request[threedoclusionv1.AddDentistRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddDentistResponse], error) {
	const sqlStatement = `
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
	const sqlStatement = `
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
	rows, error := database.Query("SELECT id, email, firstname, lastname FROM dentist;")
	if error != nil {
		return nil, error
	}

	dentists, error := GetResponseMakerDentist(rows)
	if error != nil {
		return nil, error
	}
	
	fmt.Println("Got all dentists with succes")
	
	dentistsApi := MapDentistsToApi(dentists)

	res := connect.NewResponse(&threedoclusionv1.GetAllDentistsResponse{
		Dentists: dentistsApi,
	})
	
	return res, nil
}

func GetDentistById(req *connect.Request[threedoclusionv1.GetDentistByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetDentistByIdResponse], error) {
	const sqlStatement = `
		SELECT id, email, firstname, lastname
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
	const sqlStatement = `
		SELECT id, email, firstname, lastname
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
	const sqlStatement = `
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
	// Get original data
	const sqlStatement = `
		SELECT email, firstname, lastname, password
		FROM dentist
		WHERE id = $1;
	`
	var old_email string
	var old_firstName string
	var old_lastName string
	var old_password string
	
	// Perform the database query
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&old_email, &old_firstName, &old_lastName, &old_password)
	if error != nil {
		return nil, error
	}

	// Set fallback values
	var email = req.Msg.Email
	if email == nil {
		email = &old_email
	}

	var firstName = req.Msg.FirstName
	if firstName == nil {
		firstName = &old_firstName
	}

	var lastName = req.Msg.LastName
	if lastName == nil {
		lastName = &old_lastName
	}

	var password = req.Msg.Password
	if password == nil {
		password = &old_password
	}
	
	// Perform the database modification
	_, error = database.Exec(
		"UPDATE dentist SET email=$2, password=$3, firstname=$4, lastname=$5 WHERE id = $1;", 
		req.Msg.Id, email, password, firstName, lastName,
	)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Dentist with email: %d updated with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	// TODO: fix token
	res := connect.NewResponse(&threedoclusionv1.UpdateDentistByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}
