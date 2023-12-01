CREATE DATABASE IF NOT EXISTS Ciudad_accesible;

USE Ciudad_accesible;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'normal') DEFAULT 'normal'

);

CREATE TABLE problemas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    barrio VARCHAR(200),
    ciudad VARCHAR(200),
    userId INT UNSIGNED NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (userId) REFERENCES users(id)
  
);

CREATE TABLE problemas_images (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    images VARCHAR(100) NOT NULL,
    problemaId INT UNSIGNED NOT NULL,
    FOREIGN KEY (problemaId) REFERENCES problemas (id) ON DELETE CASCADE
);


CREATE TABLE likes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId INT UNSIGNED NOT NULL,
    problemasId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE,
    FOREIGN KEY (problemasId)
        REFERENCES problemas (id)
        ON DELETE CASCADE
);

