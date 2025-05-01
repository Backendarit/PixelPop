const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const passport = require('passport');

//Create express app
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 


//ADMIN LOGIN
// Passport config
require('./config/passport')(passport);

//use express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());



//import routes
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');

//import models
const Product = require('./models/Product');




//Routes
app.use('',require('./routes/contact'))
app.use('/admin', adminRoutes); //admin product management
app.use('/admin', adminAuthRoutes); //admin login and logout



//Connect to handelbars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');



//Mongo DB connection
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connecting to DB with URI:', dbURI);



// all products in the shop
app.get('/allproducts', async (req, res) => {
  try {
    //get all products from the database
    const products = await Product.find();

    //change the mongoose documents to an object for js-functions
    res.render('allproducts', {
      title: 'Shop',
      products: products.map(p => p.toObject())
    });
  } catch (err) {
    //if something goes wrong, show error message
    console.error('Error loading shop:', err);
    res.status(500).render('allproducts', {
      title: 'Error',
      error: 'Could not load shop'
    });
  }
}); 

// all specific items in the shop
app.get('/allproducts/findbycategory', async (req, res) => {

  // get wanted category from url
  const urlCategory = req.query.category;
  
  try {
    //get all phones from the database
    const phones = await Product.find({category : urlCategory});

    //change the mongoose documents to an object for js-functions
    res.render('allproducts', {
      title: 'Shop',
      products: phones.map(p => p.toObject())
    });
  } catch (err) {
    //if something goes wrong, show error message
    console.error('Error loading shop:', err);
    res.status(500).render('allproducts', {
      title: 'Error',
      error: 'Could not load shop'
    });
  }
});

// add to the cart




mongoose.connect(dbURI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening to " + PORT));
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });