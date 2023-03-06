package scans

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func ConnectToDataBase() (*sql.DB, error) {

	database, error := sql.Open("postgres", "host=host.docker.internal port=5430 user=docker password=docker1 dbname=patient_server sslmode=disable")

	fmt.Println("Connection succesfull")

	if error != nil {
		return nil, error
	}

	return database, nil
}

func AddScan(req *connect.Request[threedoclusionv1.AddScanRequest]) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()
	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO scan (id, scan_file, scan_date) VALUES ($1, $2, $3)")

	if error != nil {
		return nil, error
	}

	defer statement.Close()

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: "done",
	})

	// Perform database modifications, adding a scan
	_, error = statement.Exec(req.Msg.Id, req.Msg.ScanFile, req.Msg.ScanDate)
	if error != nil {
		return nil, error
	}
	fmt.Println("Added scan succesfully")
	return res, nil
}

func DeleteScan(req *connect.Request[threedoclusionv1.DeleteScanRequest]) (*connect.Response[threedoclusionv1.DeleteScanResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM scan WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	fmt.Println("Deleted scan succesfully")

	res := connect.NewResponse(&threedoclusionv1.DeleteScanResponse{
		Message: "done",
	})

	return res, nil
}

func GetAllScans(req *connect.Request[threedoclusionv1.GetAllScansRequest]) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM $1;"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.TableName)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got all tags succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		Message: "done",
	})

	return res, nil
}

func GetScanByID(req *connect.Request[threedoclusionv1.GetScanByIDRequest]) (*connect.Response[threedoclusionv1.GetScanByIDResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan WHERE id = $1;"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got the scan succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetScanByIDResponse{
		Message: "done",
	})

	return res, nil
}

func GetScanByDate(req *connect.Request[threedoclusionv1.GetScanByDateRequest]) (*connect.Response[threedoclusionv1.GetScanByDateResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan WHERE scan_date = $1;"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Date)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got the scan by date succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetScanByDateResponse{
		Message: "done",
	})

	return res, nil
}
