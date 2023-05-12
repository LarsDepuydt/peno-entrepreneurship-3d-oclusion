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

func (s *ServerStruct) GetLastSaveData(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetLastSaveDataRequest],
) (*connect.Response[threedoclusionv1.GetLastSaveDataResponse], error) {
	return push.GetLastSaveData(req, s.database)
}

// SCANS
func (s *ServerStruct) AddScan(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddScanRequest],
) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	return scans.AddScan(req, s.database)
}

func (s *ServerStruct) DeleteScanById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeleteScanByIdRequest],
) (*connect.Response[threedoclusionv1.DeleteScanByIdResponse], error) {
	return scans.DeleteScanById(req, s.database)
}

func (s *ServerStruct) GetAllScans(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllScansRequest],
) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	return scans.GetAllScans(req, s.database)
}

func (s *ServerStruct) GetScanById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetScanByIdRequest],
) (*connect.Response[threedoclusionv1.GetScanByIdResponse], error) {
	return scans.GetScanById(req, s.database)
}

func (s *ServerStruct) UpdateScanById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.UpdateScanByIdRequest],
) (*connect.Response[threedoclusionv1.UpdateScanByIdResponse], error) {
	return scans.UpdateScanById(req, s.database)
}

// TAGS
func (s *ServerStruct) AddTag(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddTagRequest],
) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	return tags.AddTag(req, s.database)
}

func (s *ServerStruct) DeleteTagById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeleteTagByIdRequest],
) (*connect.Response[threedoclusionv1.DeleteTagByIdResponse], error) {
	return tags.DeleteTagById(req, s.database)
}

func (s *ServerStruct) GetAllTags(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllTagsRequest],
) (*connect.Response[threedoclusionv1.GetAllTagsResponse], error) {
	return tags.GetAllTags(req, s.database)
}

func (s *ServerStruct) GetTagById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetTagByIdRequest],
) (*connect.Response[threedoclusionv1.GetTagByIdResponse], error) {
	return tags.GetTagById(req, s.database)
}

// PATIENTS
func (s *ServerStruct) AddPatient(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.AddPatientRequest],
) (*connect.Response[threedoclusionv1.AddPatientResponse], error) {
	return patients.AddPatient(req, s.database)
}

func (s *ServerStruct) DeletePatientById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.DeletePatientByIdRequest],
) (*connect.Response[threedoclusionv1.DeletePatientByIdResponse], error) {
	return patients.DeletePatientById(req, s.database)
}

func (s *ServerStruct) GetAllPatients(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllPatientsRequest],
) (*connect.Response[threedoclusionv1.GetAllPatientsResponse], error) {
	return patients.GetAllPatients(req, s.database)
}

func (s *ServerStruct) GetPatientById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetPatientByIdRequest],
) (*connect.Response[threedoclusionv1.GetPatientByIdResponse], error) {
	return patients.GetPatientById(req, s.database)
}

func (s *ServerStruct) GetPatientByName(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetPatientByNameRequest],
) (*connect.Response[threedoclusionv1.GetPatientByNameResponse], error) {
	return patients.GetPatientByName(req, s.database)
}

func (s *ServerStruct) UpdatePatientById(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.UpdatePatientByIdRequest],
) (*connect.Response[threedoclusionv1.UpdatePatientByIdResponse], error) {
	return patients.UpdatePatientById(req, s.database)
}

func (s *ServerStruct) GetAllPinnedPatients(
	ctx context.Context,
	req *connect.Request[threedoclusionv1.GetAllPinnedPatientsRequest],
) (*connect.Response[threedoclusionv1.GetAllPinnedPatientsResponse], error) {
	return patients.GetAllPinnedPatients(req, s.database)
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
