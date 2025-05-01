const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const path = require('path');

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

//admin routes
router.get('/', ensureAuthenticated, adminController.getAdminPage);
router.post('/', ensureAuthenticated, upload.single('productImage'), adminController.postAddProduct);
router.get('/edit/:id', ensureAuthenticated, adminController.getEditProduct);
router.post('/update/:id', ensureAuthenticated, upload.single('productImage'), adminController.postUpdateProduct);
router.post('/delete/:id', ensureAuthenticated, adminController.deleteProduct);


module.exports = router;