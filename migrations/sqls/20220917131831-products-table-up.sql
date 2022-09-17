CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    category_id INTEGER REFERENCES categories(id)
);