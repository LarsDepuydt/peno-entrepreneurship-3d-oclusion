# 3D Occlusion

## Run backend

### Start
Run `make up` as sudo to start the backend and database in a docker container.
Run `docker container ls` to view all active containers (Linux).

### End
Run `make down` as sudo to stop the backend and database.


## Protobuf
Run `make buf`to lint the schema and generate the code

Send request atm
``` 
  buf curl \
  --schema proto \
  --data '{"id": "Jane"}' \
  http://localhost:8080/threedoclusion.v1.ScanService/Scan
```

## Migrate database schema
Run `make migrate` to migrate the database schema to the latest version.
Run `make migrate_info` to get migrations information.