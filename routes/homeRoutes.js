const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//get featured 2 items for home page
router.get('/', async (req, res) => {
    try {
      const featuredProducts = await Product.find().limit(2);
      res.render('home', {
        title: 'Welcome to Pixel Pop',
        featured: featuredProducts.map(p => p.toObject())
      });
    } //Error info
    catch (err) {
      console.error('Error loading homepage:', err);
      res.status(500).render('error', {
        title: 'Error',
        error: 'Failed to load homepage'
      });
    }
  });

  module.exports = router;
  