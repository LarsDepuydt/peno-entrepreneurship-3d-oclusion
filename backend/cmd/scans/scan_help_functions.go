package scans

import (
	"database/sql"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

type Scan struct {
	Id int32
	Scan string
	CreatedAt string
	Notes string
	PatientId int32
}

func GetResponseMakerScan(rows *sql.Rows) ([]*Scan, error) {
	var scans []*Scan
	for rows.Next() {
		scan := &Scan{}
		error := rows.Scan(&scan.Id, &scan.Scan, &scan.CreatedAt, &scan.Notes, &scan.PatientId)
		if error != nil {
			return nil, error
		}

		scans = append(scans, scan)
	}
	
	return scans, nil
}

func MapScanToApi(scan *Scan) *threedoclusionv1.Scan {
	return &threedoclusionv1.Scan{
    Id:        scan.Id,
		Scan:      scan.Scan,
    Notes:     scan.Notes,
		PatientId: scan.PatientId,
		CreatedAt: scan.CreatedAt,
  }
}

func MapScansToApi(scans []*Scan) []*threedoclusionv1.Scan {
	var scansApi []*threedoclusionv1.Scan

	for _, scan := range scans {
		scansApi= append(scansApi, MapScanToApi(scan))
	}

	return scansApi
}
