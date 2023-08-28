const { Pool } = require("pg");

// Configurar el pool de conexiones a la base de datos PostgreSQL
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

const calculateRoute = async (req, res) => {
  const { rows: materiales } = await pool.query("SELECT * FROM material");
  const { limitePesoTotal } = req.body;

  // Filtrar y seleccionar solo los materiales reciclables: plástico, cartón, vidrio y metales.
  const materialesReciclables = materiales.filter((material) => {
    const nombreMaterialMinusculas = material.nombre.toLowerCase();
    const materialesPermitidos = ["plastico", "carton", "vidrio", "metales"];

    return materialesPermitidos.includes(nombreMaterialMinusculas);
  });

  // Convertir los valores y pesos a números de punto flotante
  for (const material of materialesReciclables) {
    material.valor = parseFloat(material.valor);
    material.peso = parseFloat(material.peso);
  }

  // Ordenar los materiales reciclables en orden descendente según su valor.
  materialesReciclables.sort((a, b) => b.valor - a.valor);

  let pesoActual = 0;
  let valorTotal = 0;
  const rutaOptima = [];

  // Iterar a través de los materiales reciclables y seleccionar los que se puedan añadir a la ruta óptima sin exceder el límite de peso.
  for (const material of materialesReciclables) {
    if (pesoActual + material.peso <= limitePesoTotal) {
      pesoActual += material.peso;
      valorTotal += material.valor;
      rutaOptima.push(material);
    }
  }

  // Crear la respuesta que contiene la ruta óptima y el valor total obtenido.
  const respuesta = {
    rutaOptima,
    valorTotal,
  };

  res.status(200).json(respuesta);
};

module.exports = calculateRoute;
