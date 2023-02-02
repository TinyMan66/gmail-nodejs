const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const port = process.env.PORT || 3010;
const smtp_login = process.env.SMTP_LOGIN;
const smtp_password = process.env.SMTP_PASSWORD;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: smtp_login,
        pass: smtp_password
    },
});


app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/sendMessage', async (req, res) => {

    let {email, message, name} = req.body;

    // send mail with defined transport object
    await transporter.sendMail({
        from: 'Portfolio contact form', // sender address
        to: 'altere2804@gmail.com', // list of receivers
        subject: 'Portfolio',
        html: `<b>Message from your Portfolio page</b>
               <div>Name: ${name}</div>
               <div>e-mail: ${email}</div>
               <div>Message: ${message}</div>`,
    });

    res.send('OK');
});

app.listen(port, () => {
    console.log(`email-nodejs app listening on port ${port}`);
});