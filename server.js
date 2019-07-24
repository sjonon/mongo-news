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

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//database connection
var db = mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });

//   // Hook mongojs configuration to the db variable
// var db = mongoose(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    res.render("index");
});

app.get('/all', function(req, res){
    db.scrapedData.find({}, function(error, found){
      if(error){
        res.status(500).send(error);
      } else {
        res.json(found)
      }
    })
});

app.get('/scrape', function(req, res){
    axios.get("https://news.ycombinator.com").then(function(response){
      res.send(response.data)
      var $ = cheerio.load(response.data);
      $(".headline > a").each(function(i, element){
        var title = $(element).text();
        var link = $(element).attr("href")
        if (title && link){
          db.scrapedData.insert({
            title,
            link
          }, function(err, inserted){
            if(err){
              console.log(err)
            }
          })
        }
      })
    })
  })

// Listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });