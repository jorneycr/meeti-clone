const express = require('express');
const path = require('path');
const router = require('./routes');

require('dotenv').config({ path: 'variables.env' });

const app = express();

//habilitar EJS como template engine
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