CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

CREATE TABLE auth(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40),
    pass TEXT
);

INSERT INTO users (name, email) VALUES ('juan', 'juan@ibm.com'), ('cris', 'cris@abc.com');