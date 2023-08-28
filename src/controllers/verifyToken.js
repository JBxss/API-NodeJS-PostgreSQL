require("dotenv").config();
const jwt = require("jsonwebtoken");

// Función de middleware para verificar el token de autenticación
function verifyToken(req, res, next) {
  const token = req.headers["access-token"];

  // Si no se proporciona ningún token en el encabezado
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  // Verificar y decodificar el token utilizando la clave secreta
  const decoded = jwt.verify(token, process.env.SECRET);

  // Agregar el ID del usuario decodificado a la solicitud para su posterior uso
  req.userID = decoded.id;
  next();
}

module.exports = verifyToken;
