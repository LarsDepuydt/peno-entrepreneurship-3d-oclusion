CREATE TABLE patient ( 
    id SERIAL PRIMARY KEY, 
    name text,
    pinned bit,
    notes text
);

CREATE TABLE dentist (
    id SERIAL PRIMARY KEY,
    email text,
    password text,
    fname text,
    lname text
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    file text,
    date date
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text
);


