package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"database/sql"

	_ "github.com/lib/pq"
	
	"github.com/gorilla/websocket"
)

const (
	clientDir  = "./resourcesClient/"
	waitingDir = "./resourcesWaiting/"
	VRDir      = "./resourcesVR/"
)

type identify struct {
	name string
	id   int
}

type waitingResponse struct { // If needed can be expanded this way
	Redirect bool
}

type errorJson struct {
	Code         string `json:"code"`
	ErrorMessage string `json:"msg"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ConnectToDataBase() (*sql.DB, error) {
    database, error := sql.Open("postgres", "host=host.docker.internal port=5430 user=docker password=docker1 dbname=patient_server sslmode=disable")
    fmt.Println("Connection succesfull")
    if error != nil {
        return nil, error
    }
    return database, nil
}

// Get dentist id's
func GetDentistIDs() (map[int]identify, error) {
	// Connect to the database
	db, error := ConnectToDataBase()


	if db == nil || error != nil {
		return nil, error
	}

	klanten := make(map[int]identify)

	// Execute the SQL query to retrieve the dentist information
	rows, err := db.Query("SELECT id, name FROM dentist")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the result set and map the data into the klanten map
	for rows.Next() {
		var id int
		var first_name string
		var last_name string
		err := rows.Scan(&id, &first_name, &last_name)
		if err != nil {
			log.Fatal(err)
		}
		fullName := fmt.Sprintf("%s, %s", last_name, first_name)
		klanten[id] = identify{name: fullName, id: id}
	}
	// Check for any errors in the result set
	if err := rows.Err(); err != nil {
		return nil, err
	}

	fmt.Println("Added dentist succesfully")
	defer db.Close()
	return klanten, nil
}

// Websocket implementation
func waitingStatusHandler(w http.ResponseWriter, r *http.Request, ch chan waitingResponse) { // Upgrade upgrades the HTTP server connection to the WebSocket protocol.
	conn, upgradeError := upgrader.Upgrade(w, r, nil) // Handshake
	if upgradeError != nil {
		log.Print("upgrade failed: ", upgradeError)
		// Needs error message via http?
		return
	}
	defer conn.Close() // Close when returning from function

	var scanID int
	_, scanError := fmt.Sscanf(r.URL.Path, "/waiting/%d/status", &scanID)

	if scanError != nil {
		conn.WriteJSON(errorJson{"ERROR", "Bad Request"})
		return
	}

	select { // Non blocking receive
	case response := <-ch:
		url := fmt.Sprintf("/VR/%d", scanID) // Needs to be scanID when working with database

		jsonStruct := struct {
			Code     string `json:"code"`
			Redirect bool   `json:"redirect"`
			URL      string `json:"url"`
		}{"DATA", response.Redirect, url}
		conn.WriteJSON(jsonStruct)

	case <-time.After(30 * time.Second): // Timeout after 30 sec
		eJSON := errorJson{"ERROR", "Timeout after 30 seconds"}
		conn.WriteJSON(eJSON)
	}

}

func clientHandler(w http.ResponseWriter, r *http.Request) {
	// Open the HTML file
	http.ServeFile(w, r, clientDir+"index.html")
}

func handleButtonPress(w http.ResponseWriter, r *http.Request, ch chan waitingResponse) {
	response := waitingResponse{Redirect: true}
	ch <- response
}

func clientRoutine(clientID int) {
	ch := make(chan waitingResponse)

	urlStatus := fmt.Sprintf("/waiting/%d/status", clientID) // Klant ID
	urlButton := fmt.Sprintf("/client/%d/button", clientID)  // Scan ID
	urlVR := fmt.Sprintf("/VR/%d", clientID)                 // Scan ID

	http.HandleFunc(urlStatus, func(w http.ResponseWriter, r *http.Request) {
		waitingStatusHandler(w, r, ch)
	})

	http.HandleFunc(urlButton, func(w http.ResponseWriter, r *http.Request) {
		handleButtonPress(w, r, ch)
	})

	http.HandleFunc(urlVR, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, VRDir+"index.html")
	})
}

/*
func main() {
	klanten := map[int]identify{ // Ids are used to identify the scan
		325: {
			name: "Doe, John",
			id:   325,
		},
		928: {
			name: "Dover, Ben",
			id:   928,
		},
	}

	//Dit is de echte klanten lijn met db access
	klanten, err := getDentistIDs()
	if err != nil {
    	log.Fatal(err)
	}

	for _, klant := range klanten { // index not necessary
		go clientRoutine(klant.id)
	}

	// Handle requests for the client page
	http.HandleFunc("/client/", clientHandler)

	// Serve the waiting page
	fs := http.FileServer(http.Dir(waitingDir))
	http.Handle("/waiting/", http.StripPrefix("/waiting/", fs))

	// Serve the manifest file
	http.HandleFunc("/manifest.json", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./manifest.json")
	})

	http.HandleFunc("/sw.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "sw.js")
	})

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", nil)
}
*/
