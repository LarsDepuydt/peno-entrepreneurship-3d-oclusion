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

func getResponseMaker(database *sql.DB, statement string) ([]int64, []string, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, nil, error
	}

	type RowData struct {
		id   int64
		scan string
		date string
	}

	var (
		idArray   []int64
		scanArray []string
		dateArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.scan, &rowData.date)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		scanArray = append(scanArray, rowData.scan)
		dateArray = append(dateArray, rowData.date)
	}

	return idArray, scanArray, dateArray, nil

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

	// Perform database modifications, adding a scan
	_, error = statement.Exec(req.Msg.Id, req.Msg.ScanFile, req.Msg.ScanDate)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %d added with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: "responseMessage",
	})

	fmt.Println(responseMessage)
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

	responseMessage := fmt.Sprintf("scan with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteScanResponse{
		Message: responseMessage,
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
	statement := "SELECT * FROM scan;"

	idArray, scanArray, dateArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all scans succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		Message:   "Returned all scans",
		IdData:    idArray,
		ScanData:  scanArray,
		ScanDates: dateArray,
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

	idArray, scanArray, dateArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByIDResponse{
		Message:  responseMessage,
		Id:       idArray[0],
		ScanData: scanArray[0],
		ScanDate: dateArray[0],
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

	idArray, scanArray, dateArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with date: %s returned with succes;", req.Msg.Date)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByDateResponse{
		Message:   responseMessage,
		IdData:    idArray,
		ScanData:  scanArray,
		ScanDates: dateArray,
	})

	return res, nil
}
