const db = require('../dbConfig'); // Asegúrate de que la ruta sea correcta

// Función para obtener todos los productos
const obtenerProductos = (callback) => {
    db.query('SELECT * FROM productos', callback);
};

// Función para obtener un producto por su ID
const obtenerProductoPorId = (id, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', id, (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null, null);
        }
    });
};

// Función para crear un nuevo producto
const crearProducto = (nuevoProducto, callback) => {
    db.query('INSERT INTO productos SET ?', nuevoProducto, callback);
};

// Función para actualizar un producto
const actualizarProducto = (id, datosProducto, callback) => {
    db.query('UPDATE productos SET ? WHERE id = ?', [datosProducto, id], callback);
};

// Función para eliminar un producto
const eliminarProducto = (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', id, callback);
};

// Exporta las funciones del modelo de productos
module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
