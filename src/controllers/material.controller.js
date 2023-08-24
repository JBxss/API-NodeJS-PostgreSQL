const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

const getMaterial = async (req, res) => {
  const response = await pool.query("SELECT * FROM material");
  res.status(200).json(response.rows);
};

const getMaterialByID = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM material WHERE id = $1", [id]);
  res.status(200).json(response.rows);
};

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
