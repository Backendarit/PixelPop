// Add only the connections that you need
const express = require('express');
const exphbs = require('express-handlebars');
const { body, validationResult } = require('express-validator');


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

//Contact form Submission Process
const submitContact = (req,res) => {
      const errors = validationResult(req);
  //Info about errors
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).render('contact', { 
          errors: errors.array(), 
          formData: req.body 
        });
      }
  //Succesfull 
      console.log("Contact Form Submission:", req.body);
      res.status(201).render('contact', { 
        success: "Your message has been sent!",
        formData: {} 
      });      
}

//Export modules
module.exports = {getContact, submitContact}