package tags

import (
	"log"

	"github.com/bufbuild/connect-go"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func GetTagById(req *connect.Request[threedoclusionv1.TagRequest]) (*connect.Response[threedoclusionv1.TagResponse], error) {
	log.Println("Request headers: ", req.Header())
	res := connect.NewResponse(&threedoclusionv1.TagResponse{
		Id: req.Msg.Id,
		Color: "black",
		Text: "test",
	})

	
	res.Header().Set("Scan-Version", "v1")
	return res, nil
}