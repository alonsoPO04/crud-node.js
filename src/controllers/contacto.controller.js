const nodemailer = require('nodemailer');

const index = (req, res) => {
    res.render('contacto');
 };

 const submit = async (req, res) => {
    console.log(req.body);

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
    // Looking to send emails in production? Check out our Email API/SMTP product!
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    try {
        const info = await transporter.sendMail({
            from:  `"${req.body.nombre}" <${req.body.correo}>`,
            to: "bar@example.com, baz@example.com",
            subject: "Formulario de Contacto",
            text:req.body.mensaje, // plain‑text body
            html: `<pre>${req.body.mensaje}</pre>`, // HTML body
        });
        
        console.info(info);
    } catch (error) {
        console.error(error);
    }



    // Aquí podrías manejar el envío del formulario, por ejemplo, guardar los datos o enviar un correo.
    res.send('Formulario de contacto enviado con éxito.');
 }

 

module.exports = {
    index,
    submit
};