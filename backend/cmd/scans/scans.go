package scans

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/storage"
	"google.golang.org/api/option"

	"github.com/bufbuild/connect-go"
	_ "github.com/lib/pq"

	"github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/cmd/help_functions"
	threedoclusionv1 "github.com/LarsDepuydt/peno-entrepreneurship-3d-oclusion/gen/proto/threedoclusion/v1"
)


func AddScan(req *connect.Request[threedoclusionv1.AddScanRequest]) (*connect.Response[threedoclusionv1.AddScanResponse], error) {
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	statement, error := database.Prepare("INSERT INTO scan (scan_file, scan_date) VALUES ($1, $2)")
	if error != nil {
		return nil, error
	}
	defer statement.Close()

	_, error = statement.Exec(req.Msg.ScanFile, req.Msg.ScanDate)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %s added with succes;", req.Msg.ScanFile)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.AddScanResponse{
		Message: responseMessage,
	})

	fmt.Println(responseMessage)
	return res, nil
}

func DeleteScan(req *connect.Request[threedoclusionv1.DeleteScanRequest]) (*connect.Response[threedoclusionv1.DeleteScanResponse], error) {
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	statement := "DELETE FROM scan WHERE id = $1"
	_, error = database.Exec(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	responseMessage := fmt.Sprintf("scan with id: %d deleted with succes;", req.Msg.Id)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.DeleteScanResponse{
		Message: responseMessage,
	})

	return res, nil
}

func GetAllScans(req *connect.Request[threedoclusionv1.GetAllScansRequest]) (*connect.Response[threedoclusionv1.GetAllScansResponse], error) {
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	statement := "SELECT * FROM scan;"
	rows, error := database.Query(statement)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	fmt.Println("Got all scans succesfully")

	res := connect.NewResponse(&threedoclusionv1.GetAllScansResponse{
		Scans: result,
	})

	return res, nil
}

func GetScanByID(req *connect.Request[threedoclusionv1.GetScanByIDRequest]) (*connect.Response[threedoclusionv1.GetScanByIDResponse], error) {
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	statement := "SELECT * FROM scan WHERE id = $1;"
	rows, error := database.Query(statement, req.Msg.Id)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with id: %d returned with succes;", req.Msg.Id)
	fmt.Println(responseMessage)
	
	client, ctx, error := InitializeScanDatabase()

	if error!= nil {
        return nil, error
    }

	bucketName := "relu-vr-scan-database.appspot.com"
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		return nil, err
	}

	path_to_scan := result[0].Scan

	fileRef := bucket.Object(path_to_scan)
	reader, err := fileRef.NewReader(ctx)
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	localFile, err := os.Create("local-file.obj")
	if err != nil {
		// Handle error
	}

	defer localFile.Close()

	if _, err := fileRef.DownloadTo(context.Background(), localFile); err != nil {
		// Handle error
	}

	data, err := ioutil.ReadAll(reader)
	if err != nil {
		return nil, err
	}




	res := connect.NewResponse(&threedoclusionv1.GetScanByIDResponse{
		Id:       result[0].Id,
		ScanData: result[0].Scan,
		ScanDate: result[0].Date,
	})

	return res, nil
}

func GetScanByDate(req *connect.Request[threedoclusionv1.GetScanByDateRequest]) (*connect.Response[threedoclusionv1.GetScanByDateResponse], error) {
	database, error := help_functions.ConnectToDataBase()
	if database == nil || error != nil {
		return nil, error
	}
	defer database.Close()

	statement := "SELECT * FROM scan WHERE scan_date = $1;"
	rows, error := database.Query(statement, req.Msg.Date)
	if error != nil {
		return nil, error
	}

	result, error := help_functions.GetResponseMakerScan(rows)
	if error != nil {
		panic(error)
	}

	responseMessage := fmt.Sprintf("scan with date: %s returned with succes;", req.Msg.Date)
	fmt.Println(responseMessage)

	res := connect.NewResponse(&threedoclusionv1.GetScanByDateResponse{
		Scans: result,
	})

	return res, nil
}

func InitializeScanDatabase() (*storage.Client, context.Context,error){
	ctx := context.Background()
	config := &firebase.Config{
		// Your firebase configuration
	}

	opt := option.WithCredentialsFile("firebase-adminsdk.json")
	app, err := firebase.NewApp(ctx, config, opt)
	if err != nil {
		return nil, nil, err
	}
	client, err := app.Storage(ctx)
	if err != nil {
		return nil, nil, err
	}

	return client, ctx, nil
}