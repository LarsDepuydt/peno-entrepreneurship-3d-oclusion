package tags

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func AddTag(req *connect.Request[threedoclusionv1.AddTagRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	statement, error := database.Prepare("INSERT INTO tag (bite) VALUES ($1)")
	if error != nil {
		return nil, error
	}
	defer statement.Close()


	_, error = statement.Exec(req.Msg.Bite)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with bite: %s added with succes", req.Msg.Bite)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddTagResponse{
		Message: responseMessage,
	})

	return res, nil
}

func DeleteTag(req *connect.Request[threedoclusionv1.DeleteTagRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteTagResponse], error) {
	statement := "DELETE FROM tag WHERE id = $1"
	_, error := database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %d deleted with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteTagResponse{
		Message: responseMessage,
	})

	return res, nil
}

func GetAllTags(req *connect.Request[threedoclusionv1.GetAllTagsRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllTagsResponse], error) {
	statement := "SELECT * FROM tag;"
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerTag(rows)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all tags successfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsResponse{
		Tags: result,
	})

	return res, nil
}

func GetTagByID(req *connect.Request[threedoclusionv1.GetTagByIDRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetTagByIDResponse], error) {
	statement := "SELECT bite FROM tag WHERE id = $1;"
	rows, error := database.Query(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerTag(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("tag with id: %d returned with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetTagByIDResponse{
		Id:   result[0].Id,
		Bite: result[0].Bite,
	})

	return res, nil
}

func GetAllTagsByType(req *connect.Request[threedoclusionv1.GetAllTagsByTypeRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllTagsByTypeResponse], error) {
	statement := "SELECT * FROM tag WHERE bite = $1;"
	rows, error := database.Query(statement, req.Msg.Type)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerTag(rows)
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
