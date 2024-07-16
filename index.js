// Importa el módulo dotenv y carga las variables de entorno desde .env
require('dotenv').config({ path: __dirname + '/../.env' });

// Importa los módulos necesarios
const express = require('express');
const db = require('./src/dbConfig.js'); // Importa la configuración de la base de datos desde src/dbConfig.js
const usuariosRoutes = require('./src/routes/usuariosRoutes'); // Importa las rutas de usuarios desde usuariosRoutes.js

// Crea una instancia de Express
const app = express();

// Middleware: Registra las solicitudes HTTP en la consola
app.use(express.json()); // Para procesar JSON en las solicitudes POST
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios HTML

// Rutas protegidas (requieren verificación de token)
app.use('/api', usuariosRoutes);

// Inicia el servidor HTTP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
