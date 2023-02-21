CREATE TABLE patient ( 
    id smallint PRIMARY KEY, 
    name text,
    pinned bit,
    notes text,);

CREATE TABLE dentist (
    id smallint PRIMARY KEY,
    email text,
    password text,
    fname text,
    lname text,
);

CREATE TABLE scan (
    id smallint PRIMARY KEY,
    file text,
    date date,
);

CREATE TABLE tag (
    id smallint PRIMARY KEY,
    bite text,
);




