import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_PORT_TEST,
  ENV
} = process.env;

const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port:
    ENV === 'test'
      ? (POSTGRES_PORT_TEST as unknown as number)
      : (POSTGRES_PORT as unknown as number)
});

export default client;
