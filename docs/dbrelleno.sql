-- Insertar datos en la tabla users
INSERT INTO users (email, password, name, avatar, registrationCode, role) VALUES
('usuario1@email.com', 'contraseña1', 'Usuario 1', 'avatar1.jpg', 'regCode1', 'normal'),
('usuario2@email.com', 'contraseña2', 'Usuario 2', 'avatar2.jpg', 'regCode2', 'admin'),
('usuario3@email.com', 'contraseña3', 'Usuario 3', 'avatar3.jpg', 'regCode3', 'normal');

-- Insertar datos en la tabla comida
INSERT INTO comida (title, description, userId) VALUES
('Plato 1', 'Descripción del Plato 1', 1),
('Plato 2', 'Descripción del Plato 2', 2),
('Plato 3', 'Descripción del Plato 3', 3);

-- Insertar datos en la tabla comida_images
INSERT INTO comida_images (image, comidaId) VALUES
('imagen1.jpg', 1),
('imagen2.jpg', 2),
('imagen3.jpg', 3);

-- Insertar datos en la tabla comida_comentarios
INSERT INTO comida_comentarios (comentario, userId, comidaId) VALUES
('Comentario en Plato 1', 1, 1),
('Comentario en Plato 2', 2, 2),
('Comentario en Plato 3', 3, 3);

-- Insertar datos en la tabla likes
INSERT INTO likes (userId, comidaId) VALUES
(1, 2),
(2, 1),
(3, 3);
