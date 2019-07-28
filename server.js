// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");


// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

var db = require('./models');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://homework:homework1@ds255577.mlab.com:55577/heroku_8xxwfssd";
mongoose.connect(MONGODB_URI);


//utilize handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./controllers/apiRoutes")(app);
require("./controllers/htmlRoutes")(app);

// Listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });

  module.exports = app;