const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html
    });

    console.log('Email Sent:', response);
  } catch (error) {
    console.error('Error to send Email:', error.message);
  }
};

module.exports = sendEmail;
