const Product = require('../models/Product');


// all products in the shop
exports.getAllProductsPage = async (req, res) => {
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
}; 



// all specific items in the shop
exports.getProductsByCathegory = async (req, res) => {

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
  };
  
  // add to the cart