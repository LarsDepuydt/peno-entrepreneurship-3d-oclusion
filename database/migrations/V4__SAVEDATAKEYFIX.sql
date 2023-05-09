DROP TABLE scan_save;

CREATE TABLE scan_save ( 
    id SERIAL PRIMARY KEY,
    scan_id INTEGER REFERENCES scan(id),
    date_scan date,
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
    UNIQUE (scan_id, date_scan)
);