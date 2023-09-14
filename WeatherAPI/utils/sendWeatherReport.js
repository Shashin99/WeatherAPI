const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../models/User');
const fetchWeatherData = require('../utils/fetchWeatherData');

const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "login",
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }
});

// Schedule the email sending task every hour
cron.schedule('0 * * * *', async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const weatherData = await fetchWeatherData(user.location);

      // Create and send an email with the weather data
      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: 'Hourly Weather Report',
        text: `Current weather in ${user.location}: ${weatherData.main.temp}°C`,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error sending hourly weather report:', error);
  }
});
