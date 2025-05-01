const passport = require('passport');
const { body, validationResult } = require('express-validator');

//show login page
exports.getLoginPage = (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
};

//handle login POST
exports.postLogin = [
  // Validate and sanitize input
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .escape(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required.')
    .escape(),

  //middleware function to handle result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin-login', {
        title: 'Admin Login',
        errors: errors.array()
      });
    }

    //use custom callback for better error handling
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        //show error in UI if login failed
        return res.render('admin-login', {
          title: 'Admin Login',
          errors: [{ msg: info.message || 'Invalid credentials' }]
        });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect('/admin');
      });
    })(req, res, next);
  }
];

//handle logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/admin/login');
  });
};

