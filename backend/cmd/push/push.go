package push

import (
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/bufbuild/connect-go"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func SendToVR(req *connect.Request[threedoclusionv1.SendVRRequest]) (*connect.Response[threedoclusionv1.SendVRResponse], error) {
	log.Println("Request headers: ", req.Header())

	// TO DO: Check if clientID and scanID are valid with database

	response := waitingResponse{Redirect: true, ScanId: req.Msg.ScanId}

	redirectVRChannel := redirectVRChannels.GetChannel(req.Msg.ClientId)
	redirectVRChannel <- response // Send response over the channel

	res := connect.NewResponse(&threedoclusionv1.SendVRResponse{
		Feedback: "Succesfully sent request to redirect waiting VR headset",
	})

	res.Header().Set("SendVR-Version", "v1")
	return res, nil
}

// TO DO: Change into server-side streaming RPC to replace websocket functionality
func GetWaitingResponse(req *connect.Request[threedoclusionv1.WaitingRequest]) (*connect.ServerStream[threedoclusionv1.WaitingResponse], error) {
	log.Println("Request headers: ", req.Header())

	// TO DO: Check if uniqueCode is valid with database

	// TO DO: Use uniqueCode to get clientID from database
	// Also need to make it single use, so maybe send back clientID after first call so can be used in the future without entering code
	// For now just use unique_code = client_id
	redirectVRChannel := redirectVRChannels.GetChannel(req.Msg.UniqueCode) // Use clientId to get channel

	select { // Non blocking receive
	case response := <-redirectVRChannel:
		res := connect.NewResponse(&threedoclusionv1.SendVRResponse{
			Redirect: response.Redirect,
			Url:      fmt.Sprintf("/VR/%d", response.ScanId),
		})
		res.Header().Set("Waiting-Version", "v1")

		redirectVRChannels.ReleaseChannel(req.Msg.ClientId) // Redirect instruction has been sent, delete channel
		return res, nil

	case <-time.After(30 * time.Second): // No value has been received even after 30 seconds -> timeout error
		err := fmt.Errorf("Timeout after 30 sec")
		return nil, err
	}
	return nil, nil

	//c := http.Client{}
	//connect.NewClient[*connect.Request[threedoclusionv1.waitingRequest], *connect.ServerStream[threedoclusionv1.waitingResponse]](c, "/w", connect.WithGRPC())

	// https://github.com/bufbuild/connect-go/blob/6118a20be7a6ccd497b3960349c52ba42c85e439/client.go
	//new(connect.ServerStream[threedoclusionv1.waitingResponse],

} // TO DO: Report errors properly with connect responses? Is there an error handler?

type waitingResponse struct { // If client sends more data can be expanded this way
	Redirect bool
	ScanId   int
}

type MapChannels struct {
	dict       map[int]chan waitingResponse // map of client ID to channel
	mutex_lock sync.Mutex                   // mutex for thread-safe access to map
}

func NewMap() *MapChannels {
	return &MapChannels{
		dict: make(map[int]chan waitingResponse),
	}
}

// TO DO: Instantiate the map in a more global scope and reference, ServerStruct or something else?
var redirectVRChannels = NewMap()

// Get the channel associated with a specific client ID
func (map_instance *MapChannels) GetChannel(clientID int) chan waitingResponse {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	// Check if a channel already exists for this client ID
	ch, ok := map_instance.dict[clientID]
	if ok { // If it does, return the channel
		return ch
	}

	// Otherwise create a new channel for this client ID and add it to the map
	ch = make(chan waitingResponse)
	map_instance.dict[clientID] = ch

	return ch
}

// Release the channel associated with a specific client ID
func (map_instance *MapChannels) ReleaseChannel(clientID int) {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	// Check if a channel exists for this client ID
	ch, ok := map_instance.dict[clientID]
	if !ok {
		return
	}

	// If it does, close the channel and remove it from the map
	close(ch)
	delete(map_instance.dict, clientID)
}

// TO DO: client side-code and gen with new schema
//grpc.ServerStream.RecvMsg()
