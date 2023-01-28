const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();



const pool = new Pool({
    user: 'postgres',
    database: process.env.DATABASE, 
    password: process.env.PASSWORD,
    port: 5432,
    host: "localhost",
})

module.exports = pool;