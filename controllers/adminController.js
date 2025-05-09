const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const Stats = require('../models/Stats');

//show the admin page when user goes to /admin
exports.getAdminPage = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    //get all products and stats from the database
    const products = await Product.find();
    const stats = await Stats.findOne();

    //show the admin.handlebars page
    //convert products to simple objects so Handlebars can read them
    res.render('admin', {
      title: 'Admin Panel',
      products: products.map(p => p.toObject()),
      heartClicks: stats?.heartClicks || 0
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
exports.postAddProduct = [ 
  
  // validate, sanitize
  // trim whitespaces, check not empty, escape for transforming special HTML characters (XSS)
  body('name').trim().notEmpty().withMessage('Product name required.').escape(),
  body('price').trim().isNumeric().withMessage('Please give a price in numbers only.').escape(),
  body('category').trim().notEmpty().withMessage('Category required.').escape(),
  body('altText').trim().notEmpty().withMessage('Image description (alt text) is required.').isLength({ max: 100 }).withMessage('Alt text must be 100 characters or less.').escape(),

  
  async (req, res) => {
  //get data from the form
  const { name, price, category, altText } = req.body;
  const imageUrl = req.file ? '/images/' + req.file.filename : ''; //use multer to get the file name and path
  
  //create a new product with the form data
  const newProduct = new Product({
    name,
    price,
    category,
    imageUrl,
    altText,
    inStock: req.body.inStock === 'on' // checkbox returns 'on' if checked
  });

    // errors from validation
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(400).render('admin', {
          title: 'Admin Panel',
          // an array from validation errors and collecting only an error messages
          error: validationErrors.array().map(err => err.msg).join(', ')
        });
    }

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
}
];


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
exports.postUpdateProduct = [ 
  
  // validate, sanitize
  // trim whitespaces, check not empty/is numeric, escape for transforming special HTML characters (XSS)
  body('name').trim().notEmpty().withMessage('Product name required.').escape(),
  body('price').trim().isNumeric().withMessage('Please give a number.').escape(),
  body('altText').trim().notEmpty().withMessage('Image description (alt text) is required.').isLength({ max: 100 }).withMessage('Alt text must be 100 characters or less.').escape(),

  
  async (req, res) => {
    // get id from url
    const idUpdatingItem = req.params.id;

    //collect new info from the product given in the form
    const editedName = req.body.name;
    const editedPrice = req.body.price;
    const editedCategory = req.body.category;
    const editedImageUrl = req.file ? '/images/' + req.file.filename : '';
    const editedAltText = req.body.altText;
    const editedInStock = req.body.inStock === 'on';
    
  // errors from validation
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    return res.status(400).render('admin', {
        title: 'Admin Panel',
        // an array from validation errors and collecting only an error messages
        error: validationErrors.array().map(err => err.msg).join(', ')
      });
  }

    try {
      //save the product to the database
      if (!editedImageUrl && !editedCategory) {
        await Product.updateOne(
          { _id: idUpdatingItem },
          {
            $set: {
              name: editedName,
              price: editedPrice,
              inStock: editedInStock,
              altText: editedAltText
            }
          }
        );
      } else if (!editedCategory) {
        await Product.updateOne(
          { _id: idUpdatingItem },
          {
            $set: {
              name: editedName,
              price: editedPrice,
              imageUrl: editedImageUrl,
              inStock: editedInStock,
              altText: editedAltText
            }
          }
        );
      } else if (!editedImageUrl) {
        await Product.updateOne(
          { _id: idUpdatingItem },
          {
            $set: {
              name: editedName,
              price: editedPrice,
              category: editedCategory,
              inStock: editedInStock,
              altText: editedAltText
            }
          }
        );
      } else {
        await Product.updateOne(
          { _id: idUpdatingItem },
          {
            $set: {
              name: editedName,
              price: editedPrice,
              category: editedCategory,
              imageUrl: editedImageUrl,
              inStock: editedInStock,
              altText: editedAltText
            }
          }
        );
      }
      
 
    //redirect back to the admin page to see the new product
    const products = await Product.find();
    res.status(200).render('admin', {
      title: 'Admin Panel',
      products: products.map(p => p.toObject()),
      success: 'Product has been updated successfully.'
    });
  } catch (err) {
    //if something goes wrong show error on the page
    console.error('Error updating product:', err);
    res.status(400).render('admin', {
      title: 'Admin Panel',
      error: 'Updating product failed'
    });
  }
}
];

//Delete Product
exports.deleteProduct = async (req, res) => {
  //Delete product by product id
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) { //Error when product cannot be found
      const products = await Product.find();
      return res.status(404).render('admin', {
        title: 'Admin Panel',
        products: products.map(p => p.toObject()),
        error: 'Product not found or already deleted.'
      });
    }
    //Deletion is succesfull
    const products = await Product.find(); //show products
    res.status(200).render('admin', {
      status: 'deleted',
      products: products.map(p => p.toObject()),
      success: 'Product has been deleted successfully.'//Pop-up success message
    });
  } 
  //Error information upon other fail
  catch (err) {
    console.error('Error deleting product:', err);
    const products = await Product.find();
    res.status(500).render('admin', {
      title: 'Admin Panel',
      products: products.map(p => p.toObject()),
      error: 'Unexpected error occurred while deleting product.'
    });
  }
};

//Heart stat counter
exports.heartClicks = async (req, res) => {
  try {
    const stat = await Stats.findOne() || new Stats();
    stat.heartClicks += 1;
    await stat.save();
    res.status(200);
  } 
  catch (err) {
    console.error('Heart click error:', err);
    res.status(500);
  }
}

