package scans

import (
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func AddScan(req *connect.Request[threedoclusionv1.AddScanRequest]) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()

	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO scan (scan_file, scan_date) VALUES ($1, $2)")

	if error != nil {
		return nil, error
	}

	defer statement.Close()

	// Perform database modifications, adding a scan
	_, error = statement.Exec(req.Msg.ScanFile, req.Msg.ScanDate)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %s added with succes;", req.Msg.ScanFile)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: "responseMessage",
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteScan(req *connect.Request[threedoclusionv1.DeleteScanRequest]) (*connect.Response[threedoclusionv1.DeleteScanResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

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

	responseMessage := fmt.Sprintf("scan with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteScanResponse{
		Message: responseMessage,
	})

	return res, nil
}

func GetAllScans(req *connect.Request[threedoclusionv1.GetAllScansRequest]) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan;"

	idArray, scanArray, dateArray, error := help_functions.GetResponseMakerScan(database, statement)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all scans succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		IdData:    idArray,
		ScanData:  scanArray,
		ScanDates: dateArray,
	})

	return res, nil
}

func GetScanByID(req *connect.Request[threedoclusionv1.GetScanByIDRequest]) (*connect.Response[threedoclusionv1.GetScanByIDResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan WHERE id = $1;"

	idArray, scanArray, dateArray, error := help_functions.GetResponseMakerScan(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByIDResponse{
		Id:       idArray[0],
		ScanData: scanArray[0],
		ScanDate: dateArray[0],
	})

	return res, nil
}

func GetScanByDate(req *connect.Request[threedoclusionv1.GetScanByDateRequest]) (*connect.Response[threedoclusionv1.GetScanByDateResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan WHERE scan_date = $1;"

	idArray, scanArray, dateArray, error := help_functions.GetResponseMakerScan(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with date: %s returned with succes;", req.Msg.Date)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByDateResponse{
		IdData:    idArray,
		ScanData:  scanArray,
		ScanDates: dateArray,
	})

	return res, nil
}
