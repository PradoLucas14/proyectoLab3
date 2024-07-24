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

    // Verificar si el nombre del producto tiene al menos 6 caracteres
    if (nombre.length < 6) {
        return res.status(400).send('El nombre del producto debe tener al menos 6 caracteres');
    }

    // Verificar si el nombre del producto ya está registrado
    Producto.obtenerProductoPorNombre(nombre, (err, productoExistente) => {
        if (err) {
            console.error('Error al verificar el nombre del producto:', err);
            return res.status(500).send('Error al verificar el nombre del producto en la base de datos');
        }

        // Si encuentra un producto con el mismo nombre, devuelve un error
        if (productoExistente.length > 0) {
            return res.status(400).send('Ya existe un producto con este nombre');
        }

        // Limitar la longitud de la descripción a 50 caracteres
        if (descripcion && descripcion.length > 50) {
            return res.status(400).send('La descripción no puede tener más de 50 caracteres');
        }

        // Si el nombre del producto no está registrado, procede a crear el producto
        const nuevoProducto = { nombre, descripcion, precio, stock };

        Producto.crearProducto(nuevoProducto, (err, result) => {
            if (err) {
                console.error('Error al crear el producto:', err);
                res.status(500).send('Error al crear el producto en la base de datos');
            } else {
                res.status(201).send('Producto creado exitosamente');
            }
        });
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

    // Limitar la longitud de la descripción a 50 caracteres
    if (descripcion && descripcion.length > 50) {
        return res.status(400).send('La descripción no puede tener más de 50 caracteres');
    }

    // Verificar si el nombre del producto tiene al menos 6 caracteres
    if (nombre && nombre.length < 6) {
        return res.status(400).send('El nombre del producto debe tener al menos 6 caracteres');
    }

    const datosProducto = { nombre, descripcion, precio, stock };

    // Si se proporciona un nuevo nombre, verificar si ya existe un producto con el mismo nombre
    if (nombre) {
        Producto.obtenerProductoPorNombre(nombre, (err, productoExistente) => {
            if (err) {
                console.error('Error al verificar el nombre del producto:', err);
                return res.status(500).send('Error al verificar el nombre del producto en la base de datos');
            }

            // Si el producto ya existe y no es el mismo producto que estamos actualizando, devolver un error
            if (productoExistente.length > 0 && productoExistente[0].id !== parseInt(id)) {
                return res.status(400).send('Ya existe un producto con este nombre');
            }

            // Actualizar el producto si el nombre es único o no se proporciona
            Producto.actualizarProducto(id, datosProducto, (err, result) => {
                if (err) {
                    console.error('Error al actualizar el producto:', err);
                    res.status(500).send('Error al actualizar el producto');
                } else {
                    res.status(200).send('Producto actualizado exitosamente');
                }
            });
        });
    } else {
        // Si no se proporciona un nuevo nombre, simplemente actualiza el producto
        Producto.actualizarProducto(id, datosProducto, (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto:', err);
                res.status(500).send('Error al actualizar el producto');
            } else {
                res.status(200).send('Producto actualizado exitosamente');
            }
        });
    }
};// Controlador para eliminar un producto
const eliminarProducto = (req, res) => {
    const id = req.params.id;

    // Primero, obtener el producto para verificar su stock
    Producto.obtenerProductoPorId(id, (err, producto) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            return res.status(500).send('Error al obtener el producto de la base de datos');
        }
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        // Verificar el stock del producto
        if (producto.stock > 0) {
            return res.status(400).send('No se puede eliminar el producto mientras tenga stock');
        }

        // Si el stock es 0, proceder a eliminar el producto
        Producto.eliminarProducto(id, (err, result) => {
            if (err) {
                console.error('Error al eliminar el producto:', err);
                res.status(500).send('Error al eliminar el producto');
            } else {
                res.status(200).send('Producto eliminado exitosamente');
            }
        });
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
