DROP TABLE scan_save;

CREATE TABLE scan_save ( 
    scan_id INTEGER, /* NO REFERENCE FOR TESTING BECAUSE OTHER TABLE ISN'T READY*/
    timestamp_save timestamp,
    lowerX real,
    lowerY real,
    lowerZ real,
    lowerRX real, 
    lowerRY real, 
    lowerRZ real, 
    upperX real, 
    upperY real, 
    upperZ real, 
    upperRX real, 
    upperRY real, 
    upperRZ real,
    PRIMARY KEY (scan_id, timestamp_save)
);