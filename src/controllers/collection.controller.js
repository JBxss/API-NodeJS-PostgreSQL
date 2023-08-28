const { Pool } = require("pg");

// Configurar el pool de conexiones a la base de datos PostgreSQL
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

// Controlador para obtener todas las colecciones de reciclaje
const getCollection = async (req, res) => {
  const response = await pool.query("SELECT * FROM recoleccion");
  res.status(200).json(response.rows);
};

// Controlador para obtener una colección de reciclaje por su ID
const getCollectionByID = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM recoleccion WHERE id = $1", [id]);
  res.status(200).json(response.rows);
};

// Controlador para crear una nueva colección de reciclaje
const createCollection = async (req, res) => {
  const { material_reciclado_id, cantidad_recolectada, fecha_recoleccion } = req.body;
  const response = await pool.query(
    "INSERT INTO recoleccion (material_reciclado_id, cantidad_recolectada, fecha_recoleccion) VALUES ($1, $2, $3)",
    [material_reciclado_id, cantidad_recolectada, fecha_recoleccion]
  );

  console.log(response);
  res.status(201).json({
    message: "Collection Added Succesfully",
    body: {
      material: { material_reciclado_id, cantidad_recolectada, fecha_recoleccion },
    },
  });
};

// Controlador para actualizar una colección de reciclaje por su ID
const updateCollection = async (req, res) => {
  const id = req.params.id;
  const { material_reciclado_id, cantidad_recolectada, fecha_recoleccion } = req.body;
  const response = await pool.query(
    "UPDATE recoleccion SET material_reciclado_id = $1, cantidad_recolectada = $2, fecha_recoleccion = $3 WHERE id = $4",
    [material_reciclado_id, cantidad_recolectada, fecha_recoleccion, id]
  );
  console.log(response);
  res.status(201).json({
    message: "Collection Update Succesfully",
    body: {
      material: { material_reciclado_id, cantidad_recolectada, fecha_recoleccion },
    },
  });
};

// Controlador para eliminar una colección de reciclaje por su ID
const deleteCollection = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM recoleccion WHERE id = $1", [id]);
  console.log(response);
  res.status(200).json(`Collection ${id} Deleted Succesfully`);
};

module.exports = {
  getCollection,
  getCollectionByID,
  createCollection,
  updateCollection,
  deleteCollection
};
