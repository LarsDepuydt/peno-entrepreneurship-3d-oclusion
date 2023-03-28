package scans

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func AddScan(req *connect.Request[threedoclusionv1.AddScanRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	statement, error := database.Prepare("INSERT INTO scan (scan, date_scan) VALUES ($1, $2)")
	if error != nil {
		return nil, error
	}
	defer statement.Close()

	_, error = statement.Exec(req.Msg.ScanFile, req.Msg.ScanDate)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %s added with succes;", req.Msg.ScanFile)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: responseMessage,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteScan(req *connect.Request[threedoclusionv1.DeleteScanRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteScanResponse], error) {
	statement := "DELETE FROM scan WHERE id = $1"
	_, error := database.Exec(statement, req.Msg.Id)
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

func GetAllScans(req *connect.Request[threedoclusionv1.GetAllScansRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	rows, error := database.Query("SELECT * FROM scan;")
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all scans succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		Scans: result,
	})

	return res, nil
}

func GetScanByID(req *connect.Request[threedoclusionv1.GetScanByIDRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetScanByIDResponse], error) {
	statement := "SELECT * FROM scan WHERE id = $1;"
	rows, error := database.Query(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)
	
	
	res := connect.NewResponse(&threedoclusionv1.GetScanByIDResponse{
		Id:       result[0].Id,
		ScanData: result[0].Scan,
		ScanDate: result[0].Date,
	})

	return res, nil
}

func GetScanByDate(req *connect.Request[threedoclusionv1.GetScanByDateRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetScanByDateResponse], error) {
	statement := "SELECT * FROM scan WHERE scan_date = $1;"
	rows, error := database.Query(statement, req.Msg.Date)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with date: %s returned with succes;", req.Msg.Date)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByDateResponse{
		Scans: result,
	})

	return res, nil
}

