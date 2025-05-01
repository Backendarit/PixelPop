const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');


//shop routes
router.get('/', shopController.getAllProductsPage);
router.get('/findbycategory', shopController.getProductsByCathegory);

module.exports = router;