const express = require('express');
const router = express.Router();

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    const pool = await require("../config/db")
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE `name` = ? AND `grad_year` > ?', ['Adam', 2022]);
    
    res.send(rows);
});

module.exports = router;
