CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email) VALUES ('juan', 'juan@ibm.com'), ('cris', 'cris@abc.com');

CREATE TABLE auth(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40),
    pass TEXT
);

CREATE TABLE material (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    peso DECIMAL(10, 2),
    valor DECIMAL(10, 2)
);

INSERT INTO material (nombre, peso, valor) VALUES
('Plástico', 0.5, 10.50),
('Vidrio', 0.8, 15.75),
('Papel', 0.3, 5.25);

CREATE TABLE recoleccion (
    id SERIAL PRIMARY KEY,
    material_reciclado_id INT REFERENCES material(id),
    cantidad_recolectada INT,
    fecha_recoleccion TIMESTAMP
);

INSERT INTO recoleccion (material_reciclado_id, cantidad_recolectada, fecha_recoleccion) VALUES
(1, 100, '2023-08-23 10:00:00'),
(2, 50, '2023-08-22 15:30:00');

