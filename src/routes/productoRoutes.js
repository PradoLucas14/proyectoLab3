const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');


// Ruta GET para obtener todos los productos
router.get('/productos',authMiddleware, productoController.obtenerProductos);

// Ruta GET para obtener un producto por ID
router.get('/productos/:id',authMiddleware, productoController.obtenerProductoPorId);

// Ruta POST para crear un nuevo producto
router.post('/productos',authMiddleware, productoController.crearProducto);

// Ruta PATCH para actualizar un producto específico
router.patch('/productos/:id',authMiddleware, productoController.actualizarProducto);

// Ruta DELETE para eliminar un producto específico
router.delete('/productos/:id',authMiddleware, productoController.eliminarProducto);

module.exports = router;
