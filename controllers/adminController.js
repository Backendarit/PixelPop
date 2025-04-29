const Product = require('../models/Product');

//show the admin page when user goes to /admin
exports.getAdminPage = async (req, res) => {
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
};

//show the login page when user goes to /admin/login
exports.getLoginPage = (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
};

//when the form on the admin page is submitted this route runs
exports.postAddProduct = async (req, res) => {
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
};

// update product
exports.getEditProduct = async (req, res) => {
  // get id from url
  const idUpdatingItem = req.params.id;
  try {
    //get old info from database
    const itemToUpdate = await Product.findById(idUpdatingItem);
    
    // deliver old info to the form
    res.render('editproduct', {
      title: 'Edit',
      products: itemToUpdate.toObject()
    });
  } catch (err) {
    //if something goes wrong, show error message
    console.error('Error loading item:', err);
    res.status(500).render('editproduct', {
      title: 'Error',
      error: 'Could not load item'
    });
  }
};

// update edited item to database
exports.postUpdateProduct = async (req, res) => {
  // get id from url
  const idUpdatingItem = req.params.id;

  //collect new info from the product given in the form
  const editedName = req.body.name;
  const editedPrice = req.body.price;
  const editedCategory = req.body.category;
  const editedImageUrl = req.file ? '/images/' + req.file.filename : '';
  //const editedInStock = req.body.inStock;

  try {
    //save the product to the database
    await Product.updateOne(
      { _id: idUpdatingItem },
      { $set: { name: editedName, price: editedPrice, category: editedCategory, imageUrl: editedImageUrl } }
    );

    //redirect back to the admin page to see the new product
    res.redirect('/admin');
  } catch (err) {
    //if something goes wrong show error on the page
    console.error('Error updating product:', err);
    res.status(400).render('admin', {
      title: 'Admin Panel',
      error: 'Updating product failed'
    });
  }
};
