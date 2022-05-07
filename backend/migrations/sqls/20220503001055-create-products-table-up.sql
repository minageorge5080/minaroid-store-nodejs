CREATE TABLE products (
    id serial primary key,
    title varchar(100) NOT NULL,
    description TEXT,
    price integer NOT NULL
);