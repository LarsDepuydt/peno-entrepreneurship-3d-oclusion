// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: threedoclusion/v1/service.proto

package threedoclusionv1connect

import (
	context "context"
	errors "errors"
	v1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusie/gen/threedoclusion/v1"
	connect_go "github.com/bufbuild/connect-go"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// ScanServiceName is the fully-qualified name of the ScanService service.
	ScanServiceName = "threedoclusion.v1.ScanService"
)

// ScanServiceClient is a client for the threedoclusion.v1.ScanService service.
type ScanServiceClient interface {
	Scan(context.Context, *connect_go.Request[v1.ScanRequest]) (*connect_go.Response[v1.ScanResponse], error)
}

// NewScanServiceClient constructs a client for the threedoclusion.v1.ScanService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewScanServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) ScanServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &scanServiceClient{
		scan: connect_go.NewClient[v1.ScanRequest, v1.ScanResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/Scan",
			opts...,
		),
	}
}

// scanServiceClient implements ScanServiceClient.
type scanServiceClient struct {
	scan *connect_go.Client[v1.ScanRequest, v1.ScanResponse]
}

// Scan calls threedoclusion.v1.ScanService.Scan.
func (c *scanServiceClient) Scan(ctx context.Context, req *connect_go.Request[v1.ScanRequest]) (*connect_go.Response[v1.ScanResponse], error) {
	return c.scan.CallUnary(ctx, req)
}

// ScanServiceHandler is an implementation of the threedoclusion.v1.ScanService service.
type ScanServiceHandler interface {
	Scan(context.Context, *connect_go.Request[v1.ScanRequest]) (*connect_go.Response[v1.ScanResponse], error)
}

// NewScanServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewScanServiceHandler(svc ScanServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/threedoclusion.v1.ScanService/Scan", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/Scan",
		svc.Scan,
		opts...,
	))
	return "/threedoclusion.v1.ScanService/", mux
}

// UnimplementedScanServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedScanServiceHandler struct{}

func (UnimplementedScanServiceHandler) Scan(context.Context, *connect_go.Request[v1.ScanRequest]) (*connect_go.Response[v1.ScanResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.Scan is not implemented"))
}