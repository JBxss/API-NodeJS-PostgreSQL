require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi',
    port: '5432'
})

const registerUsers = async (req, res) => {
    const { username, pass } = req.body;
    let passHash = await bcrypt.hash(pass, 10);

    const response = await pool.query('INSERT INTO auth (username, pass) VALUES ($1, $2)', [username, passHash]);
    console.log(response);

    // jwt.sign({username, pass}, process.env.SECRET, {
    //     expiresIn: 60*60*24
    // });

    res.json({
        message: 'User Added Succesfully',
        auth: true,
        body: {
            user: {username, passHash}
        }
    })
}

const loginUsers = async (req, res) => {

    
}

const profileUsers = async (req, res) => {
    res.json("me");
}

module.exports = {
    registerUsers,
    loginUsers,
    profileUsers
}