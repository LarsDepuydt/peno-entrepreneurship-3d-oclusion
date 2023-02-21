package main

import (
	"fmt"

	_ "github.com/lib/pq"
)

type Server struct{}

func (s *Server) Scan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.ScanRequest],
) (*connect.Response[threedoclusionv1.ScanResponse], error) {
	log.Println("Request headers: ", req.Header())
	res := connect.NewResponse(&threedoclusionv1.ScanResponse{
		Name: fmt.Sprintf("Hello, %s!", req.Msg.Id),
	})
	res.Header().Set("Scan-Version", "v1")
	return res, nil
}

func main() {
	// server := &Server{}
	// mux := http.NewServeMux()
	// path, handler := threedoclusionv1connect.NewScanServiceHandler(server)
	// mux.Handle(path, handler)
	// http.ListenAndServe(
	// 	"0.0.0.0:8080",
	// 	// Use h2c so we can serve HTTP/2 without TLS.
	// 	h2c.NewHandler(mux, &http2.Server{}),
	// )

	id := 123
	bite := "onderbeet"

	fmt.Println("starten van toevoeging")

	err := addPatient(id, bite)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("toevoegen succesvol")

}
