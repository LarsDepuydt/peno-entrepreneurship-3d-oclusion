package help_datastructures

import (
	"sync"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
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
	channels       map[int32]map[int32]chan threedoclusionv1.SubscribeConnectionResponse // map of client ID to serverstream
	mutex_lock sync.Mutex                            // mutex for thread-safe access to map
}

func NewConnections() *MapConnections {
	return &MapConnections{
		channels: make(map[int32]map[int32]chan threedoclusionv1.SubscribeConnectionResponse),
	}
}

func (map_instance *MapConnections) GetMapDeviceChannel(scanID int32) map[int32]chan threedoclusionv1.SubscribeConnectionResponse {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	if _, ok := map_instance.channels[scanID]; !ok {
        map_instance.channels[scanID] = make(map[int32]chan threedoclusionv1.SubscribeConnectionResponse)
    }

	return map_instance.channels[scanID];

}

func (map_instance *MapConnections) GetChannel(scanID int32, deviceID int32) chan threedoclusionv1.SubscribeConnectionResponse {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()

	if _, ok := map_instance.channels[scanID]; !ok {
        map_instance.channels[scanID] = make(map[int32]chan threedoclusionv1.SubscribeConnectionResponse)
    }
    if ch, ok :=  map_instance.channels[scanID][deviceID]; ok {
		return ch;
    }

	ch := make(chan threedoclusionv1.SubscribeConnectionResponse)
	map_instance.channels[scanID][deviceID] = ch
	return ch
}

// Release the channel associated with a specific client ID and device ID
func (map_instance *MapConnections) ReleaseChannel(scanID int32, deviceID int32) {
	map_instance.mutex_lock.Lock()
	defer map_instance.mutex_lock.Unlock()


	if _, ok := map_instance.channels[scanID]; !ok { // Doesn't exist
       return;
    }
	if ch, ok :=  map_instance.channels[scanID][deviceID]; ok { // Does exist
		close(ch)
		delete(map_instance.channels[scanID], deviceID)
    }

	// If last one got removed, remove map for clientID
	if len(map_instance.channels[scanID]) == 0 {
		delete(map_instance.channels, scanID)
	}
}

