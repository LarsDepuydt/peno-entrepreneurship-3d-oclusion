package main

import (
	"fmt"

	//db "dbFunctions"

	_ "github.com/lib/pq"
)

type Server struct{}

// func (s *Server) Scan(
// 	ctx context.Context,
// 	req *connect.Request[threedoclusionv1.ScanRequest],
// ) (*connect.Response[threedoclusionv1.ScanResponse], error) {
// 	log.Println("Request headers: ", req.Header())
// 	res := connect.NewResponse(&threedoclusionv1.ScanResponse{
// 		Name: fmt.Sprintf("Hello, %s!", req.Msg.Id),
// 	})
// 	res.Header().Set("Scan-Version", "v1")
// 	return res, nil
// }

func main() {
	fmt.Println("starten van main")
	// server := &Server{}
	// mux := http.NewServeMux()
	// path, handler := threedoclusionv1connect.NewScanServiceHandler(server)
	// mux.Handle(path, handler)
	// http.ListenAndServe(
	// 	"0.0.0.0:8080",
	// 	// Use h2c so we can serve HTTP/2 without TLS.
	// 	h2c.NewHandler(mux, &http2.Server{}),
	// )

	id := 111
	bite := "overbeet"
	firstname := "Dag"
	lastname := "Malstaf"
	pinned := 1

	notes := "test note"

	fmt.Println("starten van toevoeging tag")

	err1 := AlterTag(id, bite, true)

	if err1 != nil {
		fmt.Println(err1)
	}

	fmt.Println("starten van toevoeging patient")

	err2 := AlterPatient(id, firstname, lastname, pinned, notes, true)
	if err2 != nil {
		fmt.Println(err2)
	}

}
