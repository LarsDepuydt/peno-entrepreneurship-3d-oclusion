CREATE TABLE patient ( 
    id SERIAL PRIMARY KEY, 
    first_name text,
    last_name text,
    pinned bit,
    notes text
);

CREATE TABLE dentist (
    id SERIAL PRIMARY KEY,
    email text,
    password text,
    firstname text,
    lastname text
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    datescan date
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text
);

