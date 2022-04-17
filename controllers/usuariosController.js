const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear tu  Cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;
    const nuevoUsuario = await Usuarios.create(usuario);

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