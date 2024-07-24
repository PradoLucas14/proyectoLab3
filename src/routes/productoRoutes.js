const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

// Ruta GET para obtener todos los productos
router.get('/productos', productoController.obtenerProductos);

// Ruta GET para obtener un producto por ID
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Ruta POST para crear un nuevo producto
router.post('/productos', productoController.crearProducto);

// Ruta PATCH para actualizar un producto específico
router.patch('/productos/:id', productoController.actualizarProducto);

// Ruta DELETE para eliminar un producto específico
router.delete('/productos/:id', productoController.eliminarProducto);

module.exports = router;
