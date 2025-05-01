const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

//show login page
router.get('/login', adminAuthController.getLoginPage);

//handle login form submission
router.post('/login', adminAuthController.postLogin);

//handle logout
router.get('/logout', adminAuthController.logout);

module.exports = router;
