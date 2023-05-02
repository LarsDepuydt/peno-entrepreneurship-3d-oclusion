CREATE TABLE scan (
    id SERIAL PRIMARY KEY,
    scan text,
    date_scan date,
    notes text
);

ALTER TABLE scan ADD COLUMN pinned bit;


