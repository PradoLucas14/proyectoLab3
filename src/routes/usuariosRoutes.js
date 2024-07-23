const express = require('express');
const router = express.Router();

// Importa el controlador de usuarios
const usuariosController = require('../controllers/usuariosController');

// Ruta GET para obtener todos los usuarios
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Ruta POST para crear un nuevo usuario
router.post('/usuarios', usuariosController.crearUsuario);

// Ruta PATCH para actualizar un usuario específico
router.patch('/usuarios/:id', usuariosController.actualizarUsuario);

// Ruta DELETE para eliminar un usuario específico
router.delete('/usuarios/:id', usuariosController.eliminarUsuario);

// Ruta POST para iniciar sesión
router.post('/usuarios/login', usuariosController.iniciarSesion);

// Exporta el enrutador de usuarios
module.exports = router;
