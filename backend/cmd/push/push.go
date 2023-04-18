package push

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/bufbuild/connect-go"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_datastructures"
	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func SendToVR(req *connect.Request[threedoclusionv1.SendVRRequest], redirectVRChannels *help_datastructures.MapChannels) (*connect.Response[threedoclusionv1.SendVRResponse], error) {
	log.Println("Request headers: ", req.Header())

	// TO DO: Check if clientID and scanID are valid with database
	response := help_datastructures.WaitingChannelResponse{Redirect: true, ScanId: req.Msg.ScanId}

	redirectVRChannel := redirectVRChannels.GetChannel(req.Msg.ClientId)
	redirectVRChannel <- response // Send response over the channel

	res := connect.NewResponse(&threedoclusionv1.SendVRResponse{
		Feedback: "Succesfully sent request to redirect waiting VR headset",
	})
	res.Header().Set("SendVR-Version", "v1")

	return res, nil
}

func GetWaitingResponse(req *connect.Request[threedoclusionv1.WaitingRequest], stream *connect.ServerStream[threedoclusionv1.WaitingResponse], redirectVRChannels *help_datastructures.MapChannels) error {
	log.Println("Request headers: ", req.Header())

	// TO DO: Check if uniqueCode is valid with database

	// TO DO: Use uniqueCode to get clientID from database
	// For now just use unique_code = client_id
	redirectVRChannel := redirectVRChannels.GetChannel(req.Msg.UniqueCode) // Use clientId to get channel

	select { // Non blocking receive
	case response := <-redirectVRChannel:
		res := &threedoclusionv1.WaitingResponse{
			Redirect: response.Redirect,
			Url:      "start-vr",
		} // fmt.Sprintf("/VR/%d", response.ScanId),
		redirectVRChannels.ReleaseChannel(req.Msg.UniqueCode) // Redirect instruction has been sent, delete channel
		if err := stream.Send(res); err != nil {
			return err
		}
		return nil
	case <-time.After(30 * time.Second): // No value has been received even after 30 seconds -> timeout error
		err := fmt.Errorf("timeout after 30 sec")
		return err
	}
}


func SendMenuOption(req *connect.Request[threedoclusionv1.SendMenuOptionRequest], connections *help_datastructures.MapConnections, database *sql.DB) (*connect.Response[threedoclusionv1.SendMenuOptionResponse], error) {
	log.Println("Request headers: ", req.Header())
	var deviceID int32
	deviceID = 0; // deviceID of client; to send to: testing

	switch *req.Msg.Option.Enum() {
	case 0:
		log.Println("Menu option Save was chosen");
		// req.Msg.GetSaveData() Pass this to the method -> make abstraction

		statement, error := database.Prepare("INSERT INTO scan (id, x, y, z, r_x, r_y, r_z, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)")
		if error != nil {
			return nil, error
		}

		t := time.Now()
		formattedDate := t.Format("2006-01-02") // Format in yyyy-mm-dd

		save := req.Msg.GetSaveData()
		_, error = statement.Exec(save.Id, save.LowerX, save.LowerY, save.LowerZ, save.LowerRX, save.LowerRY, save.LowerRZ, save.UpperX, save.UpperY, save.UpperZ, save.UpperRX, save.UpperRY, save.UpperRZ, formattedDate)
		if error != nil {
			return nil, error
		}

		msg := "Saved successfully"
		res := connect.NewResponse(&threedoclusionv1.SendMenuOptionResponse{
			//OptionData: &threedoclusionv1.SendMenuOptionResponse_OtherData{"Saved successfully"},
			OtherData: &msg,
			
		})
		return res, nil

	case 1:
		log.Println("Menu option Load was chosen");

		statement := "SELECT * FROM scan WHERE id = $1;"
		rows, error := database.Query(statement, req.Msg.GetScanId())
		if error != nil {
			return nil, error
		}

		result, error := help_functions.GetResponseMakerScan(rows)
		if error != nil {
			panic(error)
		}

		// Get list of all scans for this ID and return
		res := connect.NewResponse(&threedoclusionv1.SendMenuOptionResponse{
			//OptionData: &threedoclusionv1.SendMenuOptionResponse_LoadData{result},
			Wrap: &threedoclusionv1.SendMenuOptionResponse_Wrapper{LoadData: result},
		})
		
		return res, nil

	case 2:
		log.Println("Menu option Save and Quit was chosen");
		// Save And Quit data -> Scan save
		// req.Msg.GetSaveAndQuitData() Pass this to the method -> make abstraction
		statement, error := database.Prepare("INSERT INTO scan (id, x, y, z, r_x, r_y, r_z, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)")
		if error != nil {
			return nil, error
		}

		t := time.Now()
		formattedDate := t.Format("2006-01-02") // Format in yyyy-mm-dd

		save := req.Msg.GetSaveData()
		_, error = statement.Exec(save.Id, save.LowerX, save.LowerY, save.LowerZ, save.LowerRX, save.LowerRY, save.LowerRZ, save.UpperX, save.UpperY, save.UpperZ, save.UpperRX, save.UpperRY, save.UpperRZ, formattedDate)
		if error != nil {
			return nil, error
		}

		connectionChan := connections.GetChannel(req.Msg.GetScanId(), deviceID)
		connectionChan <- threedoclusionv1.SubscribeConnectionResponse{
			IsConnected: false,
		}

		//connection.Send(responseConnect);
		//connectionsClient.DeleteConnection(req.Msg.GetScanId()) // Delete the connection from memory

		// DO something with connection
		msg := "Saved successfully"
		res := connect.NewResponse(&threedoclusionv1.SendMenuOptionResponse{
			//OptionData: &threedoclusionv1.SendMenuOptionResponse_LoadData{result},
			OtherData: &msg,
		})

		connections.ReleaseChannel(req.Msg.GetSaveData().GetId(), 1) // VR deviceID 1

		return res, nil

	case 3:
		log.Println("Menu option Quit was chosen");

		connectionChan := connections.GetChannel(req.Msg.GetScanId(), deviceID)
		connectionChan <- threedoclusionv1.SubscribeConnectionResponse{
			IsConnected: false,
		}
		// DO something with connection


		//connectionClient.Send(responseConnect);
		//connectionsClient.DeleteConnection(req.Msg.GetScanId()) // Delete the connection from memory

		connections.ReleaseChannel(req.Msg.GetScanId(), 1)

		msg := "Deleted connection from server"
		res := connect.NewResponse(&threedoclusionv1.SendMenuOptionResponse{
			OtherData: &msg,
		})
		return res, nil
	
	default:
		msg := "Unknown option"
		res := connect.NewResponse(&threedoclusionv1.SendMenuOptionResponse{
			//OptionData: &threedoclusionv1.SendMenuOptionResponse_OtherData{"Unknown option"},
			OtherData: &msg,
		})
		return res, nil
	}
}

func SubscribeConnection(req *connect.Request[threedoclusionv1.SubscribeConnectionRequest], stream *connect.ServerStream[threedoclusionv1.SubscribeConnectionResponse], connections *help_datastructures.MapConnections) error  {
    scanID := req.Msg.ScanId
    deviceID := req.Msg.DeviceId

	connectionChan := connections.GetChannel(scanID, deviceID)

    for {
        select {
        case res := <-connectionChan:
            if err := stream.Send(&res); err != nil {
                return err
            }
        /*case <-stream.Context().Done():
            return nil FIX THIS */
        }
	}
}

func UpdateConnectionStatus(req *connect.Request[threedoclusionv1.UpdateConnectionStatusRequest], connections *help_datastructures.MapConnections, database *sql.DB) (*connect.Response[threedoclusionv1.UpdateConnectionStatusResponse], error){
    scanID := req.Msg.ScanId
    deviceID := req.Msg.DeviceId
    isConnected := req.Msg.IsConnected

    mapDeviceChan := connections.GetMapDeviceChannel(scanID)

    for otherDeviceID, connectionChan := range mapDeviceChan {
        if otherDeviceID != deviceID {
            connectionChan <- threedoclusionv1.SubscribeConnectionResponse{
                IsConnected: isConnected,
            }
        }
    }

    return connect.NewResponse(&threedoclusionv1.UpdateConnectionStatusResponse{}), nil
}