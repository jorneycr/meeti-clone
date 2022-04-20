const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/emails');
const { body, validationResult } = require('express-validator');


exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear tu  Cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    const rules = [
        body('nombre').escape(),
        body('confirmar').not().isEmpty().withMessage('Repetir el password es obligatorio').escape(),
        body('confirmar').equals( req.body.password ).withMessage('Las contraseñas son diferentes')
    ];
 
    await Promise.all(rules.map( validation => validation.run(req)));
    const errores = validationResult(req);

    // Leer los errores de express
    // const erroresExpress = req.validationErrors();

    try {
        await Usuarios.create(usuario);

        // Url de confirmación
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        // // Enviar email de confirmación
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        });

        //Flash Message y redireccionar
        req.flash('exito', 'Hemos enviado un E-mail, confirma tu cuenta');
        res.redirect('/iniciar-sesion');
    } catch (error) {

        if (error.parent && error.parent.code === '23505') {
            req.flash('error', 'El Usuario ya existe');
        } else {
            const erroresSequelize = error.errors.map(err => err.message);
            const validatorErrors = errores.errors.map(err => err.msg);

            const erroresGenerales = [...validatorErrors, ...erroresSequelize];

            req.flash('error', erroresGenerales);
        }
        res.redirect('/crear-cuenta');
    }

}

exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesion'
    })
}
