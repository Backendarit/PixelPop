const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

const rateLimit = require('express-rate-limit');


const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res, next) => {
    req.session.error = 'Too many login attempts. Try again in a minute.';
    return res.redirect('/admin/login');
  }
});



//show login page
router.get('/login', adminAuthController.getLoginPage);

//handle login form submission
router.post('/login', loginLimiter, adminAuthController.postLogin);

//handle logout
router.get('/logout', adminAuthController.logout);

module.exports = router;
