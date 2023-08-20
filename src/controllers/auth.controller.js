require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

const registerUsers = async (req, res) => {
  const { username, pass } = req.body;
  let passHash = await bcrypt.hash(pass, 10);

  const response = await pool.query(
    "INSERT INTO auth (username, pass) VALUES ($1, $2) RETURNING id",
    [username, passHash]
  );
  
  const newUserId = response.rows[0].id;

  const token = jwt.sign({ id: newUserId, user: username, password: pass, passHash: passHash }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({
    message: "User Added Succesfully",
    auth: true,
    body: {
      user: { username, pass, token },
    },
  });
};

const profileUsers = async (req, res) => {

  const token = req.headers['access-token'];
  if(!token){
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    })
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded)
  res.json("me")

};

const loginUsers = async (req, res) => {};



module.exports = {
  registerUsers,
  loginUsers,
  profileUsers,
};
