// Add only the connections that you need
const express = require('express');
const exphbs = require('express-handlebars');

//Function to handle the router
const router = express.Router();

//Connect to Controller
const contactController = require('../controllers/contactController');

//Connect to Contact Page through controller (app->router) 
router.get('/contact', contactController.getContact); 

//Contact form Submission Process through controller (app->router) 
router.post('/contact', contactController.validateForm, contactController.submitContact
  );

//Export the module
module.exports = router;