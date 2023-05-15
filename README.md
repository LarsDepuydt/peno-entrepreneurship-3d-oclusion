# 3D Occlusion

## Run backend

### Start
Run `make up` as sudo to start the backend and database in a docker container.
Run `docker container ls` to view all active containers (Linux).

### End
Run `make down` as sudo to stop the backend and database.


## Protobuf
Run `make buf` to lint the schema and generate the code

Send request to cloud backend and database
``` 
  buf curl \
  --schema proto \
  --data '{"email": "dag.malstaf@gmail.com","password": "test"}' \
  https://backend-service-2ybjkij5qq-uc.a.run.app/threedoclusion.v1.ScanService/Login
```

## Migrate database schema --> currently not supported on cloud backend
Run `make migrate` to migrate the database schema to the latest version.
Run `make migrate_info` to get migrations information.


## Deploy frontend Next.js to Firebase hosting
Run `cd frontend` to set your directory to the frontend directory.
Run `sudo yarn deploy` to rebuild and deploy the firebase functions and hosting.