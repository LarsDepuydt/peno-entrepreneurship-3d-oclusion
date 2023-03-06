CREATE TABLE patient ( 
    id integer PRIMARY KEY, 
    first_name text,
    last_name text,
    pinned bit,
    notes text
);

CREATE TABLE dentist (
    id integer PRIMARY KEY,
    email text,
    pass_word text,
    first_name text,
    last_name text
);

CREATE TABLE scan (
    id integer PRIMARY KEY,
    scan text,
    date date
);

CREATE TABLE tag (
    id integer PRIMARY KEY,
    bite text
);

