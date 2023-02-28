package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/bufbuild/connect-go"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/gen/proto/threedoclusion/v1"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/gen/proto/threedoclusion/v1/threedoclusionv1connect"
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
	server := &Server{}

	mux := http.NewServeMux()
	path, handler := threedoclusionv1connect.NewScanServiceHandler(server)
	mux.Handle(path, handler)

	muxHandler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Connect-Protocol-Version", "Content-Type"},
		Debug:            true, // Enable Debugging for testing, consider disabling in production
	})
	muxHandler = c.Handler(muxHandler)

	http.ListenAndServe(
		"0.0.0.0:8080",
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(muxHandler, &http2.Server{}),
	)
}
