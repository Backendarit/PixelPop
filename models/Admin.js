const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //for hashing passwords

//admin schema for login
const AdminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  //hash the password before saving
AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

//compare password for login
AdminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
  module.exports = mongoose.model('Admin', AdminSchema);