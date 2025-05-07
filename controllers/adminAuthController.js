const passport = require('passport');
const { body, validationResult } = require('express-validator');

//show login page
exports.getLoginPage = (req, res) => {
  // if user is already logged in, redirect to admin page
  if (req.isAuthenticated()) {
    return res.redirect('/admin');
  }

  const error = req.session.error;
  delete req.session.error;

  res.render('admin-login', {
    title: 'Admin Login',
    error 
  });
};



//handle login POST
exports.postLogin = [
  // Validate and sanitize input
  body('user_name')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .escape(),
  body('pass_word')
    .trim()
    .notEmpty().withMessage('Password is required.'),

  //middleware function to handle result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin-login', {
        title: 'Admin Login',
        errors: errors.array()
      });
    }

    //passport authentication
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        req.session.error = info.message || 'Login failed: Incorrect username or password';
        return res.redirect('/admin/login');
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
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.clearCookie('connect.sid'); // Poistaa session evästeen selaimesta
      res.redirect('/admin/login');
    });
  });
};


