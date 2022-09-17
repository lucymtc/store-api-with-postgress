CREATE TYPE statustype AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id INTEGER REFERENCES users(id),
    status statustype NOT NULL DEFAULT 'active'
);