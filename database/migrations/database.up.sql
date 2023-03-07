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
    pass_word text,
    first_name text,
    last_name text
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    date date
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text
);

