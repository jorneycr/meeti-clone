const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');

//configuracion y modelos BD
const db = require('./config/db');
require('./models/Usuarios');
db.sync().then(() => console.log('DB conectada')).catch((error) => console.log(error));

//variables de desarrollo
require('dotenv').config({ path: 'variables.env' });

//aplicacion principal 
const app = express();

//body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//habilitar EJS como template engine
app.use(expressLayouts)
app.set('view engine', 'ejs');

//ubicacion vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//middleware (usuario logueado,  flash messages, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//routing
app.use('/', router());

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionado");
})