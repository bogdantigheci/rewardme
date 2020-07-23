const mailer = require('nodemailer');
require('dotenv').config();
const { welcome } = require('./welcome');

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case 'welcome':
      data = {
        from: 'Work Points <racingpigeonsbt@gmail.com>',
        to,
        subject: `Welcome to Work Points ${name}`,
        html: welcome(),
      };
      break;

    default:
      return data;
  }

  return data;
};

const sendEmail = (to, name, token, template, actionData = null) => {
  smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, null, template, actionData);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      cb();
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };
