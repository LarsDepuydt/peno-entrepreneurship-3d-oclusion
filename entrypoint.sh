#!/bin/sh

# Start the Cloud SQL proxy in the background
/usr/local/bin/cloud_sql_proxy -instances=$CLOUD_SQL_CONNECTION_NAME=tcp:5432 &

# Start your application
exec /serve