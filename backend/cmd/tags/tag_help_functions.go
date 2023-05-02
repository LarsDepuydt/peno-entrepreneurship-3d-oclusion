package tags

import (
	"database/sql"

	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)

type Tag struct {
	Id int32
	Bite string
}

func GetResponseMakerTag(rows *sql.Rows) ([]*Tag, error) {
	var tags []*Tag
	for rows.Next() {
		tag := &Tag{}
		error := rows.Scan(&tag.Id, &tag.Bite)
		if error != nil {
			return nil, error
		}

		tags = append(tags, tag)
	}
	
	return tags, nil
}

func MapTagToApi(tag *Tag) *threedoclusionv1.Tag {
	return &threedoclusionv1.Tag{
    Id:   tag.Id,
    Bite: tag.Bite,
  }
}

func MapTagsToApi(tags []*Tag) []*threedoclusionv1.Tag {
	var tagsApi []*threedoclusionv1.Tag

	for _, tag := range tags {
		tagsApi= append(tagsApi, MapTagToApi(tag))
	}

	return tagsApi
}
