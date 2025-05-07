//ensure user is authenticated before allowing access to admin routes
module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is logged in, allow access
  }

  //save error message to show on login page
  req.session.error = 'Your session has expired. Please log in again.';
  res.redirect('/admin/login'); // Redirect to login page
};
