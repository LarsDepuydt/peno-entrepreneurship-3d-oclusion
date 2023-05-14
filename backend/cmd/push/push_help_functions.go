package push

import (
	"database/sql"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	_ "github.com/lib/pq"
)

func GetResponseMakerScan(rows *sql.Rows) ([]*threedoclusionv1.ScanSave, error) {
	var rowArray []*threedoclusionv1.ScanSave
	for rows.Next() {
		rowData := &threedoclusionv1.ScanSave{}
		error := rows.Scan(&rowData.ScanId,
			&rowData.LowerX, &rowData.LowerY, &rowData.LowerZ, &rowData.LowerRX, &rowData.LowerRY, &rowData.LowerRZ, &rowData.LowerRW,
			&rowData.UpperX, &rowData.UpperY, &rowData.UpperZ, &rowData.UpperRX, &rowData.UpperRY, &rowData.UpperRZ, &rowData.UpperRW,
			&rowData.TimestampSave)
		if error != nil { // id
			return nil, error
		}
		rowArray = append(rowArray, rowData)
	}

	return rowArray, nil;
}