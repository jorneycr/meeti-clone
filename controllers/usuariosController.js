const Usuarios = require('../models/Usuarios');
const { body, validationResult } = require('express-validator');


exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear tu  Cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    // Leer los errores de express
    const erroresExpress = req.validationErrors();

    try {
        // await Usuarios.create(usuario);

        // Url de confirmación
        // const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        // Enviar email de confirmación
        // await enviarEmail.enviarEmail({
        //     usuario,
        //     url,
        //     subject: 'Confirma tu cuenta de Meeti',
        //     archivo: 'confirmar-cuenta'
        // });

        // //Flash Message y redireccionar
        // req.flash('exito', 'Hemos enviado un E-mail, confirma tu cuenta');
        // res.redirect('/iniciar-sesion');
    } catch (error) {
        console.log(error);
        // extraer el message de los errores
        const erroresSequelize = error.errors.map(err => err.message);

        // extraer unicamente el msg de los errores
        const errExp = erroresExpress.map(err => err.msg);

        //unirlos
        const listaErrores = [...erroresSequelize, ...errExp];

        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }

}