INSERT INTO users (id, firstname, lastname, username, password_digest, uid) VALUES (50, 'mina', 'george', 'mina1', '$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG', 'mina1-uid');
INSERT INTO users (id, firstname, lastname, username, password_digest, uid) VALUES (51, 'mina', 'george', 'mina2', '$2b$10$bTP6vzI1i5FGKa0kQv6A3uON2hAEGc1lLIFwcvJmt6VIKVVFtL3qG', 'mina2-uid');

INSERT INTO products (id, title, description, price, uid) VALUES (50, 'product 1', 'product desc', 500, 'product-1-uid');
INSERT INTO products (id, title, description, price, uid) VALUES (51, 'product 1', 'product desc', 500, 'product-12-uid');

INSERT INTO orders (id, status, user_id) VALUES (50, 'active', 50);
INSERT INTO orders (id, status, user_id) VALUES (51, 'active', 51);


INSERT INTO order_products (id, quantity, order_id, product_id) VALUES (50, 5, 50, 50);
INSERT INTO order_products (id, quantity, order_id, product_id) VALUES (51, 5, 50, 51);
INSERT INTO order_products (id, quantity, order_id, product_id) VALUES (52, 5, 51, 50);
INSERT INTO order_products (id, quantity, order_id, product_id) VALUES (53, 5, 51, 51);




