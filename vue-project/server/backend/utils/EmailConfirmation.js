/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


//Generates the Token
const generateToken = (user) => {
    const SECRET = "6acff9bc63433db6e5492b75b85232b976a1b63f6afb4800552cc541c93ac6dd801e358f224b00425aaa82af5d9c387550e26764323b4c67055fd5205d5adaad";
    // console.log('JWT_SECRET:', process.env.JWT_SECRET);
    return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
};

export const sendEmail = async (userEmail, userId) => {
    const token = generateToken({ id: userId, email: userEmail });

    const confirmURL = `http://localhost:3000/confirm/${token}`;

    const sender = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mercado.colegial802@gmail.com',
            pass: 'ltcdkpgbragntukx',
        },
    });

const mailOptions = {
    from: '"Mercado Colegial" <mercado.colegial802@gmail.com>',
    to: userEmail,
    subject: 'Confirmación de Registro - Cuenta de Mercado Colegial Online',
    html: `
      <h1>Bienvenido al Mercado Colegial Online!</h1>
      <p>Gracias por registrarte. Por favor confirma tu cuenta haciendo clic en el enlace de abajo:</p>
      <a href="${confirmURL}">Confirmar mi cuenta</a>
      <p>Este enlace expira en una hora.</p> 
    `,
  };    

try {
    await sender.sendMail(mailOptions);
    console.log('Correo enviado');
}   catch (error){
    console.log('Error al enviar el correo', error);
}

};
