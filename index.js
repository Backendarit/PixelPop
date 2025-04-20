const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');



const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connecting to DB with URI:', dbURI);


mongoose.connect(dbURI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening to " + PORT));
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });