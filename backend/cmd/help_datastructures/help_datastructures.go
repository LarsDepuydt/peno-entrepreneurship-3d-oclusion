package help_datastructures

import (
	"sync"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
	"github.com/bufbuild/connect-go"
)

type WaitingChannelResponse struct { // If client sends more data can be expanded this way
	Redirect bool
	ScanId   int32
}

type MapChannels struct {
	dict       map[int32]chan WaitingChannelResponse // map of client ID to channel
	mutex_lock sync.Mutex                            // mutex for thread-safe access to map
}

func NewMap() *MapChannels {
	return &MapChannels{
		dict: make(map[int32]chan WaitingChannelResponse),
	}
}

func (map_instance *MapChannels) GetChannel(clientID int32) chan WaitingChannelResponse {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	// Check if a channel already exists for this client ID
	ch, ok := map_instance.dict[clientID]
	if ok { // If it does, return the channel
		return ch
	}

	// Otherwise create a new channel for this client ID and add it to the map
	ch = make(chan WaitingChannelResponse)
	map_instance.dict[clientID] = ch

	return ch
}

// Release the channel associated with a specific client ID
func (map_instance *MapChannels) ReleaseChannel(clientID int32) {
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

type MapConnections struct {
	dict       map[int32]*connect.ServerStream[threedoclusionv1.ConnectionStatusUpdatesResponse] // map of client ID to serverstream
	mutex_lock sync.Mutex                            // mutex for thread-safe access to map
}

func NewConnections() *MapConnections {
	return &MapConnections{
		dict: make(map[int32]*connect.ServerStream[threedoclusionv1.ConnectionStatusUpdatesResponse]),
	}
}


func (map_instance *MapConnections) AddConnection(scanID int32, stream *connect.ServerStream[threedoclusionv1.ConnectionStatusUpdatesResponse]) {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	_, ok := map_instance.dict[scanID]
	if ok {
		return
	} // ERROR? Already has a connection

	map_instance.dict[scanID] = stream;
}


func (map_instance *MapConnections) DeleteConnection(scanID int32) {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	_, ok := map_instance.dict[scanID]
	if !ok {
		return
	}

	delete(map_instance.dict, scanID)
}

func (map_instance *MapConnections) GetConnection(scanID int32) *connect.ServerStream[threedoclusionv1.ConnectionStatusUpdatesResponse] {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	connection, ok := map_instance.dict[scanID]
	if ok {
		return connection
	}
	return nil
}