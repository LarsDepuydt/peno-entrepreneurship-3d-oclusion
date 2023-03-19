package vr

import (
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func GetPositionScan(req *connect.Request[threedoclusionv1.GetPositionScanRequest],
) (*connect.Response[threedoclusionv1.GetPositionScanResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM scan WHERE id = $1;"

	_, xArray, yArray, zArray, r_xArray, r_yArray, r_zArray, _, error := help_functions.GetResponseMakerScan(database, statement)
	if error != nil {
		panic(error)
	}

	res := connect.NewResponse(&threedoclusionv1.GetPositionScanResponse{
		X:  xArray[0],
		Y:  yArray[0],
		Z:  zArray[0],
		RX: r_xArray[0],
		RY: r_yArray[0],
		RZ: r_zArray[0],
	})
	return res, nil
}

/*
func SendPositionScan(req *connect.Request[threedoclusionv1.SendPositionScanRequest],

	) (*connect.Response[threedoclusionv1.SendPositionScanResponse], error) {
		// Connect to the database
		database, error := help_functions.ConnectToDataBase()
		if database == nil || error != nil {
			return nil, error
		}

		defer database.Close()

		statement, error := database.Prepare("INSERT INTO scan (id, x, y, z, r_x, r_y, r_z, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)")
		if error != nil {
			return nil, error
		}

		t := time.Now()
		formattedDate := t.Format("2006-01-02") // Format in yyyy-mm-dd

		_, error = statement.Exec(req.Msg.ScanId, req.Msg.X, req.Msg.Y, req.Msg.Z, req.Msg.RX, req.Msg.RY, req.Msg.RZ, formattedDate)
		if error != nil {
			return nil, error
		}

		res := connect.NewResponse(&threedoclusionv1.SendPositionScanResponse{ // Confirm it's ok
			Saved: true,
		})
		return res, nil
	}
*/
func SendPositionScan(req *connect.Request[threedoclusionv1.SendPositionScanRequest],
) (*connect.Response[threedoclusionv1.SendPositionScanResponse], error) {

	fmt.Println("The scan ID is", req.Msg.ScanId)

	res := connect.NewResponse(&threedoclusionv1.SendPositionScanResponse{ // Confirm it's ok
		Saved: true,
	})
	return res, nil
}
