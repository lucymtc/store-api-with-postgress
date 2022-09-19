CREATE TYPE orderstatus AS ENUM ('active', 'complete', 'cancel');

CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id INTEGER REFERENCES users(id),
    status orderstatus NOT NULL DEFAULT 'active'
);