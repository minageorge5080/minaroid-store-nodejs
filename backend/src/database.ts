import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  POSTGRES_TEST_DB,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

console.log("NODE_ENV", NODE_ENV);

let client: Pool;

if (NODE_ENV === "test") {
  client = new Pool({
    port: parseInt(POSTGRES_PORT ?? "5430"),
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  client = new Pool({
    port: parseInt(POSTGRES_PORT ?? "5430"),
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
