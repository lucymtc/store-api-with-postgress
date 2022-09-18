CREATE TYPE userstatus AS ENUM ('active', 'inactive');

CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    username VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR,
    status userstatus NOT NULL DEFAULT 'active'
);