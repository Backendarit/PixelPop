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
app.use(express.json());
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
const shopRoutes = require('./routes/shopRoutes');

//import models
const Product = require('./models/Product');



//Routes
app.use('/',require('./routes/homeRoutes'))//Homepage
app.use('',require('./routes/contact'))//Contact
app.use('/admin', adminRoutes); //admin product management
app.use('/admin', adminAuthRoutes); //admin login and logout
app.use('/allproducts', shopRoutes); //Shop
app.use((req, res) => {//404 must be last!
  res.status(404).render('404', { title: 'Page Not Found' });
});


//Connect to handelbars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');



//Mongo DB connection
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connecting to DB with URI:', dbURI);


mongoose.connect(dbURI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening to " + PORT));
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });