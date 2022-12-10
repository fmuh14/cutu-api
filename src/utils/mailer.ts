//Require npm
// const nodemailer = require('nodemailer');
import * as nodemailer from 'nodemailer';
// const ejs = require('ejs');
import * as ejs from 'ejs';
import * as fs from 'fs';
import 'dotenv/config'

//import template email html
const template = fs.readFileSync("D:/Project/javascript-projects/CuTu-app/CuTu-backend/src/template-email/template-email.html", 'utf8');

//Setting email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  //email dan password
  auth: {
    user: "gamespay404@gmail.com",
    pass: "cutuapp321"
  }
});

//Function untuk mengirim kode voucher ke email
export const sendLupaPassword = async (data) => {
  let mailOptions = {
    from: 'gamespay404@gmail.com',
    to: data.email,
    subject: 'Lupa Password Akun CuTu',
    //Mengirim template email beserta datanya
    html: ejs.render(template, {
      passwordBaru: data.passwordBaru,
    })
  };

  //Send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email Sent :' + info.response);
  });
}

const data = {
  email: "ferdimuh12@gmail.com",
  passwordBaru: "LALALALALALA"
}
sendLupaPassword(data)