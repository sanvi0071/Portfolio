const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse incoming requests as JSON
app.use(cors()); // Enable CORS

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanvi0071@gmail.com', // Developer's Gmail address
    pass: 'xbhfndixvfabiuhu' // Developer's Gmail app-specific password
  }
});

// Handle the form submission
app.post('/process-form', (req, res) => {
  const { name, email, message } = req.body;

  // Validate the incoming request data
  if (!name || !email || !message) {
    return res.status(400).send('Name, email, and message are required.');
  }

  // Set up the email options
  const mailOptions = {
    from: email, // Email of the person submitting the form
    to: 'sanvi0071@gmail.com', // Developer's email to receive the message
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Sorry, something went wrong. Please try again.');
    }
    console.log('Email sent:', info.response);
    res.send('Thank you for your message. It has been sent.');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
