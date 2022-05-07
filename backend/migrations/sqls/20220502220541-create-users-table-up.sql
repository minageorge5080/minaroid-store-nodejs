CREATE TABLE users (
    id serial primary key,
    password_digest TEXT,
    email varchar(100) NOT NULL UNIQUE,
    lastname varchar(100),
    firstname varchar(100)
);