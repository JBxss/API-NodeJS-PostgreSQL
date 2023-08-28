// Importar las librerías y módulos necesarios
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Configurar el pool de conexiones a la base de datos PostgreSQL
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

// Controlador para registrar usuarios
const registerUsers = async (req, res) => {
  const { username, pass } = req.body;

  // Generar un hash de la contraseña utilizando bcrypt
  let passHash = await bcrypt.hash(pass, 10);

  // Insertar los datos del nuevo usuario en la base de datos
  const response = await pool.query(
    "INSERT INTO auth (username, pass) VALUES ($1, $2) RETURNING id",
    [username, passHash]
  );

  const newUserId = response.rows[0].id;

  // Generar un token JWT con la información del usuario
  const token = jwt.sign(
    { id: newUserId, user: username, password: pass, passHash: passHash },
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24, // Expira en 24 horas
    }
  );

  // Responder con los detalles del registro y el token generado
  res.status(201).json({
    message: "User Register Succesfully",
    auth: true,
    body: {
      user: { username, pass, token },
    },
  });
};

// Controlador para obtener el perfil de un usuario autenticado
const profileUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM auth WHERE id = $1", [
    req.userID, // Extraído del token verificado
  ]);

  if (response.rows.length === 0) {
    return res.status(404).send("No user found");
  }

  // Responder con los detalles del perfil del usuario
  res.status(200).json(response.rows);
};

// Controlador para realizar el inicio de sesión de usuarios
const loginUsers = async (req, res) => {
  const { username, pass } = req.body;

  // Buscar al usuario en la base de datos por su nombre de usuario
  const response = await pool.query(
    "SELECT * FROM auth WHERE username = $1 LIMIT 1",
    [username]
  );
  if (response.rows.length === 0) {
    return res.status(404).send("The user doesn't exist");
  }

  // Verificar la contraseña proporcionada con la almacenada en la base de datos
  const validPassword = await bcrypt.compare(pass, response.rows[0].pass);
  if (!validPassword) {
    return res.status(401).json({
      message: "No valid password",
      auth: false,
      token: null,
    });
  }

  // Generar un token JWT para el usuario autenticado
  const token = jwt.sign({ id: response.rows[0].id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.status(200).json({
    message: "Login Succesfully",
    auth: true,
    token,
  });
};

module.exports = {
  registerUsers,
  loginUsers,
  profileUsers,
};
