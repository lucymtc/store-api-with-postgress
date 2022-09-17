CREATE TABLE categories (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description text
);