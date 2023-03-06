package tags

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

// connect to database function
// always close database with : defer database.Close()
func ConnectToDataBase() (*sql.DB, error) {

	database, error := sql.Open("postgres", "host=host.docker.internal port=5430 user=docker password=docker1 dbname=patient_server sslmode=disable")

	fmt.Println("Connection succesfull")

	if error != nil {
		return nil, error
	}

	return database, nil
}

func getResponseMaker(database *sql.DB, statement string) ([]int64, []string, error) {

	// Execute the statement with the parameter
	rows, error := database.Query(statement)
	if error != nil {
		return nil, nil, error
	}

	type RowData struct {
		id   int64
		bite string
	}

	var (
		idArray   []int64
		biteArray []string
	)

	for rows.Next() {
		var rowData RowData
		error = rows.Scan(&rowData.id, &rowData.bite)
		if error != nil {
			panic(error)
		}
		idArray = append(idArray, rowData.id)
		biteArray = append(biteArray, rowData.bite)
	}

	return idArray, biteArray, nil

}

func AddTag(req *connect.Request[threedoclusionv1.AddTagRequest]) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()
	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO tag (id, bite) VALUES ($1, $2)")

	if error != nil {
		return nil, error
	}

	defer statement.Close()

	// Perform database modifications, adding a tag
	_, error = statement.Exec(req.Msg.Id, req.Msg.Bite)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %d added with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddTagResponse{
		Message: responseMessage,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteTag(req *connect.Request[threedoclusionv1.DeleteTagRequest]) (*connect.Response[threedoclusionv1.DeleteTagResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "DELETE FROM tag WHERE id = $1"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteTagResponse{
		Message: responseMessage,
	})

	return res, nil
}

func GetAllTags(req *connect.Request[threedoclusionv1.GetAllTagsRequest]) (*connect.Response[threedoclusionv1.GetAllTagsResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM tag;"

	idArray, biteArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all tags succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsResponse{
		Message:  "Returned all tags",
		IdData:   idArray,
		BiteData: biteArray,
	})

	return res, nil
}

func GetTagByID(req *connect.Request[threedoclusionv1.GetTagByIDRequest]) (*connect.Response[threedoclusionv1.GetTagByIDResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT bite FROM tag WHERE id = $1;"

	idArray, biteArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("tag with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetTagByIDResponse{
		Message: responseMessage,
		Id:      idArray[0],
		Bite:    biteArray[0],
	})

	return res, nil
}

func GetAllTagsByType(req *connect.Request[threedoclusionv1.GetAllTagsByTypeRequest]) (*connect.Response[threedoclusionv1.GetAllTagsByTypeResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM tag WHERE bite = $1;"

	idArray, biteArray, error := getResponseMaker(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("tags with type: %s returned with succes;", req.Msg.Type)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsByTypeResponse{
		Message: responseMessage,
		Bite:    biteArray[0],
		IdData:  idArray,
	})

	return res, nil

}
