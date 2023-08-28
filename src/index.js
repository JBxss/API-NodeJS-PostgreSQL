const express = require("express");
const app = express();

// Middlewares
// Configurar Express para que maneje JSON en las solicitudes
app.use(express.json());
// Configurar Express para manejar datos de formularios HTML
app.use(express.urlencoded({ extended: false }));

// Rutas
// Asociar las rutas definidas en "./routes/index.js" con la aplicación
app.use(require("./routes/index"));

// Iniciar el servidor
app.listen(3000);
console.log("Servidor en el puerto 3000");