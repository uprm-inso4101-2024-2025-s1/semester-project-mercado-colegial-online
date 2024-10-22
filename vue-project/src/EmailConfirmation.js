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




    //le falta a la funcion ! ! !


};
