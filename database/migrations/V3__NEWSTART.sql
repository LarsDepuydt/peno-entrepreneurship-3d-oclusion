DROP TABLE patient;
DROP TABLE dentist;
DROP TABLE scan;
DROP TABLE tag;

CREATE TABLE patient ( 
    id SERIAL PRIMARY KEY, 
    firstnname text,
    lastname text,
    pinned bit,
    notes text
);

CREATE TABLE dentist (
    id SERIAL PRIMARY KEY,
    email text UNIQUE,
    pass_word text,
    firstname text,
    lastname text
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    date date,
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

ALTER TABLE patient ADD COLUMN dentist_id SERIAL REFERENCES dentist(id);
