const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const Product = require('./models/Product');

// import multer for file upload
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // where to save the file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));//file name
  }
});

const upload = multer({ storage: storage });


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //Connect to public

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

//Connect testing! change to home when ready
app.get('/', (req, res) => {
  res.render('products', 
  {title: 'Products'});
});

app.get('/products', (req, res) => {
  res.render('products', 
  {title: 'Products'});
});

app.get('/contact', (req, res) => {
  res.render('contact', 
  {title: 'Contact'});
});


const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connecting to DB with URI:', dbURI);


//show the admin page when user goes to /admin
app.get('/admin', async (req, res) => {
  try {
    //get all products from the database
    const products = await Product.find();

    //show the admin.handlebars page
    //convert products to simple objects so Handlebars can read them
    res.render('admin', {
      title: 'Admin Panel',
      products: products.map(p => p.toObject())
    });
  } catch (err) {
    //if something goes wrong, show error message
    console.error('Error loading admin panel:', err);
    res.status(500).render('admin', {
      title: 'Error',
      error: 'Could not load admin panel'
    });
  }
});

//show the login page when user goes to /admin/login
app.get('/admin/login', (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
});


//when the form on the admin page is submitted this route runs
app.post('/admin', upload.single('productImage'), async (req, res) => {
  //get data from the form
  const { name, price, category } = req.body;
  const imageUrl = req.file ? '/images/' + req.file.filename : ''; //use multer to get the file name and path
  //create a new product with the form data
  const newProduct = new Product({
    name,
    price,
    category,
    imageUrl,
    inStock: req.body.inStock === 'on' // checkbox returns 'on' if checked
  });

  try {
    //save the product to the database
    await newProduct.save();

    //redirect back to the admin page to see the new product
    res.redirect('/admin');
  } catch (err) {
    //if something goes wrong show error on the page
    console.error('Error saving product:', err);
    res.status(400).render('admin', {
      title: 'Admin Panel',
      error: 'Product creation failed'
    });
  }
});

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

// all phones in the shop
app.get('/allproducts/phones', async (req, res) => {
  try {
    //get all phones from the database
    const phones = await Product.find({category : "phone"});

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

// all tamagotchis in the shop
app.get('/allproducts/tamagotchis', async (req, res) => {
  try {
    //get all tamagotchis from the database
    const tamagotchis = await Product.find({category : "tamagotchi"});

    //change the mongoose documents to an object for js-functions
    res.render('allproducts', {
      title: 'Shop',
      products: tamagotchis.map(p => p.toObject())
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

// all ringtones in the shop
app.get('/allproducts/ringtones', async (req, res) => {
  try {
    //get all ringtones from the database
    const ringtones = await Product.find({category : "ringtone"});

    //change the mongoose documents to an object for js-functions
    res.render('allproducts', {
      title: 'Shop',
      products: ringtones.map(p => p.toObject())
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

// all cameras in the shop
app.get('/allproducts/cameras', async (req, res) => {
  try {
    //get all cameras from the database
    const cameras = await Product.find({category : "camera"});

    //change the mongoose documents to an object for js-functions
    res.render('allproducts', {
      title: 'Shop',
      products: cameras.map(p => p.toObject())
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