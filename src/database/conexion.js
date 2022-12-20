import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "root",
    database: "reforestacion",
});

export default pool