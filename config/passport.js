const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');

module.exports = function(passport) {
    //use local strategy for authentication
    passport.use(new LocalStrategy({
      usernameField: 'user_name',
      passwordField: 'pass_word'
    },
    async (username, password, done) => {
      try {
        const user = await Admin.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: 'Login failed: Incorrect username or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Login failed: Incorrect username or password' });
        }
    
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }));
    
  
//save user ID to session
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    //get user by ID from session
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await Admin.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
  };