// Importa la conexión a la base de datos
const db = require('../dbConfig');
const bcrypt = require('bcrypt');

// Función para obtener todos los usuarios
const obtenerUsuarios = (callback) => {
    db.query('SELECT id, username, email, created_at FROM users', callback);
};

// Función para crear un nuevo usuario
const crearUsuario = (nuevoUsuario, callback) => {
    // Genera un hash de la contraseña antes de almacenarla
    bcrypt.hash(nuevoUsuario.password, 10, (err, hash) => {
        if (err) {
            console.error('Error al encriptar la contraseña:', err);
            return callback(err);
        }
        
        // Reemplaza la contraseña sin encriptar con el hash
        nuevoUsuario.password = hash;
        
        // Inserta el nuevo usuario en la base de datos
        db.query('INSERT INTO users SET ?', nuevoUsuario, callback);
    });
};

// Función para actualizar un usuario
const actualizarUsuario = (idUsuario, datosUsuario, callback) => {
    db.query('UPDATE users SET ? WHERE id = ?', [datosUsuario, idUsuario], callback);
};

// Función para eliminar un usuario
const eliminarUsuario = (idUsuario, callback) => {
    db.query('DELETE FROM users WHERE id = ?', idUsuario, callback);
};

// Función para obtener un usuario por su correo electrónico
const obtenerUsuarioPorEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null, null);
        }
    });
};

// Exporta las funciones del modelo de usuario
module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarioPorEmail  // Asegúrate de incluir esta función en la exportación
};
