package tags

import (
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func AddTag(req *connect.Request[threedoclusionv1.AddTagRequest]) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}

	defer database.Close()
	// Prepare a statement with placeholders for the values
	statement, error := database.Prepare("INSERT INTO tag (bite) VALUES ($1)")

	if error != nil {
		return nil, error
	}

	defer statement.Close()

	// Perform database modifications, adding a tag
	_, error = statement.Exec(req.Msg.Bite)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %s added with succes;", req.Msg.Bite)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddTagResponse{
		Message: responseMessage,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteTag(req *connect.Request[threedoclusionv1.DeleteTagRequest]) (*connect.Response[threedoclusionv1.DeleteTagResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

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
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM tag;"

	result, error := help_functions.GetResponseMakerTag(database, statement)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all tags succesfully")

	//resultCopy := make([]RowDataTag, len(result))
	//copy(copy, source[:])

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsResponse{
		Tags: result,
	})

	return res, nil
}

func GetTagByID(req *connect.Request[threedoclusionv1.GetTagByIDRequest]) (*connect.Response[threedoclusionv1.GetTagByIDResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT bite FROM tag WHERE id = $1;"

	result, error := help_functions.GetResponseMakerTag(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("tag with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetTagByIDResponse{
		Id:   result[0].Id,
		Bite: result[0].Bite,
	})

	return res, nil
}

func GetAllTagsByType(req *connect.Request[threedoclusionv1.GetAllTagsByTypeRequest]) (*connect.Response[threedoclusionv1.GetAllTagsByTypeResponse], error) {
	// Connect to the database
	database, error := help_functions.ConnectToDataBase()

	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()
	// Prepare a statement with placeholders for the condition
	statement := "SELECT * FROM tag WHERE bite = $1;"

	result, error := help_functions.GetResponseMakerTag(database, statement)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("tags with type: %s returned with succes;", req.Msg.Type)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsByTypeResponse{
		Tags: result,
	})

	return res, nil

}
