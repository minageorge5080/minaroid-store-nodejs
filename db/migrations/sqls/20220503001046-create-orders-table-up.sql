CREATE TABLE orders (
    id serial primary key,
    status varchar(50),
    user_id bigint REFERENCES users(id)
);