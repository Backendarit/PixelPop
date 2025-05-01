//ensure user is authenticated before allowing access to admin page

module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // user is logged in
    }
    res.redirect('/admin/login'); // redirect to login if not logged in
  };
  