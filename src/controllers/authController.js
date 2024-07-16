const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Controlador para manejar el inicio de sesión de usuarios
const iniciarSesion = (req, res) => {
    const { email, password } = req.body;

    Usuario.autenticarUsuario(email, password, (err, usuario, token) => {
        if (err) {
            console.error('Error al autenticar usuario:', err);
            return res.status(500).send('Error al autenticar usuario');
        }
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Si la autenticación es exitosa, envía el token JWT en la respuesta
        res.json({ token });
    });
};

module.exports = {
    iniciarSesion
};
