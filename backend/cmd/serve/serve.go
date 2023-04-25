package serve

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/dentists"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_datastructures"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/patients"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/push"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/scans"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/tags"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/vr"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1/threedoclusionv1connect"
	"github.com/bufbuild/connect-go"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

type ServerStruct struct {
	database *sql.DB
	redirectVRChannels *help_datastructures.MapChannels
	connections *help_datastructures.MapConnections
}

func setCors(mux http.Handler) http.Handler {
	muxHandler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Connect-Protocol-Version", "Content-Type"},
		Debug:            true, // Enable Debugging for testing, consider disabling in production
	})
	muxHandler = c.Handler(muxHandler)

	return muxHandler
}

func Server(database *sql.DB) {
	redirectVRChannels := help_datastructures.NewMap()

	connections := help_datastructures.NewConnections()

	server := &ServerStruct{database, redirectVRChannels, connections}

	mux := http.NewServeMux()
	path, handler := threedoclusionv1connect.NewScanServiceHandler(server)
	mux.Handle(path, handler)

	muxHandler := setCors(mux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	address := fmt.Sprintf("0.0.0.0:%s", port)

	http.ListenAndServe(
		address,
		h2c.NewHandler(muxHandler, &http2.Server{}),
	)

}

// PUSH
func (s *ServerStruct) SendMenuOption(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.SendMenuOptionRequest],
) (*connect.Response[threedoclusionv1.SendMenuOptionResponse], error) {
	return push.SendMenuOption(req, s.connections, s.database)
}

func (s *ServerStruct) SubscribeConnection(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.SubscribeConnectionRequest], stream *connect.ServerStream[threedoclusionv1.SubscribeConnectionResponse],
) error {
	return push.SubscribeConnection(ctx, req, stream, s.connections)
}

func (s *ServerStruct) UpdateConnectionStatus(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.UpdateConnectionStatusRequest],
) (*connect.Response[threedoclusionv1.UpdateConnectionStatusResponse], error) {
	return push.UpdateConnectionStatus(req, s.connections, s.database)
}



func (s *ServerStruct) SendVR(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.SendVRRequest],
) (*connect.Response[threedoclusionv1.SendVRResponse], error) {
	return push.SendToVR(req, s.redirectVRChannels)
}

func (s *ServerStruct) Waiting(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.WaitingRequest], stream *connect.ServerStream[threedoclusionv1.WaitingResponse],
) error {
	return push.GetWaitingResponse(req, stream, s.redirectVRChannels)
}

// SCANS
func (s *ServerStruct) AddScan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddScanRequest],
) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	return scans.AddScan(req, s.database)
}

func (s *ServerStruct) DeleteScan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeleteScanRequest],
) (*connect.Response[threedoclusionv1.DeleteScanResponse], error) {
	return scans.DeleteScan(req, s.database)
}

func (s *ServerStruct) GetAllScans(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllScansRequest],
) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	return scans.GetAllScans(req, s.database)
}

func (s *ServerStruct) GetScanByID(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetScanByIDRequest],
) (*connect.Response[threedoclusionv1.GetScanByIDResponse], error) {
	return scans.GetScanByID(req, s.database)
}

func (s *ServerStruct) GetScanByDate(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetScanByDateRequest],
) (*connect.Response[threedoclusionv1.GetScanByDateResponse], error) {
	return scans.GetScanByDate(req, s.database)
}

// TAGS
func (s *ServerStruct) AddTag(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddTagRequest],
) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	return tags.AddTag(req, s.database)
}

func (s *ServerStruct) DeleteTag(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeleteTagRequest],
) (*connect.Response[threedoclusionv1.DeleteTagResponse], error) {
	return tags.DeleteTag(req, s.database)
}

func (s *ServerStruct) GetAllTags(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllTagsRequest],
) (*connect.Response[threedoclusionv1.GetAllTagsResponse], error) {
	return tags.GetAllTags(req, s.database)
}

func (s *ServerStruct) GetTagByID(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetTagByIDRequest],
) (*connect.Response[threedoclusionv1.GetTagByIDResponse], error) {
	return tags.GetTagByID(req, s.database)
}

func (s *ServerStruct) GetAllTagsByType(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllTagsByTypeRequest],
) (*connect.Response[threedoclusionv1.GetAllTagsByTypeResponse], error) {
	return tags.GetAllTagsByType(req, s.database)
}

func (s *ServerStruct) GetPositionScan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetPositionScanRequest],
) (*connect.Response[threedoclusionv1.GetPositionScanResponse], error) {
	return vr.GetPositionScan(req)
}

func (s *ServerStruct) SendPositionScan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.SendPositionScanRequest],
) (*connect.Response[threedoclusionv1.SendPositionScanResponse], error) {
	return vr.SendPositionScan(req)
}
// PATIENTS
func (s *ServerStruct) AddPatient(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddPatientRequest],
) (*connect.Response[threedoclusionv1.AddPatientResponse], error) {
	return patients.AddPatient(req, s.database)
}

func (s *ServerStruct) DeletePatient(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeletePatientRequest],
) (*connect.Response[threedoclusionv1.DeletePatientResponse], error) {
	return patients.DeletePatient(req, s.database)
}

func (s *ServerStruct) GetAllPatients(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllPatientsRequest],
) (*connect.Response[threedoclusionv1.GetAllPatientsResponse], error) {
	return patients.GetAllPatients(req, s.database)
}

func (s *ServerStruct) GetPatientByID(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetPatientByIDRequest],
) (*connect.Response[threedoclusionv1.GetPatientByIDResponse], error) {
	return patients.GetPatientByID(req, s.database)
}

func (s *ServerStruct) GetPatientByName(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetPatientByNameRequest],
) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	return patients.GetPatientByName(req, s.database)
}

// DENTISTS
func (s *ServerStruct) AddDentist(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddDentistRequest],
) (*connect.Response[threedoclusionv1.AddDentistResponse], error) {
	return dentists.AddDentist(req, s.database)
}

func (s *ServerStruct) DeleteDentistById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeleteDentistByIdRequest],
) (*connect.Response[threedoclusionv1.DeleteDentistByIdResponse], error) {
	return dentists.DeleteDentistById(req, s.database)
}

func (s *ServerStruct) GetAllDentists(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllDentistsRequest],
) (*connect.Response[threedoclusionv1.GetAllDentistsResponse], error) {
	return dentists.GetAllDentists(req, s.database)
}

func (s *ServerStruct) GetDentistById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetDentistByIdRequest],
) (*connect.Response[threedoclusionv1.GetDentistByIdResponse], error) {
	return dentists.GetDentistById(req, s.database)
}

func (s *ServerStruct) Login(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.LoginRequest],
) (*connect.Response[threedoclusionv1.LoginResponse], error) {
	return dentists.Login(req, s.database)
}

func (s *ServerStruct) Register(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.RegisterRequest],
) (*connect.Response[threedoclusionv1.RegisterResponse], error) {
	return dentists.Register(req, s.database)
}

func (s *ServerStruct) UpdateDentistById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.UpdateDentistByIdRequest],
) (*connect.Response[threedoclusionv1.UpdateDentistByIdResponse], error) {
	return dentists.UpdateDentistById(req, s.database)
}
