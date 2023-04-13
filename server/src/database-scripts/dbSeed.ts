const {Client} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client2 = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

client2.connect();

const createTableUserAccount = `
    CREATE TABLE useraccount
    (
        userid      SERIAL,
        email       VARCHAR(50)  NOT NULL,
        password    VARCHAR(255) NOT NULL,
        firstname   VARCHAR(30)  NOT NULL,
        lastname    VARCHAR(30)  NOT NULL,
        title       VARCHAR(15) DEFAULT '-',
        birthdate   DATE         NOT NULL,
        phone       VARCHAR(24)  NOT NULL,
        sex         CHAR(1)     DEFAULT 'M' CHECK ( sex = 'M' OR sex = 'F' ),
        status      VARCHAR(10) DEFAULT 'patient',
        birthnumber VARCHAR(11)  NOT NULL,
        PRIMARY KEY (userid)
    );
`;


const createTableAppointment = `
    CREATE TABLE appointment
    (
        userid SERIAL,
        date   DATE        NOT NULL,
        time   TIME        NOT NULL,
        notes  VARCHAR(200),
        status VARCHAR(10) NOT NULL,
        FOREIGN KEY (userid) REFERENCES useraccount (userid) ON DELETE CASCADE
    );
`;

const createTableMedicalReport = `
    CREATE TABLE medicalreport
    (
        userid         SERIAL,
        medicalhistory JSON,
        vitalsigns     JSON,
        medications    JSON,
        files          JSON,
        notes          VARCHAR(200),
        FOREIGN KEY (userid) REFERENCES useraccount (userid) ON DELETE CASCADE
    );
`;

const insertUserAccount1 = `
    INSERT INTO useraccount (email, password, firstname, lastname, birthdate, phone, sex, status, birthnumber)
    VALUES ('admin@hackhealth.com', 'password', 'admin', 'admin', '2000-01-01', '+421915123456', 'M', 'admin', '123456/8429');
`;
const insertUserAccount2 = `
    INSERT INTO useraccount (email, password, firstname, lastname, title, birthdate, phone, sex, status, birthnumber)
    VALUES ('jane.smith@hackhealth.com', 'MyStrongPassword123', 'Jane', 'Smith', 'Mudr.', '1990-01-01', '+421905524887', 'F', 'doctor', '900101/1234');
`;
const insertUserAccount3 = `
    INSERT INTO useraccount (email, password, firstname, lastname, birthdate, phone, sex, status, birthnumber)
    VALUES ('samuel.neceda@gmail.com', 'secret', 'Samuel', 'Neceda', '2001-06-28', '+421905479874', 'M', 'patient', '573224/6614');
`;

const insertMedicalReport = `
    INSERT INTO medicalreport (userid, medicalhistory, vitalsigns, medications, files, notes)
    VALUES ((SELECT userid FROM useraccount WHERE birthnumber = '573224/6614'), '{
  "illnesses": "none",
  "chronicConditions": "none",
  "allergies": "dust",
  "surgeries": "appendix"
}', '{
  "height": "1.89",
  "weight": "80",
  "bloodPressure": "120/80",
  "heartRate": "60",
  "temperature": "36.5"
}', '{
  "medicationName": "Vitamin C",
  "dosage": "1",
  "frequency": "1"
}', NULL, NULL);
`;
const insertAppointment = `
    INSERT INTO appointment (userid, date, time, notes, status)
    VALUES ((SELECT userid FROM useraccount WHERE birthnumber = '573224/6614'), '2023-08-15', '10:00:00', NULL, 'active');
`;

async function runQueries() {
    await client2.query(createTableUserAccount);
    await client2.query(createTableAppointment);
    await client2.query(createTableMedicalReport);
    console.log("Tables created successfully");
    await client2.query(insertUserAccount1);
    await client2.query(insertUserAccount2);
    await client2.query(insertUserAccount3);
    await client2.query(insertMedicalReport);
    await client2.query(insertAppointment);
    console.log("Data inserted successfully");
    client2.end();
}

runQueries()
    .then(() => {
        client2.end();
    })
    .catch((err) => {
        console.error("Error while executing queries: ", err);
        client2.end();
    });
