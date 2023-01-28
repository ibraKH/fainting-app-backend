const dotenv = require('dotenv');

dotenv.config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://postgres:${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DATABASE}`,
    ssl: process.env.DATABASE_URL ? true : false
})

module.exports = pool;