/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


//Generates the Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, import.meta.env.JWT_SECRET, { expiresIn: '1h' });
};

const sendEmail = async (userEmail, userId) => {
    const token = generateToken({ id: userId, email: userEmail });

    const confirmURL = `http://localhost:5173/confirm/${token}`;

    const sender = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

const mailOptions = {
    from: '"Mercado Colegial Colegial" <mercado.colegial802@gmail.com>',
    to: userEmail,
    subject: 'Confirmación de Registro - Cuenta de Mercado Colegial Online',
    html: `
      <h1>Bienvenido al Mercado Colegial Online!</h1>
      <p>Gracias por registrarte. Por favor confirma tu cuenta haciendo clic en el enlace de abajo:</p>
      <a href="${confirmationUrl}">Confirmar mi cuenta</a>
      <p>Este enlace expira en ? horas.</p> 
    `,
  };    

try {
    await sender.sendMail(mailOptions);
    console.log('Correo enviado');
}   catch (error){
    console.log('Error al enviar el correo', error);
}

};
