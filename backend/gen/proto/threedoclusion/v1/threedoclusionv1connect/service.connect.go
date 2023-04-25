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

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// ScanServiceSendVRProcedure is the fully-qualified name of the ScanService's SendVR RPC.
	ScanServiceSendVRProcedure = "/threedoclusion.v1.ScanService/SendVR"
	// ScanServiceWaitingProcedure is the fully-qualified name of the ScanService's Waiting RPC.
	ScanServiceWaitingProcedure = "/threedoclusion.v1.ScanService/Waiting"
	// ScanServiceAddScanProcedure is the fully-qualified name of the ScanService's AddScan RPC.
	ScanServiceAddScanProcedure = "/threedoclusion.v1.ScanService/AddScan"
	// ScanServiceDeleteScanByIdProcedure is the fully-qualified name of the ScanService's
	// DeleteScanById RPC.
	ScanServiceDeleteScanByIdProcedure = "/threedoclusion.v1.ScanService/DeleteScanById"
	// ScanServiceGetAllScansProcedure is the fully-qualified name of the ScanService's GetAllScans RPC.
	ScanServiceGetAllScansProcedure = "/threedoclusion.v1.ScanService/GetAllScans"
	// ScanServiceGetScanByIdProcedure is the fully-qualified name of the ScanService's GetScanById RPC.
	ScanServiceGetScanByIdProcedure = "/threedoclusion.v1.ScanService/GetScanById"
	// ScanServiceAddTagProcedure is the fully-qualified name of the ScanService's AddTag RPC.
	ScanServiceAddTagProcedure = "/threedoclusion.v1.ScanService/AddTag"
	// ScanServiceDeleteTagByIdProcedure is the fully-qualified name of the ScanService's DeleteTagById
	// RPC.
	ScanServiceDeleteTagByIdProcedure = "/threedoclusion.v1.ScanService/DeleteTagById"
	// ScanServiceGetAllTagsProcedure is the fully-qualified name of the ScanService's GetAllTags RPC.
	ScanServiceGetAllTagsProcedure = "/threedoclusion.v1.ScanService/GetAllTags"
	// ScanServiceGetTagByIdProcedure is the fully-qualified name of the ScanService's GetTagById RPC.
	ScanServiceGetTagByIdProcedure = "/threedoclusion.v1.ScanService/GetTagById"
	// ScanServiceSendPositionScanProcedure is the fully-qualified name of the ScanService's
	// SendPositionScan RPC.
	ScanServiceSendPositionScanProcedure = "/threedoclusion.v1.ScanService/SendPositionScan"
	// ScanServiceGetPositionScanProcedure is the fully-qualified name of the ScanService's
	// GetPositionScan RPC.
	ScanServiceGetPositionScanProcedure = "/threedoclusion.v1.ScanService/GetPositionScan"
	// ScanServiceAddPatientProcedure is the fully-qualified name of the ScanService's AddPatient RPC.
	ScanServiceAddPatientProcedure = "/threedoclusion.v1.ScanService/AddPatient"
	// ScanServiceDeletePatientByIdProcedure is the fully-qualified name of the ScanService's
	// DeletePatientById RPC.
	ScanServiceDeletePatientByIdProcedure = "/threedoclusion.v1.ScanService/DeletePatientById"
	// ScanServiceGetAllPatientsProcedure is the fully-qualified name of the ScanService's
	// GetAllPatients RPC.
	ScanServiceGetAllPatientsProcedure = "/threedoclusion.v1.ScanService/GetAllPatients"
	// ScanServiceGetPatientByIdProcedure is the fully-qualified name of the ScanService's
	// GetPatientById RPC.
	ScanServiceGetPatientByIdProcedure = "/threedoclusion.v1.ScanService/GetPatientById"
	// ScanServiceGetPatientByNameProcedure is the fully-qualified name of the ScanService's
	// GetPatientByName RPC.
	ScanServiceGetPatientByNameProcedure = "/threedoclusion.v1.ScanService/GetPatientByName"
	// ScanServiceUpdatePatientByIdProcedure is the fully-qualified name of the ScanService's
	// UpdatePatientById RPC.
	ScanServiceUpdatePatientByIdProcedure = "/threedoclusion.v1.ScanService/UpdatePatientById"
	// ScanServiceAddDentistProcedure is the fully-qualified name of the ScanService's AddDentist RPC.
	ScanServiceAddDentistProcedure = "/threedoclusion.v1.ScanService/AddDentist"
	// ScanServiceDeleteDentistByIdProcedure is the fully-qualified name of the ScanService's
	// DeleteDentistById RPC.
	ScanServiceDeleteDentistByIdProcedure = "/threedoclusion.v1.ScanService/DeleteDentistById"
	// ScanServiceGetAllDentistsProcedure is the fully-qualified name of the ScanService's
	// GetAllDentists RPC.
	ScanServiceGetAllDentistsProcedure = "/threedoclusion.v1.ScanService/GetAllDentists"
	// ScanServiceGetDentistByIdProcedure is the fully-qualified name of the ScanService's
	// GetDentistById RPC.
	ScanServiceGetDentistByIdProcedure = "/threedoclusion.v1.ScanService/GetDentistById"
	// ScanServiceUpdateDentistByIdProcedure is the fully-qualified name of the ScanService's
	// UpdateDentistById RPC.
	ScanServiceUpdateDentistByIdProcedure = "/threedoclusion.v1.ScanService/UpdateDentistById"
	// ScanServiceLoginProcedure is the fully-qualified name of the ScanService's Login RPC.
	ScanServiceLoginProcedure = "/threedoclusion.v1.ScanService/Login"
	// ScanServiceRegisterProcedure is the fully-qualified name of the ScanService's Register RPC.
	ScanServiceRegisterProcedure = "/threedoclusion.v1.ScanService/Register"
)

// ScanServiceClient is a client for the threedoclusion.v1.ScanService service.
type ScanServiceClient interface {
	SendVR(context.Context, *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error)
	Waiting(context.Context, *connect_go.Request[v1.WaitingRequest]) (*connect_go.ServerStreamForClient[v1.WaitingResponse], error)
	AddScan(context.Context, *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error)
	DeleteScanById(context.Context, *connect_go.Request[v1.DeleteScanByIdRequest]) (*connect_go.Response[v1.DeleteScanByIdResponse], error)
	GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error)
	GetScanById(context.Context, *connect_go.Request[v1.GetScanByIdRequest]) (*connect_go.Response[v1.GetScanByIdResponse], error)
	AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error)
	DeleteTagById(context.Context, *connect_go.Request[v1.DeleteTagByIdRequest]) (*connect_go.Response[v1.DeleteTagByIdResponse], error)
	GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error)
	GetTagById(context.Context, *connect_go.Request[v1.GetTagByIdRequest]) (*connect_go.Response[v1.GetTagByIdResponse], error)
	SendPositionScan(context.Context, *connect_go.Request[v1.SendPositionScanRequest]) (*connect_go.Response[v1.SendPositionScanResponse], error)
	GetPositionScan(context.Context, *connect_go.Request[v1.GetPositionScanRequest]) (*connect_go.Response[v1.GetPositionScanResponse], error)
	AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error)
	DeletePatientById(context.Context, *connect_go.Request[v1.DeletePatientByIdRequest]) (*connect_go.Response[v1.DeletePatientByIdResponse], error)
	GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error)
	GetPatientById(context.Context, *connect_go.Request[v1.GetPatientByIdRequest]) (*connect_go.Response[v1.GetPatientByIdResponse], error)
	GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error)
	UpdatePatientById(context.Context, *connect_go.Request[v1.UpdatePatientByIdRequest]) (*connect_go.Response[v1.UpdatePatientByIdResponse], error)
	AddDentist(context.Context, *connect_go.Request[v1.AddDentistRequest]) (*connect_go.Response[v1.AddDentistResponse], error)
	DeleteDentistById(context.Context, *connect_go.Request[v1.DeleteDentistByIdRequest]) (*connect_go.Response[v1.DeleteDentistByIdResponse], error)
	GetAllDentists(context.Context, *connect_go.Request[v1.GetAllDentistsRequest]) (*connect_go.Response[v1.GetAllDentistsResponse], error)
	GetDentistById(context.Context, *connect_go.Request[v1.GetDentistByIdRequest]) (*connect_go.Response[v1.GetDentistByIdResponse], error)
	UpdateDentistById(context.Context, *connect_go.Request[v1.UpdateDentistByIdRequest]) (*connect_go.Response[v1.UpdateDentistByIdResponse], error)
	Login(context.Context, *connect_go.Request[v1.LoginRequest]) (*connect_go.Response[v1.LoginResponse], error)
	Register(context.Context, *connect_go.Request[v1.RegisterRequest]) (*connect_go.Response[v1.RegisterResponse], error)
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
			baseURL+ScanServiceSendVRProcedure,
			opts...,
		),
		waiting: connect_go.NewClient[v1.WaitingRequest, v1.WaitingResponse](
			httpClient,
			baseURL+ScanServiceWaitingProcedure,
			opts...,
		),
		addScan: connect_go.NewClient[v1.AddScanRequest, v1.AddScanResponse](
			httpClient,
			baseURL+ScanServiceAddScanProcedure,
			opts...,
		),
		deleteScanById: connect_go.NewClient[v1.DeleteScanByIdRequest, v1.DeleteScanByIdResponse](
			httpClient,
			baseURL+ScanServiceDeleteScanByIdProcedure,
			opts...,
		),
		getAllScans: connect_go.NewClient[v1.GetAllScansRequest, v1.GetAllScansResponse](
			httpClient,
			baseURL+ScanServiceGetAllScansProcedure,
			opts...,
		),
		getScanById: connect_go.NewClient[v1.GetScanByIdRequest, v1.GetScanByIdResponse](
			httpClient,
			baseURL+ScanServiceGetScanByIdProcedure,
			opts...,
		),
		addTag: connect_go.NewClient[v1.AddTagRequest, v1.AddTagResponse](
			httpClient,
			baseURL+ScanServiceAddTagProcedure,
			opts...,
		),
		deleteTagById: connect_go.NewClient[v1.DeleteTagByIdRequest, v1.DeleteTagByIdResponse](
			httpClient,
			baseURL+ScanServiceDeleteTagByIdProcedure,
			opts...,
		),
		getAllTags: connect_go.NewClient[v1.GetAllTagsRequest, v1.GetAllTagsResponse](
			httpClient,
			baseURL+ScanServiceGetAllTagsProcedure,
			opts...,
		),
		getTagById: connect_go.NewClient[v1.GetTagByIdRequest, v1.GetTagByIdResponse](
			httpClient,
			baseURL+ScanServiceGetTagByIdProcedure,
			opts...,
		),
		sendPositionScan: connect_go.NewClient[v1.SendPositionScanRequest, v1.SendPositionScanResponse](
			httpClient,
			baseURL+ScanServiceSendPositionScanProcedure,
			opts...,
		),
		getPositionScan: connect_go.NewClient[v1.GetPositionScanRequest, v1.GetPositionScanResponse](
			httpClient,
			baseURL+ScanServiceGetPositionScanProcedure,
			opts...,
		),
		addPatient: connect_go.NewClient[v1.AddPatientRequest, v1.AddPatientResponse](
			httpClient,
			baseURL+ScanServiceAddPatientProcedure,
			opts...,
		),
		deletePatientById: connect_go.NewClient[v1.DeletePatientByIdRequest, v1.DeletePatientByIdResponse](
			httpClient,
			baseURL+ScanServiceDeletePatientByIdProcedure,
			opts...,
		),
		getAllPatients: connect_go.NewClient[v1.GetAllPatientsRequest, v1.GetAllPatientsResponse](
			httpClient,
			baseURL+ScanServiceGetAllPatientsProcedure,
			opts...,
		),
		getPatientById: connect_go.NewClient[v1.GetPatientByIdRequest, v1.GetPatientByIdResponse](
			httpClient,
			baseURL+ScanServiceGetPatientByIdProcedure,
			opts...,
		),
		getPatientByName: connect_go.NewClient[v1.GetPatientByNameRequest, v1.GetPatientByNameResponse](
			httpClient,
			baseURL+ScanServiceGetPatientByNameProcedure,
			opts...,
		),
		updatePatientById: connect_go.NewClient[v1.UpdatePatientByIdRequest, v1.UpdatePatientByIdResponse](
			httpClient,
			baseURL+ScanServiceUpdatePatientByIdProcedure,
			opts...,
		),
		addDentist: connect_go.NewClient[v1.AddDentistRequest, v1.AddDentistResponse](
			httpClient,
			baseURL+ScanServiceAddDentistProcedure,
			opts...,
		),
		deleteDentistById: connect_go.NewClient[v1.DeleteDentistByIdRequest, v1.DeleteDentistByIdResponse](
			httpClient,
			baseURL+ScanServiceDeleteDentistByIdProcedure,
			opts...,
		),
		getAllDentists: connect_go.NewClient[v1.GetAllDentistsRequest, v1.GetAllDentistsResponse](
			httpClient,
			baseURL+ScanServiceGetAllDentistsProcedure,
			opts...,
		),
		getDentistById: connect_go.NewClient[v1.GetDentistByIdRequest, v1.GetDentistByIdResponse](
			httpClient,
			baseURL+ScanServiceGetDentistByIdProcedure,
			opts...,
		),
		updateDentistById: connect_go.NewClient[v1.UpdateDentistByIdRequest, v1.UpdateDentistByIdResponse](
			httpClient,
			baseURL+ScanServiceUpdateDentistByIdProcedure,
			opts...,
		),
		login: connect_go.NewClient[v1.LoginRequest, v1.LoginResponse](
			httpClient,
			baseURL+ScanServiceLoginProcedure,
			opts...,
		),
		register: connect_go.NewClient[v1.RegisterRequest, v1.RegisterResponse](
			httpClient,
			baseURL+ScanServiceRegisterProcedure,
			opts...,
		),
	}
}

// scanServiceClient implements ScanServiceClient.
type scanServiceClient struct {
	sendVR            *connect_go.Client[v1.SendVRRequest, v1.SendVRResponse]
	waiting           *connect_go.Client[v1.WaitingRequest, v1.WaitingResponse]
	addScan           *connect_go.Client[v1.AddScanRequest, v1.AddScanResponse]
	deleteScanById    *connect_go.Client[v1.DeleteScanByIdRequest, v1.DeleteScanByIdResponse]
	getAllScans       *connect_go.Client[v1.GetAllScansRequest, v1.GetAllScansResponse]
	getScanById       *connect_go.Client[v1.GetScanByIdRequest, v1.GetScanByIdResponse]
	addTag            *connect_go.Client[v1.AddTagRequest, v1.AddTagResponse]
	deleteTagById     *connect_go.Client[v1.DeleteTagByIdRequest, v1.DeleteTagByIdResponse]
	getAllTags        *connect_go.Client[v1.GetAllTagsRequest, v1.GetAllTagsResponse]
	getTagById        *connect_go.Client[v1.GetTagByIdRequest, v1.GetTagByIdResponse]
	sendPositionScan  *connect_go.Client[v1.SendPositionScanRequest, v1.SendPositionScanResponse]
	getPositionScan   *connect_go.Client[v1.GetPositionScanRequest, v1.GetPositionScanResponse]
	addPatient        *connect_go.Client[v1.AddPatientRequest, v1.AddPatientResponse]
	deletePatientById *connect_go.Client[v1.DeletePatientByIdRequest, v1.DeletePatientByIdResponse]
	getAllPatients    *connect_go.Client[v1.GetAllPatientsRequest, v1.GetAllPatientsResponse]
	getPatientById    *connect_go.Client[v1.GetPatientByIdRequest, v1.GetPatientByIdResponse]
	getPatientByName  *connect_go.Client[v1.GetPatientByNameRequest, v1.GetPatientByNameResponse]
	updatePatientById *connect_go.Client[v1.UpdatePatientByIdRequest, v1.UpdatePatientByIdResponse]
	addDentist        *connect_go.Client[v1.AddDentistRequest, v1.AddDentistResponse]
	deleteDentistById *connect_go.Client[v1.DeleteDentistByIdRequest, v1.DeleteDentistByIdResponse]
	getAllDentists    *connect_go.Client[v1.GetAllDentistsRequest, v1.GetAllDentistsResponse]
	getDentistById    *connect_go.Client[v1.GetDentistByIdRequest, v1.GetDentistByIdResponse]
	updateDentistById *connect_go.Client[v1.UpdateDentistByIdRequest, v1.UpdateDentistByIdResponse]
	login             *connect_go.Client[v1.LoginRequest, v1.LoginResponse]
	register          *connect_go.Client[v1.RegisterRequest, v1.RegisterResponse]
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

// DeleteScanById calls threedoclusion.v1.ScanService.DeleteScanById.
func (c *scanServiceClient) DeleteScanById(ctx context.Context, req *connect_go.Request[v1.DeleteScanByIdRequest]) (*connect_go.Response[v1.DeleteScanByIdResponse], error) {
	return c.deleteScanById.CallUnary(ctx, req)
}

// GetAllScans calls threedoclusion.v1.ScanService.GetAllScans.
func (c *scanServiceClient) GetAllScans(ctx context.Context, req *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error) {
	return c.getAllScans.CallUnary(ctx, req)
}

// GetScanById calls threedoclusion.v1.ScanService.GetScanById.
func (c *scanServiceClient) GetScanById(ctx context.Context, req *connect_go.Request[v1.GetScanByIdRequest]) (*connect_go.Response[v1.GetScanByIdResponse], error) {
	return c.getScanById.CallUnary(ctx, req)
}

// AddTag calls threedoclusion.v1.ScanService.AddTag.
func (c *scanServiceClient) AddTag(ctx context.Context, req *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error) {
	return c.addTag.CallUnary(ctx, req)
}

// DeleteTagById calls threedoclusion.v1.ScanService.DeleteTagById.
func (c *scanServiceClient) DeleteTagById(ctx context.Context, req *connect_go.Request[v1.DeleteTagByIdRequest]) (*connect_go.Response[v1.DeleteTagByIdResponse], error) {
	return c.deleteTagById.CallUnary(ctx, req)
}

// GetAllTags calls threedoclusion.v1.ScanService.GetAllTags.
func (c *scanServiceClient) GetAllTags(ctx context.Context, req *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error) {
	return c.getAllTags.CallUnary(ctx, req)
}

// GetTagById calls threedoclusion.v1.ScanService.GetTagById.
func (c *scanServiceClient) GetTagById(ctx context.Context, req *connect_go.Request[v1.GetTagByIdRequest]) (*connect_go.Response[v1.GetTagByIdResponse], error) {
	return c.getTagById.CallUnary(ctx, req)
}

// SendPositionScan calls threedoclusion.v1.ScanService.SendPositionScan.
func (c *scanServiceClient) SendPositionScan(ctx context.Context, req *connect_go.Request[v1.SendPositionScanRequest]) (*connect_go.Response[v1.SendPositionScanResponse], error) {
	return c.sendPositionScan.CallUnary(ctx, req)
}

// GetPositionScan calls threedoclusion.v1.ScanService.GetPositionScan.
func (c *scanServiceClient) GetPositionScan(ctx context.Context, req *connect_go.Request[v1.GetPositionScanRequest]) (*connect_go.Response[v1.GetPositionScanResponse], error) {
	return c.getPositionScan.CallUnary(ctx, req)
}

// AddPatient calls threedoclusion.v1.ScanService.AddPatient.
func (c *scanServiceClient) AddPatient(ctx context.Context, req *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error) {
	return c.addPatient.CallUnary(ctx, req)
}

// DeletePatientById calls threedoclusion.v1.ScanService.DeletePatientById.
func (c *scanServiceClient) DeletePatientById(ctx context.Context, req *connect_go.Request[v1.DeletePatientByIdRequest]) (*connect_go.Response[v1.DeletePatientByIdResponse], error) {
	return c.deletePatientById.CallUnary(ctx, req)
}

// GetAllPatients calls threedoclusion.v1.ScanService.GetAllPatients.
func (c *scanServiceClient) GetAllPatients(ctx context.Context, req *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error) {
	return c.getAllPatients.CallUnary(ctx, req)
}

// GetPatientById calls threedoclusion.v1.ScanService.GetPatientById.
func (c *scanServiceClient) GetPatientById(ctx context.Context, req *connect_go.Request[v1.GetPatientByIdRequest]) (*connect_go.Response[v1.GetPatientByIdResponse], error) {
	return c.getPatientById.CallUnary(ctx, req)
}

// GetPatientByName calls threedoclusion.v1.ScanService.GetPatientByName.
func (c *scanServiceClient) GetPatientByName(ctx context.Context, req *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error) {
	return c.getPatientByName.CallUnary(ctx, req)
}

// UpdatePatientById calls threedoclusion.v1.ScanService.UpdatePatientById.
func (c *scanServiceClient) UpdatePatientById(ctx context.Context, req *connect_go.Request[v1.UpdatePatientByIdRequest]) (*connect_go.Response[v1.UpdatePatientByIdResponse], error) {
	return c.updatePatientById.CallUnary(ctx, req)
}

// AddDentist calls threedoclusion.v1.ScanService.AddDentist.
func (c *scanServiceClient) AddDentist(ctx context.Context, req *connect_go.Request[v1.AddDentistRequest]) (*connect_go.Response[v1.AddDentistResponse], error) {
	return c.addDentist.CallUnary(ctx, req)
}

// DeleteDentistById calls threedoclusion.v1.ScanService.DeleteDentistById.
func (c *scanServiceClient) DeleteDentistById(ctx context.Context, req *connect_go.Request[v1.DeleteDentistByIdRequest]) (*connect_go.Response[v1.DeleteDentistByIdResponse], error) {
	return c.deleteDentistById.CallUnary(ctx, req)
}

// GetAllDentists calls threedoclusion.v1.ScanService.GetAllDentists.
func (c *scanServiceClient) GetAllDentists(ctx context.Context, req *connect_go.Request[v1.GetAllDentistsRequest]) (*connect_go.Response[v1.GetAllDentistsResponse], error) {
	return c.getAllDentists.CallUnary(ctx, req)
}

// GetDentistById calls threedoclusion.v1.ScanService.GetDentistById.
func (c *scanServiceClient) GetDentistById(ctx context.Context, req *connect_go.Request[v1.GetDentistByIdRequest]) (*connect_go.Response[v1.GetDentistByIdResponse], error) {
	return c.getDentistById.CallUnary(ctx, req)
}

// UpdateDentistById calls threedoclusion.v1.ScanService.UpdateDentistById.
func (c *scanServiceClient) UpdateDentistById(ctx context.Context, req *connect_go.Request[v1.UpdateDentistByIdRequest]) (*connect_go.Response[v1.UpdateDentistByIdResponse], error) {
	return c.updateDentistById.CallUnary(ctx, req)
}

// Login calls threedoclusion.v1.ScanService.Login.
func (c *scanServiceClient) Login(ctx context.Context, req *connect_go.Request[v1.LoginRequest]) (*connect_go.Response[v1.LoginResponse], error) {
	return c.login.CallUnary(ctx, req)
}

// Register calls threedoclusion.v1.ScanService.Register.
func (c *scanServiceClient) Register(ctx context.Context, req *connect_go.Request[v1.RegisterRequest]) (*connect_go.Response[v1.RegisterResponse], error) {
	return c.register.CallUnary(ctx, req)
}

// ScanServiceHandler is an implementation of the threedoclusion.v1.ScanService service.
type ScanServiceHandler interface {
	SendVR(context.Context, *connect_go.Request[v1.SendVRRequest]) (*connect_go.Response[v1.SendVRResponse], error)
	Waiting(context.Context, *connect_go.Request[v1.WaitingRequest], *connect_go.ServerStream[v1.WaitingResponse]) error
	AddScan(context.Context, *connect_go.Request[v1.AddScanRequest]) (*connect_go.Response[v1.AddScanResponse], error)
	DeleteScanById(context.Context, *connect_go.Request[v1.DeleteScanByIdRequest]) (*connect_go.Response[v1.DeleteScanByIdResponse], error)
	GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error)
	GetScanById(context.Context, *connect_go.Request[v1.GetScanByIdRequest]) (*connect_go.Response[v1.GetScanByIdResponse], error)
	AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error)
	DeleteTagById(context.Context, *connect_go.Request[v1.DeleteTagByIdRequest]) (*connect_go.Response[v1.DeleteTagByIdResponse], error)
	GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error)
	GetTagById(context.Context, *connect_go.Request[v1.GetTagByIdRequest]) (*connect_go.Response[v1.GetTagByIdResponse], error)
	SendPositionScan(context.Context, *connect_go.Request[v1.SendPositionScanRequest]) (*connect_go.Response[v1.SendPositionScanResponse], error)
	GetPositionScan(context.Context, *connect_go.Request[v1.GetPositionScanRequest]) (*connect_go.Response[v1.GetPositionScanResponse], error)
	AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error)
	DeletePatientById(context.Context, *connect_go.Request[v1.DeletePatientByIdRequest]) (*connect_go.Response[v1.DeletePatientByIdResponse], error)
	GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error)
	GetPatientById(context.Context, *connect_go.Request[v1.GetPatientByIdRequest]) (*connect_go.Response[v1.GetPatientByIdResponse], error)
	GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error)
	UpdatePatientById(context.Context, *connect_go.Request[v1.UpdatePatientByIdRequest]) (*connect_go.Response[v1.UpdatePatientByIdResponse], error)
	AddDentist(context.Context, *connect_go.Request[v1.AddDentistRequest]) (*connect_go.Response[v1.AddDentistResponse], error)
	DeleteDentistById(context.Context, *connect_go.Request[v1.DeleteDentistByIdRequest]) (*connect_go.Response[v1.DeleteDentistByIdResponse], error)
	GetAllDentists(context.Context, *connect_go.Request[v1.GetAllDentistsRequest]) (*connect_go.Response[v1.GetAllDentistsResponse], error)
	GetDentistById(context.Context, *connect_go.Request[v1.GetDentistByIdRequest]) (*connect_go.Response[v1.GetDentistByIdResponse], error)
	UpdateDentistById(context.Context, *connect_go.Request[v1.UpdateDentistByIdRequest]) (*connect_go.Response[v1.UpdateDentistByIdResponse], error)
	Login(context.Context, *connect_go.Request[v1.LoginRequest]) (*connect_go.Response[v1.LoginResponse], error)
	Register(context.Context, *connect_go.Request[v1.RegisterRequest]) (*connect_go.Response[v1.RegisterResponse], error)
}

// NewScanServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewScanServiceHandler(svc ScanServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	mux := http.NewServeMux()
	mux.Handle(ScanServiceSendVRProcedure, connect_go.NewUnaryHandler(
		ScanServiceSendVRProcedure,
		svc.SendVR,
		opts...,
	))
	mux.Handle(ScanServiceWaitingProcedure, connect_go.NewServerStreamHandler(
		ScanServiceWaitingProcedure,
		svc.Waiting,
		opts...,
	))
	mux.Handle(ScanServiceAddScanProcedure, connect_go.NewUnaryHandler(
		ScanServiceAddScanProcedure,
		svc.AddScan,
		opts...,
	))
	mux.Handle(ScanServiceDeleteScanByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceDeleteScanByIdProcedure,
		svc.DeleteScanById,
		opts...,
	))
	mux.Handle(ScanServiceGetAllScansProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetAllScansProcedure,
		svc.GetAllScans,
		opts...,
	))
	mux.Handle(ScanServiceGetScanByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetScanByIdProcedure,
		svc.GetScanById,
		opts...,
	))
	mux.Handle(ScanServiceAddTagProcedure, connect_go.NewUnaryHandler(
		ScanServiceAddTagProcedure,
		svc.AddTag,
		opts...,
	))
	mux.Handle(ScanServiceDeleteTagByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceDeleteTagByIdProcedure,
		svc.DeleteTagById,
		opts...,
	))
	mux.Handle(ScanServiceGetAllTagsProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetAllTagsProcedure,
		svc.GetAllTags,
		opts...,
	))
	mux.Handle(ScanServiceGetTagByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetTagByIdProcedure,
		svc.GetTagById,
		opts...,
	))
	mux.Handle(ScanServiceSendPositionScanProcedure, connect_go.NewUnaryHandler(
		ScanServiceSendPositionScanProcedure,
		svc.SendPositionScan,
		opts...,
	))
	mux.Handle(ScanServiceGetPositionScanProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetPositionScanProcedure,
		svc.GetPositionScan,
		opts...,
	))
	mux.Handle(ScanServiceAddPatientProcedure, connect_go.NewUnaryHandler(
		ScanServiceAddPatientProcedure,
		svc.AddPatient,
		opts...,
	))
	mux.Handle(ScanServiceDeletePatientByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceDeletePatientByIdProcedure,
		svc.DeletePatientById,
		opts...,
	))
	mux.Handle(ScanServiceGetAllPatientsProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetAllPatientsProcedure,
		svc.GetAllPatients,
		opts...,
	))
	mux.Handle(ScanServiceGetPatientByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetPatientByIdProcedure,
		svc.GetPatientById,
		opts...,
	))
	mux.Handle(ScanServiceGetPatientByNameProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetPatientByNameProcedure,
		svc.GetPatientByName,
		opts...,
	))
	mux.Handle(ScanServiceUpdatePatientByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceUpdatePatientByIdProcedure,
		svc.UpdatePatientById,
		opts...,
	))
	mux.Handle(ScanServiceAddDentistProcedure, connect_go.NewUnaryHandler(
		ScanServiceAddDentistProcedure,
		svc.AddDentist,
		opts...,
	))
	mux.Handle(ScanServiceDeleteDentistByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceDeleteDentistByIdProcedure,
		svc.DeleteDentistById,
		opts...,
	))
	mux.Handle(ScanServiceGetAllDentistsProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetAllDentistsProcedure,
		svc.GetAllDentists,
		opts...,
	))
	mux.Handle(ScanServiceGetDentistByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceGetDentistByIdProcedure,
		svc.GetDentistById,
		opts...,
	))
	mux.Handle(ScanServiceUpdateDentistByIdProcedure, connect_go.NewUnaryHandler(
		ScanServiceUpdateDentistByIdProcedure,
		svc.UpdateDentistById,
		opts...,
	))
	mux.Handle(ScanServiceLoginProcedure, connect_go.NewUnaryHandler(
		ScanServiceLoginProcedure,
		svc.Login,
		opts...,
	))
	mux.Handle(ScanServiceRegisterProcedure, connect_go.NewUnaryHandler(
		ScanServiceRegisterProcedure,
		svc.Register,
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

func (UnimplementedScanServiceHandler) DeleteScanById(context.Context, *connect_go.Request[v1.DeleteScanByIdRequest]) (*connect_go.Response[v1.DeleteScanByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeleteScanById is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllScans(context.Context, *connect_go.Request[v1.GetAllScansRequest]) (*connect_go.Response[v1.GetAllScansResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllScans is not implemented"))
}

func (UnimplementedScanServiceHandler) GetScanById(context.Context, *connect_go.Request[v1.GetScanByIdRequest]) (*connect_go.Response[v1.GetScanByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetScanById is not implemented"))
}

func (UnimplementedScanServiceHandler) AddTag(context.Context, *connect_go.Request[v1.AddTagRequest]) (*connect_go.Response[v1.AddTagResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddTag is not implemented"))
}

func (UnimplementedScanServiceHandler) DeleteTagById(context.Context, *connect_go.Request[v1.DeleteTagByIdRequest]) (*connect_go.Response[v1.DeleteTagByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeleteTagById is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllTags(context.Context, *connect_go.Request[v1.GetAllTagsRequest]) (*connect_go.Response[v1.GetAllTagsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllTags is not implemented"))
}

func (UnimplementedScanServiceHandler) GetTagById(context.Context, *connect_go.Request[v1.GetTagByIdRequest]) (*connect_go.Response[v1.GetTagByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetTagById is not implemented"))
}

func (UnimplementedScanServiceHandler) SendPositionScan(context.Context, *connect_go.Request[v1.SendPositionScanRequest]) (*connect_go.Response[v1.SendPositionScanResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.SendPositionScan is not implemented"))
}

func (UnimplementedScanServiceHandler) GetPositionScan(context.Context, *connect_go.Request[v1.GetPositionScanRequest]) (*connect_go.Response[v1.GetPositionScanResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetPositionScan is not implemented"))
}

func (UnimplementedScanServiceHandler) AddPatient(context.Context, *connect_go.Request[v1.AddPatientRequest]) (*connect_go.Response[v1.AddPatientResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddPatient is not implemented"))
}

func (UnimplementedScanServiceHandler) DeletePatientById(context.Context, *connect_go.Request[v1.DeletePatientByIdRequest]) (*connect_go.Response[v1.DeletePatientByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeletePatientById is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllPatients(context.Context, *connect_go.Request[v1.GetAllPatientsRequest]) (*connect_go.Response[v1.GetAllPatientsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllPatients is not implemented"))
}

func (UnimplementedScanServiceHandler) GetPatientById(context.Context, *connect_go.Request[v1.GetPatientByIdRequest]) (*connect_go.Response[v1.GetPatientByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetPatientById is not implemented"))
}

func (UnimplementedScanServiceHandler) GetPatientByName(context.Context, *connect_go.Request[v1.GetPatientByNameRequest]) (*connect_go.Response[v1.GetPatientByNameResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetPatientByName is not implemented"))
}

func (UnimplementedScanServiceHandler) UpdatePatientById(context.Context, *connect_go.Request[v1.UpdatePatientByIdRequest]) (*connect_go.Response[v1.UpdatePatientByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.UpdatePatientById is not implemented"))
}

func (UnimplementedScanServiceHandler) AddDentist(context.Context, *connect_go.Request[v1.AddDentistRequest]) (*connect_go.Response[v1.AddDentistResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.AddDentist is not implemented"))
}

func (UnimplementedScanServiceHandler) DeleteDentistById(context.Context, *connect_go.Request[v1.DeleteDentistByIdRequest]) (*connect_go.Response[v1.DeleteDentistByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.DeleteDentistById is not implemented"))
}

func (UnimplementedScanServiceHandler) GetAllDentists(context.Context, *connect_go.Request[v1.GetAllDentistsRequest]) (*connect_go.Response[v1.GetAllDentistsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetAllDentists is not implemented"))
}

func (UnimplementedScanServiceHandler) GetDentistById(context.Context, *connect_go.Request[v1.GetDentistByIdRequest]) (*connect_go.Response[v1.GetDentistByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.GetDentistById is not implemented"))
}

func (UnimplementedScanServiceHandler) UpdateDentistById(context.Context, *connect_go.Request[v1.UpdateDentistByIdRequest]) (*connect_go.Response[v1.UpdateDentistByIdResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.UpdateDentistById is not implemented"))
}

func (UnimplementedScanServiceHandler) Login(context.Context, *connect_go.Request[v1.LoginRequest]) (*connect_go.Response[v1.LoginResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.Login is not implemented"))
}

func (UnimplementedScanServiceHandler) Register(context.Context, *connect_go.Request[v1.RegisterRequest]) (*connect_go.Response[v1.RegisterResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("threedoclusion.v1.ScanService.Register is not implemented"))
}
