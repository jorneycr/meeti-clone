const nodemailer = require('nodemailer');
const emailConfig = require('../config/emails');
const util = require('util');
const htmlToText = require('html-to-text');

const ejs = require('ejs');

let transport = nodemailer.createTransport({
    host : emailConfig.host,
    port : emailConfig.port, 
    auth: {
        user: emailConfig.user, 
        pass: emailConfig.pass
    }
});

// generar HTML
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}
exports.enviarEmail = async (opciones) => {
    const html = generarHTML(opciones.archivo, opciones );
    const text = htmlToText.htmlToText(html);
    let opcionesEmail = {
        from: 'UpTask <no-reply@uptask.com>',
        to: opciones.usuario.email, 
        subject: opciones.subject,
        text, 
        html
    };

    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, opcionesEmail)
}