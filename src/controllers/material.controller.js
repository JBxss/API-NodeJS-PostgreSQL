const { Pool } = require("pg");

// Configurar el pool de conexiones a la base de datos PostgreSQL
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

// Controlador para obtener todos los materiales
const getMaterial = async (req, res) => {
  const response = await pool.query("SELECT * FROM material");
  res.status(200).json(response.rows);
};

// Controlador para obtener un material por su ID
const getMaterialByID = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM material WHERE id = $1", [id]);
  res.status(200).json(response.rows);
};

// Controlador para crear un nuevo material
const createMaterial = async (req, res) => {
  const { nombre, peso, valor } = req.body;
  const response = await pool.query(
    "INSERT INTO material (nombre, peso, valor) VALUES ($1, $2, $3)",
    [nombre, peso, valor]
  );

  console.log(response);
  res.status(201).json({
    message: "Material Added Succesfully",
    body: {
      material: { nombre, peso, valor },
    },
  });
};

// Controlador para actualizar un material por su ID
const updateMaterial = async (req, res) => {
  const id = req.params.id;
  const { nombre, peso, valor } = req.body;
  const response = await pool.query(
    "UPDATE material SET nombre = $1, peso = $2, valor = $3 WHERE id = $4",
    [nombre, peso, valor, id]
  );
  console.log(response);
  res.status(201).json({
    message: "Material Update Succesfully",
    body: {
      material: { nombre, peso, valor },
    },
  });
};

// Controlador para eliminar un material por su ID
const deleteMaterial = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM material WHERE id = $1", [id]);
  console.log(response);
  res.status(200).json(`Material ${id} Deleted Succesfully`);
};

module.exports = {
  getMaterial,
  getMaterialByID,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
