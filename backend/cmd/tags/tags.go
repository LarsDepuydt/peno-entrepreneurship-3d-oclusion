package tags

import (
	"database/sql"
	"fmt"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

func AddTag(req *connect.Request[threedoclusionv1.AddTagRequest], database *sql.DB) (*connect.Response[threedoclusionv1.AddTagResponse], error) {
	const sqlStatement = `
		INSERT INTO tag (bite)
		VALUES ($1)
		RETURNING id;`
	var id int32

	error := database.QueryRow(sqlStatement, req.Msg.Bite).Scan(&id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with bite: %s added with succes", req.Msg.Bite)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddTagResponse{
		Message: responseMessage,
		Id: id,
	})

	return res, nil
}

func DeleteTagById(req *connect.Request[threedoclusionv1.DeleteTagByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.DeleteTagByIdResponse], error) {
	const sqlStatement = `
	DELETE FROM tag 
	WHERE id = $1
	RETURNING bite;`
	var bite string

	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&bite)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %d deleted with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteTagByIdResponse{
		Message: responseMessage,
		Bite: bite,
	})

	return res, nil
}

func GetAllTags(req *connect.Request[threedoclusionv1.GetAllTagsRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetAllTagsResponse], error) {
	rows, error := database.Query("SELECT id, bite FROM tag;")
	if error != nil {
		return nil, error
	}

	tags, error := GetResponseMakerTag(rows)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all tags successfully")

	var tagsApi = MapTagsToApi(tags)

	res := connect.NewResponse(&threedoclusionv1.GetAllTagsResponse{
		Tags: tagsApi,
	})

	return res, nil
}

func GetTagById(req *connect.Request[threedoclusionv1.GetTagByIdRequest], database *sql.DB) (*connect.Response[threedoclusionv1.GetTagByIdResponse], error) {
	const sqlStatement = `
		SELECT id, bite
		FROM tag
		WHERE id = $1;
	`
	var id int32
	var bite string
	
	error := database.QueryRow(sqlStatement, req.Msg.Id).Scan(&id, &bite)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("tag with id: %d returned with succes", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetTagByIdResponse{
		Id:   id,
		Bite: bite,
	})

	return res, nil
}
