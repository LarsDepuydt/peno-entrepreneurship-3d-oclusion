package vr

import (
	"database/sql"
	"time"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"
)

func SaveScanData(req *connect.Request[threedoclusionv1.SaveScanDataRequest], database *sql.DB) (*connect.Response[threedoclusionv1.SaveScanDataResponse], error) {
		// Connect to the database
		statement, error := database.Prepare("INSERT INTO scan_save (scan_id, lowerX, lowerY, lowerZ, lowerRX, lowerRY, lowerRZ, upperX, upperY, upperZ, upperRX, upperRY, upperRZ, timestamp_save) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)")
		if error != nil {
			return nil, error
		}

		t := time.Now()
		//formattedDate := t.Format("2006-01-02") // Format in yyyy-mm-dd
		formattedTimestamp := t.Format("2006-01-02T15:04:05")

		save := req.Msg.GetScan()
		_, error = statement.Exec(save.ScanId, save.LowerX, save.LowerY, save.LowerZ, save.LowerRX, save.LowerRY, save.LowerRZ, save.UpperX, save.UpperY, save.UpperZ, save.UpperRX, save.UpperRY, save.UpperRZ, formattedTimestamp)
		if error != nil {
			return nil, error
		}

		msg := "Saved successfully"
		res := connect.NewResponse(&threedoclusionv1.SaveScanDataResponse{
			Data: msg,
		})
		return res, nil
}


