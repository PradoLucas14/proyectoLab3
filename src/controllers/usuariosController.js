const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controlador para obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
    Usuario.obtenerUsuarios((err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).send('Error al obtener los usuarios de la base de datos');
        } else {
            res.json(results); // Devuelve los resultados como JSON
        }
    });
};

// Controlador para crear un nuevo usuario
const crearUsuario = (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si el correo electrónico ya está registrado
    Usuario.obtenerUsuarioPorEmail(email, (err, usuarioExistente) => {
        if (err) {
            console.error('Error al verificar el correo electrónico:', err);
            return res.status(500).send('Error al verificar el correo electrónico en la base de datos');
        }

        // Si encuentra un usuario con el mismo correo electrónico, devuelve un error
        if (usuarioExistente) {
            return res.status(400).send('Ya existe un usuario con este correo electrónico');
        }

        // Si el correo electrónico no está registrado, procede a crear el usuario
        const nuevoUsuario = { username, email, password };

        Usuario.crearUsuario(nuevoUsuario, (err, result) => {
            if (err) {
                console.error('Error al crear el usuario:', err);
                res.status(500).send('Error al crear el usuario en la base de datos');
            } else {
                res.status(201).send('Usuario creado exitosamente');
            }
        });
    });
};

// Controlador para actualizar un usuario
const actualizarUsuario = (req, res) => {
    const idUsuario = req.params.id;
    const { username, email } = req.body;

    const datosUsuario = { username, email };

    Usuario.actualizarUsuario(idUsuario, datosUsuario, (err, result) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).send('Error al actualizar el usuario en la base de datos');
        } else {
            res.status(200).send('Usuario actualizado exitosamente');
        }
    });
};

// Controlador para eliminar un usuario
const eliminarUsuario = (req, res) => {
    const idUsuario = req.params.id;

    Usuario.eliminarUsuario(idUsuario, (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).send('Error al eliminar el usuario de la base de datos');
        } else {
            res.status(200).send('Usuario eliminado exitosamente');
        }
    });
};

// Controlador para iniciar sesión
const iniciarSesion = (req, res) => {
    const { email, password } = req.body;

    Usuario.autenticarUsuario(email, password, (err, usuario, token) => {
        if (err) {
            console.error('Error al autenticar el usuario:', err);
            return res.status(500).send('Error al iniciar sesión');
        }

        if (!usuario) {
            return res.status(400).send('Correo electrónico o contraseña incorrectos');
        }

        res.json({ token });
    });
};

// Exporta las funciones del controlador de usuarios
module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion
};
