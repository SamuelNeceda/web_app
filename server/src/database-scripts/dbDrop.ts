const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

client.connect();

const dropDbSQL = `DROP DATABASE hackhealthdb;`;
const terminateConnectionsSQL = `SELECT pg_terminate_backend(pg_stat_activity.pid)
                                 FROM pg_stat_activity
                                 WHERE pg_stat_activity.datname = 'hackhealthdb';
`;

client.query(terminateConnectionsSQL, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Active connections terminated successfully");
    }
});

client.query(dropDbSQL, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Database dropped successfully");
    }
    client.end();
});
