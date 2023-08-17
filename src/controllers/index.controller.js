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

const getUsersByID = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
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

const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} Deleted Succesfully`);
}

module.exports = {
    getUsers,
    getUsersByID,
    createUsers,
    deleteUsers
}