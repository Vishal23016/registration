let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');

let sendEmail = (email,link)=>{
	console.log('send email',email,link);
	let templateName = `<html><body><p><a href="${link}" target="_blank">Verify Email</a></body></p></body></html>`;
   var transporter = nodemailer.createTransport(smtpTransport({
      host: 'smtp.gmail.com',
      port: '587',
      auth: {
          user: 'test@test.com',
          pass: 'test123@#'
      }
 	}));
    // setup e-mail data with unicode symbols
   var mailOptions = {
    	from: `test@test.com`, // sender email
    	to: email, // receiver email
    	subject: 'email verify', // Subject line
    	html: templateName // html templete
	};
	console.log('htmlTemplate',templateName);

	transporter.sendMail(mailOptions,  (error, info) => {
       if (error) {
          console.log(error);
	   }
   });
}

module.exports = {
	sendEmail
}