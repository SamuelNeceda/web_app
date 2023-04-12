const router = require("express").Router();
import pool from "../dbServer"

router.get("/", async (req, res) => {
  try {
    // req.user -> returns the object with id which represents userid in table
    const user = await pool.query(
      "SELECT firstname FROM useraccount WHERE password = $1",
      [req.user.password]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;