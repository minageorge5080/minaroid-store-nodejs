import { Pool } from "pg";

const {
  NODE_ENV,
  POSTGRES_TEST_DB,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

console.log("NODE_ENV", NODE_ENV);

// default is set to development env.
let client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

if (NODE_ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
