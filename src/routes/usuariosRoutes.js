const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta GET para obtener todos los usuarios
router.get('/', authMiddleware, usuariosController.obtenerUsuarios);

// Ruta POST para crear un nuevo usuario, solo accesible para usuarios autenticados
router.post('/', authMiddleware, usuariosController.crearUsuario);

// Ruta PATCH para actualizar un usuario específico
router.patch('/:id', authMiddleware, usuariosController.actualizarUsuario);

// Ruta DELETE para eliminar un usuario específico
router.delete('/:id', authMiddleware, usuariosController.eliminarUsuario);

// Ruta POST para iniciar sesión
router.post('/login', usuariosController.iniciarSesion);

module.exports = router;
