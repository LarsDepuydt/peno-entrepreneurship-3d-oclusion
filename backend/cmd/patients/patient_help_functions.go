package patients

import (
	"database/sql"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

type Patient struct {
	Id int32
	FirstName string
	LastName string
	Pinned bool
	Notes string
	DentistId int32
}

func GetResponseMakerPatient(rows *sql.Rows) ([]*Patient, error) {
	var patients []*Patient
	for rows.Next() {
		patient := &Patient{}
		error := rows.Scan(&patient.Id, &patient.FirstName, &patient.LastName, &patient.Pinned, &patient.Notes, &patient.DentistId)
		if error != nil {
			return nil, error
		}

		patients = append(patients, patient)
	}
	
	return patients, nil
}

func MapPatientToApi(patient *Patient) *threedoclusionv1.Patient {
	return &threedoclusionv1.Patient{
    Id:        patient.Id,
    FirstName: patient.FirstName,
    LastName:  patient.LastName,
		Pinned:    patient.Pinned,
    Notes:     patient.Notes,
		DentistId: patient.DentistId,
  }
}

func MapPatientsToApi(patients []*Patient) []*threedoclusionv1.Patient {
	var patientsApi []*threedoclusionv1.Patient

	for _, patient := range patients {
		patientsApi= append(patientsApi, MapPatientToApi(patient))
	}

	return patientsApi
}
