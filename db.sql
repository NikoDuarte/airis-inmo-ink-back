CREATE DATABASE IF NOT EXISTS inmo_ink;
USE inmo_ink;

CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS inmueble (
    id_inmueble INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    name_inmueble VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    lon DECIMAL(10, 6) NOT NULL,
    lat DECIMAL(10, 6) NOT NULL,
    price BIGINT NOT NULL,
    date_register TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);
