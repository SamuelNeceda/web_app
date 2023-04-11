const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client1 = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

client1.connect();

const createDbSQL = `CREATE DATABASE hackhealthdb;`;

client1.query(createDbSQL, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Database created successfully");
    }
    client1.end();
});
