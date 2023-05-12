package scans

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func AddScan(req *connect.Request[threedoclusionv1.AddScanRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	const sqlStatement = `
		INSERT INTO scan (scan, notes, patient_id) 
		VALUES ($1, $2, $3)
		RETURNING id`
	var id int32
	
	error := database.QueryRow(sqlStatement, req.Msg.ScanFile, req.Msg.Notes, req.Msg.PatientId).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with path: %s added with succes;", req.Msg.ScanFile)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: responseMessage,
		Id: id,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteScanById(req *connect.Request[threedoclusionv1.DeleteScanByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteScanByIdResponse], error) {
	const sqlStatement = `
		DELETE FROM scan 
		WHERE id = $1
		RETURNING id;`
	var id int32
	
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %d deleted with succes;", id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteScanByIdResponse{
		Message: responseMessage,
		Id: id,
	})

	return res, nil
}

func GetAllScans(req *connect.Request[threedoclusionv1.GetAllScansRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	rows, error := database.Query("SELECT id, scan, created_at, notes, patient_id FROM scan;")
	if error != nil {
		return nil, error
	}

	scans, error := GetResponseMakerScan(rows)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got all scans successfully")

	var scansApi = MapScansToApi(scans)

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		Scans: scansApi,
	})

	return res, nil
}

func GetScanById(req *connect.Request[threedoclusionv1.GetScanByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetScanByIdResponse], error) {
	const sqlStatement = `
	SELECT id, scan, created_at, notes, patient_id
	FROM scan 
	WHERE id = $1;`
	var id int32
	var scan string
	var createdAt string
	var notes string
	var patientId int32

	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &scan, &createdAt, &notes, &patientId)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)
	
	res := connect.NewResponse(&threedoclusionv1.GetScanByIdResponse{
		Id: id,
		Scan: scan,
    CreatedAt: createdAt,
    Notes: notes,
    PatientId: patientId,
	})

	return res, nil
}

func UpdateScanById(req *connect.Request[threedoclusionv1.UpdateScanByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.UpdateScanByIdResponse], error) {
	const sqlStatement = `
		UPDATE scan
		SET scan=$2, notes=$3, patient_id=$4
		WHERE id = $1
		RETURNING id;`
	var id int32

	error := database.QueryRow(sqlStatement, req.Msg.Id, req.Msg.ScanFile, req.Msg.Notes, req.Msg.PatientId).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("Scan with id: %d updated with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.UpdateScanByIdResponse{
		Message: responseMessage,
	})

	return res, nil
}
