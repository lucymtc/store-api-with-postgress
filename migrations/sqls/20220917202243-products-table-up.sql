CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    image text,
    short_description text,
    category_id INTEGER REFERENCES categories(id)
);