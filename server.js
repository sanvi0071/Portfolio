const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(bodyParser.json()); 
app.use(cors()); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS   
  }
});

// Handle form submission via POST request
app.post('/process-form', (req, res) => {
  const { name, email, message } = req.body;

  // Validate the incoming request data
  if (!name || !email || !message) {
    return res.status(400).send('Name, email, and message are required.');
  }

  // Define the email options
  const mailOptions = {
    from: email, // The sender's email (user's email)
    to: process.env.EMAIL_USER, 
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Sorry, something went wrong. Please try again.');
    }
    console.log('Email sent:', info.response);
    res.send('Thank you for your message.');
  });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
