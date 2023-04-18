CREATE TABLE patient ( 
    id SERIAL PRIMARY KEY, 
    first_name text,
    last_name text,
    pinned bit,
    notes text,
    dentist_id SERIAL REFERENCES dentist(id)
);

CREATE TABLE dentist (
    id SERIAL PRIMARY KEY,
    email text UNIQUE,
    pass_word text,
    first_name text,
    last_name text,
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    date_scan date,
    notes text,
    patient_id SERIAL REFERENCES patient(id)
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text
);

CREATE TABLE scan_tag (
    id SERIAL PRIMARY KEY,
    scan_id INTEGER REFERENCES scan(id),
    tag_id INTEGER REFERENCES tag(id),
    UNIQUE (scan_id, tag_id)
);