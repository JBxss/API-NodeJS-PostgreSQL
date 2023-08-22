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

  const token = jwt.sign(
    { id: newUserId, user: username, password: pass, passHash: passHash },
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  res.json({
    message: "User Added Succesfully",
    auth: true,
    body: {
      user: { username, pass, token },
    },
  });
};

const profileUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM auth WHERE id = $1", [
    req.userID,
  ]);

  if (response.rows.length === 0) {
    return res.status(404).send("No user found");
  }

  res.status(200).json(response.rows);
};

const loginUsers = async (req, res) => {
  const { username, pass } = req.body;
  const response = await pool.query(
    "SELECT * FROM auth WHERE username = $1 LIMIT 1",
    [username]
  );
  if (response.rows.length === 0) {
    return res.status(404).send("The user doesn't exist");
  }

  const validPassword = await bcrypt.compare(pass, response.rows[0].pass);
  if (!validPassword) {
    return res.status(401).json({
      auth: false,
      token: null,
    });
  }

  const token = jwt.sign({ id: response.rows[0].id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({
    auth: true,
    token,
  });
};

module.exports = {
  registerUsers,
  loginUsers,
  profileUsers,
};
