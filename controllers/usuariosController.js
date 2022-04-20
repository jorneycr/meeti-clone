const Usuarios = require('../models/Usuarios');
const { body, validationResult } = require('express-validator');


exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear tu  Cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;
    const nuevoUsuario = await Usuarios.create(usuario);

    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    // Leer los errores de express
    const erroresExpress = req.validationErrors();

    try {
        //TODO : Flash Message y redireccionar
        console.log(nuevoUsuario);
    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);
        console.log(erroresSequelize);

        req.flash('error', erroresSequelize);
        res.redirect('/crear-cuenta');
    }

}