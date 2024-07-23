const Producto = require('../models/productoModel');

// Controlador para obtener todos los productos
const obtenerProductos = (req, res) => {
    Producto.obtenerProductos((err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            res.status(500).send('Error al obtener los productos');
        } else {
            res.json(results);
        }
    });
};

// Controlador para obtener un producto por ID
const obtenerProductoPorId = (req, res) => {
    const id = req.params.id;
    Producto.obtenerProductoPorId(id, (err, producto) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).send('Error al obtener el producto');
        } else if (!producto) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(producto);
        }
    });
};

// Controlador para crear un nuevo producto
const crearProducto = (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    // Validaciones
    if (!nombre || precio === undefined || stock === undefined) {
        return res.status(400).send('Faltan datos requeridos');
    }

    const nuevoProducto = { nombre, descripcion, precio, stock };

    Producto.crearProducto(nuevoProducto, (err, result) => {
        if (err) {
            console.error('Error al crear el producto:', err);
            res.status(500).send('Error al crear el producto');
        } else {
            res.status(201).send('Producto creado exitosamente');
        }
    });
};

// Controlador para actualizar un producto
const actualizarProducto = (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;

    // Validaciones
    if (nombre === undefined && precio === undefined && stock === undefined) {
        return res.status(400).send('No hay datos para actualizar');
    }

    const datosProducto = { nombre, descripcion, precio, stock };

    Producto.actualizarProducto(id, datosProducto, (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).send('Error al actualizar el producto');
        } else {
            res.status(200).send('Producto actualizado exitosamente');
        }
    });
};

// Controlador para eliminar un producto
const eliminarProducto = (req, res) => {
    const id = req.params.id;

    Producto.eliminarProducto(id, (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).send('Error al eliminar el producto');
        } else {
            res.status(200).send('Producto eliminado exitosamente');
        }
    });
};

// Exporta las funciones del controlador de productos
module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
