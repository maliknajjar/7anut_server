var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    tls: {
        rejectUnauthorized: false
    },
    secure: true,
    auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASS,
    }
});

module.exports = (toEmail, subject, html) => {
    var mailOptions = {
        from: process.env.SMTPUSER,
        to: toEmail,
        subject: subject,
        html: html,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}