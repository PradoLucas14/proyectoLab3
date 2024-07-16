// Importa el módulo mysql2
const mysql = require('mysql2');

// Importa el módulo dotenv y carga las variables de entorno desde .env
require('dotenv').config({ path: __dirname + '/../.env' });

// Configura la conexión a MySQL usando las variables de entorno cargadas
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Crea una conexión a la base de datos MySQL
const db = mysql.createConnection(dbConfig);

// Conecta a la base de datos MySQL
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conexión establecida con MySQL');
});

// Manejo de errores de conexión
db.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
    db.end(); // Cierra la conexión
});

// Exporta la configuración de la base de datos para que esté disponible en otros módulos
module.exports = db;
