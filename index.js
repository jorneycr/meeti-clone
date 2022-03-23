const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const router = require('./routes');

require('dotenv').config({ path: 'variables.env' });

const app = express();

//habilitar EJS como template engine
app.use(expressLayouts)
app.set('view engine', 'ejs');

//ubicacion vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//routing
app.use('/', router());

app.listen(process.env.PORT, () => {
    console.log("Servidor funcionado");
})