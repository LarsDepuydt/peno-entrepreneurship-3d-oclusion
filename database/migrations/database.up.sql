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
<<<<<<< HEAD
    x real,
    y real,
    z real,
    r_x real,
    r_y real,
    r_z real,
    date date
=======
    scan text,
    date_scan date
>>>>>>> origin
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text
);

