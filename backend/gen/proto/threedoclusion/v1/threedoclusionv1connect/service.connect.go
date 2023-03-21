// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: threedoclusion/v1/service.proto

package threedoclusionv1connect

import (
	context "context"
	errors "errors"
	v1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
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
	SendVR(context.Context, *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error)
	Waiting(context.Context, *connect_go.Request[v1.WaitingRequest]) (*connect_go.ServerStreamForClient[v1.WaitingResponse], error)
	AddScan(context.Context, *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error)
	DeleteScan(context.Context, *connect_go.Request[v1.DeleteScanRequest]) (*connect_go.Response[v1.DeleteScanResponse], error)
	GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error)
	GetScanByID(context.Context, *connect_go.Request[v1.GetScanByIDRequest]) (*connect_go.Response[v1.GetScanByIDResponse], error)
	GetScanByDate(context.Context, *connect_go.Request[v1.GetScanByDateRequest]) (*connect_go.Response[v1.GetScanByDateResponse], error)
	AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error)
	DeleteTag(context.Context, *connect_go.Request[v1.DeleteTagRequest]) (*connect_go.Response[v1.DeleteTagResponse], error)
	GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error)
	GetTagByID(context.Context, *connect_go.Request[v1.GetTagByIDRequest]) (*connect_go.Response[v1.GetTagByIDResponse], error)
	GetAllTagsByType(context.Context, *connect_go.Request[v1.GetAllTagsByTypeRequest]) (*connect_go.Response[v1.GetAllTagsByTypeResponse], error)
	AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error)
	DeletePatient(context.Context, *connect_go.Request[v1.DeletePatientRequest]) (*connect_go.Response[v1.DeletePatientResponse], error)
	GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error)
	GetPatientByID(context.Context, *connect_go.Request[v1.GetPatientByIDRequest]) (*connect_go.Response[v1.GetPatientByIDResponse], error)
	GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error)
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
		sendVR: connect_go.NewClient[v1.SendVRRequest, v1.SendVRResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/SendVR",
			opts...,
		),
		waiting: connect_go.NewClient[v1.WaitingRequest, v1.WaitingResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/Waiting",
			opts...,
		),
		addScan: connect_go.NewClient[v1.AddScanRequest, v1.AddScanResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/AddScan",
			opts...,
		),
		deleteScan: connect_go.NewClient[v1.DeleteScanRequest, v1.DeleteScanResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/DeleteScan",
			opts...,
		),
		getAllScans: connect_go.NewClient[v1.GetAllScansRequest, v1.GetAllScansResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetAllScans",
			opts...,
		),
		getScanByID: connect_go.NewClient[v1.GetScanByIDRequest, v1.GetScanByIDResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetScanByID",
			opts...,
		),
		getScanByDate: connect_go.NewClient[v1.GetScanByDateRequest, v1.GetScanByDateResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetScanByDate",
			opts...,
		),
		addTag: connect_go.NewClient[v1.AddTagRequest, v1.AddTagResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/AddTag",
			opts...,
		),
		deleteTag: connect_go.NewClient[v1.DeleteTagRequest, v1.DeleteTagResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/DeleteTag",
			opts...,
		),
		getAllTags: connect_go.NewClient[v1.GetAllTagsRequest, v1.GetAllTagsResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetAllTags",
			opts...,
		),
		getTagByID: connect_go.NewClient[v1.GetTagByIDRequest, v1.GetTagByIDResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetTagByID",
			opts...,
		),
		getAllTagsByType: connect_go.NewClient[v1.GetAllTagsByTypeRequest, v1.GetAllTagsByTypeResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetAllTagsByType",
			opts...,
		),
		addPatient: connect_go.NewClient[v1.AddPatientRequest, v1.AddPatientResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/AddPatient",
			opts...,
		),
		deletePatient: connect_go.NewClient[v1.DeletePatientRequest, v1.DeletePatientResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/DeletePatient",
			opts...,
		),
		getAllPatients: connect_go.NewClient[v1.GetAllPatientsRequest, v1.GetAllPatientsResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetAllPatients",
			opts...,
		),
		getPatientByID: connect_go.NewClient[v1.GetPatientByIDRequest, v1.GetPatientByIDResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetPatientByID",
			opts...,
		),
		getPatientByName: connect_go.NewClient[v1.GetPatientByNameRequest, v1.GetPatientByNameResponse](
			httpClient,
			baseURL+"/threedoclusion.v1.ScanService/GetPatientByName",
			opts...,
		),
	}
}

// scanServiceClient implements ScanServiceClient.
type scanServiceClient struct {
	sendVR           *connect_go.Client[v1.SendVRRequest, v1.SendVRResponse]
	waiting          *connect_go.Client[v1.WaitingRequest, v1.WaitingResponse]
	addScan          *connect_go.Client[v1.AddScanRequest, v1.AddScanResponse]
	deleteScan       *connect_go.Client[v1.DeleteScanRequest, v1.DeleteScanResponse]
	getAllScans      *connect_go.Client[v1.GetAllScansRequest, v1.GetAllScansResponse]
	getScanByID      *connect_go.Client[v1.GetScanByIDRequest, v1.GetScanByIDResponse]
	getScanByDate    *connect_go.Client[v1.GetScanByDateRequest, v1.GetScanByDateResponse]
	addTag           *connect_go.Client[v1.AddTagRequest, v1.AddTagResponse]
	deleteTag        *connect_go.Client[v1.DeleteTagRequest, v1.DeleteTagResponse]
	getAllTags       *connect_go.Client[v1.GetAllTagsRequest, v1.GetAllTagsResponse]
	getTagByID       *connect_go.Client[v1.GetTagByIDRequest, v1.GetTagByIDResponse]
	getAllTagsByType *connect_go.Client[v1.GetAllTagsByTypeRequest, v1.GetAllTagsByTypeResponse]
	addPatient       *connect_go.Client[v1.AddPatientRequest, v1.AddPatientResponse]
	deletePatient    *connect_go.Client[v1.DeletePatientRequest, v1.DeletePatientResponse]
	getAllPatients   *connect_go.Client[v1.GetAllPatientsRequest, v1.GetAllPatientsResponse]
	getPatientByID   *connect_go.Client[v1.GetPatientByIDRequest, v1.GetPatientByIDResponse]
	getPatientByName *connect_go.Client[v1.GetPatientByNameRequest, v1.GetPatientByNameResponse]
}

// SendVR calls threedoclusion.v1.ScanService.SendVR.
func (c *scanServiceClient) SendVR(ctx context.Context, req *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error) {
	return c.sendVR.CallUnary(ctx, req)
}

// Waiting calls threedoclusion.v1.ScanService.Waiting.
func (c *scanServiceClient) Waiting(ctx context.Context, req *connect_go.Request[v1.WaitingRequest]) (*connect_go.ServerStreamForClient[v1.WaitingResponse], error) {
	return c.waiting.CallServerStream(ctx, req)
}

// AddScan calls threedoclusion.v1.ScanService.AddScan.
func (c *scanServiceClient) AddScan(ctx context.Context, req *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error) {
	return c.addScan.CallUnary(ctx, req)
}

// DeleteScan calls threedoclusion.v1.ScanService.DeleteScan.
func (c *scanServiceClient) DeleteScan(ctx context.Context, req *connect_go.Request[v1.DeleteScanRequest]) (*connect_go.Response[v1.DeleteScanResponse], error) {
	return c.deleteScan.CallUnary(ctx, req)
}

// GetAllScans calls threedoclusion.v1.ScanService.GetAllScans.
func (c *scanServiceClient) GetAllScans(ctx context.Context, req *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error) {
	return c.getAllScans.CallUnary(ctx, req)
}

// GetScanByID calls threedoclusion.v1.ScanService.GetScanByID.
func (c *scanServiceClient) GetScanByID(ctx context.Context, req *connect_go.Request[v1.GetScanByIDRequest]) (*connect_go.Response[v1.GetScanByIDResponse], error) {
	return c.getScanByID.CallUnary(ctx, req)
}

// GetScanByDate calls threedoclusion.v1.ScanService.GetScanByDate.
func (c *scanServiceClient) GetScanByDate(ctx context.Context, req *connect_go.Request[v1.GetScanByDateRequest]) (*connect_go.Response[v1.GetScanByDateResponse], error) {
	return c.getScanByDate.CallUnary(ctx, req)
}

// AddTag calls threedoclusion.v1.ScanService.AddTag.
func (c *scanServiceClient) AddTag(ctx context.Context, req *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error) {
	return c.addTag.CallUnary(ctx, req)
}

// DeleteTag calls threedoclusion.v1.ScanService.DeleteTag.
func (c *scanServiceClient) DeleteTag(ctx context.Context, req *connect_go.Request[v1.DeleteTagRequest]) (*connect_go.Response[v1.DeleteTagResponse], error) {
	return c.deleteTag.CallUnary(ctx, req)
}

// GetAllTags calls threedoclusion.v1.ScanService.GetAllTags.
func (c *scanServiceClient) GetAllTags(ctx context.Context, req *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error) {
	return c.getAllTags.CallUnary(ctx, req)
}

// GetTagByID calls threedoclusion.v1.ScanService.GetTagByID.
func (c *scanServiceClient) GetTagByID(ctx context.Context, req *connect_go.Request[v1.GetTagByIDRequest]) (*connect_go.Response[v1.GetTagByIDResponse], error) {
	return c.getTagByID.CallUnary(ctx, req)
}

// GetAllTagsByType calls threedoclusion.v1.ScanService.GetAllTagsByType.
func (c *scanServiceClient) GetAllTagsByType(ctx context.Context, req *connect_go.Request[v1.GetAllTagsByTypeRequest]) (*connect_go.Response[v1.GetAllTagsByTypeResponse], error) {
	return c.getAllTagsByType.CallUnary(ctx, req)
}

// AddPatient calls threedoclusion.v1.ScanService.AddPatient.
func (c *scanServiceClient) AddPatient(ctx context.Context, req *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error) {
	return c.addPatient.CallUnary(ctx, req)
}

// DeletePatient calls threedoclusion.v1.ScanService.DeletePatient.
func (c *scanServiceClient) DeletePatient(ctx context.Context, req *connect_go.Request[v1.DeletePatientRequest]) (*connect_go.Response[v1.DeletePatientResponse], error) {
	return c.deletePatient.CallUnary(ctx, req)
}

// GetAllPatients calls threedoclusion.v1.ScanService.GetAllPatients.
func (c *scanServiceClient) GetAllPatients(ctx context.Context, req *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error) {
	return c.getAllPatients.CallUnary(ctx, req)
}

// GetPatientByID calls threedoclusion.v1.ScanService.GetPatientByID.
func (c *scanServiceClient) GetPatientByID(ctx context.Context, req *connect_go.Request[v1.GetPatientByIDRequest]) (*connect_go.Response[v1.GetPatientByIDResponse], error) {
	return c.getPatientByID.CallUnary(ctx, req)
}

// GetPatientByName calls threedoclusion.v1.ScanService.GetPatientByName.
func (c *scanServiceClient) GetPatientByName(ctx context.Context, req *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error) {
	return c.getPatientByName.CallUnary(ctx, req)
}

// ScanServiceHandler is an implementation of the threedoclusion.v1.ScanService service.
type ScanServiceHandler interface {
	SendVR(context.Context, *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error)
	Waiting(context.Context, *connect_go.Request[v1.WaitingRequest], *connect_go.ServerStream[v1.WaitingResponse]) error
	AddScan(context.Context, *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error)
	DeleteScan(context.Context, *connect_go.Request[v1.DeleteScanRequest]) (*connect_go.Response[v1.DeleteScanResponse], error)
	GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error)
	GetScanByID(context.Context, *connect_go.Request[v1.GetScanByIDRequest]) (*connect_go.Response[v1.GetScanByIDResponse], error)
	GetScanByDate(context.Context, *connect_go.Request[v1.GetScanByDateRequest]) (*connect_go.Response[v1.GetScanByDateResponse], error)
	AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error)
	DeleteTag(context.Context, *connect_go.Request[v1.DeleteTagRequest]) (*connect_go.Response[v1.DeleteTagResponse], error)
	GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error)
	GetTagByID(context.Context, *connect_go.Request[v1.GetTagByIDRequest]) (*connect_go.Response[v1.GetTagByIDResponse], error)
	GetAllTagsByType(context.Context, *connect_go.Request[v1.GetAllTagsByTypeRequest]) (*connect_go.Response[v1.GetAllTagsByTypeResponse], error)
	AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error)
	DeletePatient(context.Context, *connect_go.Request[v1.DeletePatientRequest]) (*connect_go.Response[v1.DeletePatientResponse], error)
	GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error)
	GetPatientByID(context.Context, *connect_go.Request[v1.GetPatientByIDRequest]) (*connect_go.Response[v1.GetPatientByIDResponse], error)
	GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error)
}

// NewScanServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewScanServiceHandler(svc ScanServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/threedoclusion.v1.ScanService/SendVR", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/SendVR",
		svc.SendVR,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/Waiting", connect_go.NewServerStreamHandler(
		"/threedoclusion.v1.ScanService/Waiting",
		svc.Waiting,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/AddScan", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/AddScan",
		svc.AddScan,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/DeleteScan", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/DeleteScan",
		svc.DeleteScan,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetAllScans", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetAllScans",
		svc.GetAllScans,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetScanByID", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetScanByID",
		svc.GetScanByID,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetScanByDate", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetScanByDate",
		svc.GetScanByDate,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/AddTag", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/AddTag",
		svc.AddTag,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/DeleteTag", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/DeleteTag",
		svc.DeleteTag,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetAllTags", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetAllTags",
		svc.GetAllTags,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetTagByID", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetTagByID",
		svc.GetTagByID,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetAllTagsByType", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetAllTagsByType",
		svc.GetAllTagsByType,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/AddPatient", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/AddPatient",
		svc.AddPatient,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/DeletePatient", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/DeletePatient",
		svc.DeletePatient,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetAllPatients", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetAllPatients",
		svc.GetAllPatients,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetPatientByID", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetPatientByID",
		svc.GetPatientByID,
		opts...,
	))
	mux.Handle("/threedoclusion.v1.ScanService/GetPatientByName", connect_go.NewUnaryHandler(
		"/threedoclusion.v1.ScanService/GetPatientByName",
		svc.GetPatientByName,
		opts...,
	))
	return "/threedoclusion.v1.ScanService/", mux
}

// UnimplementedScanServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedScanServiceHandler struct{}

func (UnimplementedScanServiceHandler) SendVR(context.Context, *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.SendVR is not implemented"))
}

func (UnimplementedScanServiceHandler) Waiting(context.Context, *connect_go.Request[v1.WaitingRequest], *connect_go.ServerStream[v1.WaitingResponse]) error {
	return connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.Waiting is not implemented"))
}

func (UnimplementedScanServiceHandler) AddScan(context.Context, *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddScan is not implemented"))
}

func (UnimplementedScanServiceHandler) DeleteScan(context.Context, *connect_go.Request[v1.DeleteScanRequest]) (*connect_go.Response[v1.DeleteScanResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeleteScan is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllScans is not implemented"))
}

func (UnimplementedScanServiceHandler) GetScanByID(context.Context, *connect_go.Request[v1.GetScanByIDRequest]) (*connect_go.Response[v1.GetScanByIDResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetScanByID is not implemented"))
}

func (UnimplementedScanServiceHandler) GetScanByDate(context.Context, *connect_go.Request[v1.GetScanByDateRequest]) (*connect_go.Response[v1.GetScanByDateResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetScanByDate is not implemented"))
}

func (UnimplementedScanServiceHandler) AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddTag is not implemented"))
}

func (UnimplementedScanServiceHandler) DeleteTag(context.Context, *connect_go.Request[v1.DeleteTagRequest]) (*connect_go.Response[v1.DeleteTagResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeleteTag is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllTags is not implemented"))
}

func (UnimplementedScanServiceHandler) GetTagByID(context.Context, *connect_go.Request[v1.GetTagByIDRequest]) (*connect_go.Response[v1.GetTagByIDResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetTagByID is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllTagsByType(context.Context, *connect_go.Request[v1.GetAllTagsByTypeRequest]) (*connect_go.Response[v1.GetAllTagsByTypeResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllTagsByType is not implemented"))
}

func (UnimplementedScanServiceHandler) AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddPatient is not implemented"))
}

func (UnimplementedScanServiceHandler) DeletePatient(context.Context, *connect_go.Request[v1.DeletePatientRequest]) (*connect_go.Response[v1.DeletePatientResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeletePatient is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllPatients is not implemented"))
}

func (UnimplementedScanServiceHandler) GetPatientByID(context.Context, *connect_go.Request[v1.GetPatientByIDRequest]) (*connect_go.Response[v1.GetPatientByIDResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetPatientByID is not implemented"))
}

func (UnimplementedScanServiceHandler) GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetPatientByName is not implemented"))
}
