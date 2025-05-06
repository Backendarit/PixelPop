const mongoose = require('mongoose');
//What information is used and collected to database
const statsSchema = new mongoose.Schema({
  heartClicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Stats', statsSchema);