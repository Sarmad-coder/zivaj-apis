const dbConfig = require('../config/dbConfig.js')
const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: dbConfig.EMAIL,
        pass: dbConfig.PASS
    }
});




const sendEmail = async (req, res, next, options) => {
    try {
        const { to, subject, body } = req.body;
        
        const op={
            from: 'your-email@example.com',
            to,
            subject,
            text: body,
        }
        
        // Send the email
        await transporter.sendMail(options);

        next();
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = sendEmail;



const sendMail = async (req, res, cb) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: dbConfig.EMAIL,
            pass: dbConfig.PASS
        }
    })

    const mailOptions = {
        from: dbConfig.EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html
    }





    try {
        transporter.sendMail(mailOptions, cb)
        console.log('Sending email successfully');
    }
    catch (error) {
        console.log('Sending email failed');
        console.log(error);
        throw error
    }


}


module.exports = {
    sendMail
}
