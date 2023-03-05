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

	res := connect.NewResponse(&threedoclusionv1.AddTagResponse{
		Message: "done",
	})

	// Perform database modifications, adding a tag
	_, error = statement.Exec(req.Msg.Id, req.Msg.Bite)
	if error != nil {
		return nil, error
	}
	fmt.Println("Added tag succesfully")
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

	fmt.Println("Deleted tag succesfully")

	res := connect.NewResponse(&threedoclusionv1.DeleteTagResponse{
		Message: "done",
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
	statement := "SELECT * FROM $1;"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.TableName)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got all tags succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsResponse{
		Message: "done",
	})

	return res, nil
}

func GetTagById(req *connect.Request[threedoclusionv1.GetTagByIDRequest]) (*connect.Response[threedoclusionv1.GetTagByIDResponse], error) {
	// Connect to the database
	database, error := ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM tag WHERE id = $1;"

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got the tag succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetTagByIDResponse{
		Message: "done",
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

	// Execute the statement with the parameter
	_, error = database.Exec(statement, req.Msg.Type)
	if error != nil {
		return nil, error
	}

	fmt.Println("Got the tag by type succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsByTypeResponse{
		Message: "done",
	})

	return res, nil

}
