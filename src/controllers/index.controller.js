const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi',
    port: '5432'
})

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}

const createUsers =  async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);

    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {name, email}
        }
    })
}

module.exports = {
    getUsers,
    createUsers
}