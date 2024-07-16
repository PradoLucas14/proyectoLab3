const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Extrae el token del header de autorización
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado' });
    }

    // Verifica y decodifica el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(401).json({ message: 'Acceso denegado. Token inválido' });
        }

        // Almacena los datos decodificados del token en el objeto de solicitud para uso posterior
        req.user = decoded;
        next(); // Continúa con la siguiente función de middleware o ruta
    });
};

module.exports = verificarToken;
