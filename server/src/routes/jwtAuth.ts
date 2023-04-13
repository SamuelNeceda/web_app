import {Router} from "express";
import pool from "../dbServer";
import generateJWT from "../utils/jwtGenerator";
import bcrypt from "bcrypt";
import authorization from "../middleware/authorization";
const inputValidation = require("../middleware/inputValidation");

const router = Router();

// REGISTER
router.post("/register",inputValidation, async (req, res) => {
    const {
        email,
        password,
        firstname,
        lastname,
        title,
        birthdate,
        phone,
        sex,
        status,
        birthnumber,
    } = req.body;

    try {
        const user = await pool.query(
            "SELECT * FROM useraccount WHERE email = $1",
            [email]
        );

        if (user.rows.length) {
            return res.status(401).json("User is already registered.");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const insertStatus = status ?? "patient"
        let uniqueUser = await pool.query(
            "INSERT INTO useraccount (email, password, firstname, lastname, title, birthdate, phone, sex, status, birthnumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [
                email,
                bcryptPassword,
                firstname,
                lastname,
                title,
                birthdate,
                phone,
                sex,
                insertStatus,
                birthnumber,
            ]
        );

        const token = generateJWT(uniqueUser.rows[0].password)
        res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// LOGIN
router.post("/login", inputValidation, async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query(
            "SELECT * FROM useraccount WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid email.");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("Invalid password.");
        }

        const token = generateJWT(user.rows[0].password);
        res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// VERIFY
// Check if the token is valid before accessing private routes
// Verify whenever the user refreshes the page
router.get("/verify", authorization, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;