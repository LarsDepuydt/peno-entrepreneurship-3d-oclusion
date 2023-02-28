package scans

import (
	"fmt"
	"log"

	"github.com/bufbuild/connect-go"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func GetScanById(req *connect.Request[threedoclusionv1.ScanRequest]) (*connect.Response[threedoclusionv1.ScanResponse], error) {
	log.Println("Request headers: ", req.Header())
	res := connect.NewResponse(&threedoclusionv1.ScanResponse{
		Name: fmt.Sprintf("Hello, %s!", req.Msg.Id),
	})

	
	res.Header().Set("Scan-Version", "v1")
	return res, nil
}