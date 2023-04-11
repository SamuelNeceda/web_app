import {Router} from "express";
import pool from "../dbServer";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
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

        const insertStatus = status ?? "patient"
        let uniqueUser = await pool.query(
            "INSERT INTO useraccount (email, password, firstname, lastname, title, birthdate, phone, sex, status, birthnumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [
                email,
                password,
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

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;