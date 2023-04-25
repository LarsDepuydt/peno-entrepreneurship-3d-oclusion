package dentists

import (
	"database/sql"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

type Dentist struct {
	Id        int32
	Email     string
	FirstName string
	LastName  string
}

func GetResponseMakerDentist(rows *sql.Rows) ([]*Dentist, error) {
	var dentists []*Dentist

	for rows.Next() {
		dentist := &Dentist{}
		error := rows.Scan(&dentist.Id, &dentist.Email, &dentist.FirstName, &dentist.LastName)
		if error != nil {
			return nil, error
		}
		dentists = append(dentists, dentist)
	}

	// get any error encountered during iteration
	error := rows.Err()
	if error != nil {
		return nil, error
	}

	return dentists, nil
}

func MapDentistToApi(dentist *Dentist) *threedoclusionv1.Dentist {
	return &threedoclusionv1.Dentist{
    Id:        dentist.Id,
    Email:     dentist.Email,
    FirstName: dentist.FirstName,
    LastName:  dentist.LastName,
  }
}

func MapDentistsToApi(dentists []*Dentist) []*threedoclusionv1.Dentist {
	var dentistsApi []*threedoclusionv1.Dentist

	for _, dentist := range dentists {
		dentistsApi= append(dentistsApi, MapDentistToApi(dentist))
	}

	return dentistsApi
}