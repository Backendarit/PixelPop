const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();


//Contact page root
const getContact = async (req,res) => {
    try {
        res.status(200).render('contact', {
            title: 'Contact', 
            formData: {} });
      } 
      catch (err) {
        console.error('Error loading Contact page:', err);
        res.status(500).render('contact', {
          title: 'Error',
          error: 'Could not load Contact page'
        });
      }
}

//Contact form Validation & Sanitation
const validateForm = [ 
    body('name').trim().matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Name can only contain letters or spaces.').escape(),
    body('email').trim().normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('subject').trim().isLength({ max: 100 }).withMessage('Subject must be under 100 characters long').escape(),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters').isLength({ max: 1000 }).withMessage('Message must be under 1000 characters').escape()
    ];

//Contact form Submission Process
const submitContact = async (req,res) => {
console.log('Form body:', req.body);
//console.log(errors.array())
    const errors = validationResult(req);
//Info about errors
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).render('contact', { 
          errors: errors.array(), 
          formData: req.body 
        });
    };

//For Nodemailer
    const { name, email, subject, message } = req.body;
    //SMPT Connection to gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
// Form message for Pixelpop
    const mailOptions = {
        from: `"Pixel Pop Contact Form"`,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: subject,
        text: `Message from ${name} <${email}>:\n\n${message}`
    };
//Generic answer to client
    const clientMailOptions = {
        from: `"Pixel Pop" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting us!',
        text: `Hello ${name}!\n\n We have received your message and will get back to you as soon as we can.\n\n Wish you all the best,\n Pixel Pop Cuties`
    };
//Notification for terminal if emails are send
    try {
        const sentToPixelPop = await transporter.sendMail(mailOptions);
        console.log('Email sent to Pixel Pop:', sentToPixelPop.response);
    
        const sentToClient = await transporter.sendMail(clientMailOptions);
        console.log('Acknowledgement email sent to client:', sentToClient.response);
//Succesfull info    
        res.status(200).render('contact', {
          success: "Your message has been sent!",
          formData: {}
        });
      } catch (err) {
        console.error('Email sending error:', err);
        res.status(500).render('contact', {
          error: "There was an error sending your message.",
          formData: req.body
        });
      }
};

//Export modules
module.exports = {getContact, validateForm, submitContact}