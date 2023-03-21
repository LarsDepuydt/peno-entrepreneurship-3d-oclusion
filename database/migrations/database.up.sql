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
    email text,
    pass_word text,
    first_name text,
    last_name text,
    patient_id SERIAL REFERENCES patient(id)
);

CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    date_scan date,
    patient_id SERIAL REFERENCES patient(id)
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    bite text,
    scan_id SERIAL REFERENCES scan(id),
    patient_id SERIAL REFERENCES patient(id)
);

