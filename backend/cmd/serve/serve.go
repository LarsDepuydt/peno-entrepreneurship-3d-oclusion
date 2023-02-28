package serve

import (
	"context"
	"net/http"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/cmd/scans"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/cmd/tags"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/gen/proto/threedoclusion/v1"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/gen/proto/threedoclusion/v1/threedoclusionv1connect"
	"github.com/bufbuild/connect-go"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

type ServerStruct struct{}

func setCors(mux http.Handler) http.Handler {
	muxHandler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowCredentials: true,
		AllowedHeaders: []string{"Connect-Protocol-Version", "Content-Type"},
		Debug: true, // Enable Debugging for testing, consider disabling in production
	})
	muxHandler = c.Handler(muxHandler)

	return muxHandler
}

func Server() {
	server := &ServerStruct{}
	
	mux := http.NewServeMux()
	path, handler := threedoclusionv1connect.NewScanServiceHandler(server)
	mux.Handle(path, handler)

	muxHandler := setCors(mux)

	http.ListenAndServe(
		"0.0.0.0:8080",
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(muxHandler, &http2.Server{}),
	)
}

func (s *ServerStruct) Scan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.ScanRequest],
) (*connect.Response[threedoclusionv1.ScanResponse], error) {
	return scans.GetScanById(req)
}

func (s *ServerStruct) Tag(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.TagRequest],
) (*connect.Response[threedoclusionv1.TagResponse], error) {
	return tags.GetTagById(req)
}

