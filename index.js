const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes');

//configuracion y modelos BD
const db = require('./config/db');
require('./models/Usuarios');
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error))

//variables de desarrollo
require('dotenv').config({ path: 'variables.env' });

//aplicacion principal 
const app = express();

//body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// ***Agregamos express validator a toda la aplicación
app.use(expressValidator());

//habilitar EJS como template engine
app.use(expressLayouts)
app.set('view engine', 'ejs');

//ubicacion vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//habilitar cookie parser
app.use(cookieParser());

//crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

//agrega flash messages
app.use(flash());

//middleware (usuario logueado,  flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//routing
app.use('/', router());

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionado");
})