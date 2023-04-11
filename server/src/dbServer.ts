// Configure connection to database

import {Pool} from 'pg';


const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "hackhealthdb",
})

export default pool;