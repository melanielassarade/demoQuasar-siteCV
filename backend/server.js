const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
host: 'smtp.mailtrap.io',
port: 2525,
auth: {
    user: '',
    pass: ''
}
});

app.post('/send-email', (req, res) => {
const { name, email, customText } = req.body;

const mailOptions = {
    from: email,
    to: 'melanie.lassarade@gmail.com',
    subject: 'Nouveau message depuis le formulaire de contact du site CV',
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${customText}`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
    } else {
    console.log('E-mail envoyé:', info.response);
    res.status(200).send('E-mail envoyé avec succès');
    }
});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Serveur démarré sur le port ${PORT}`);
});
