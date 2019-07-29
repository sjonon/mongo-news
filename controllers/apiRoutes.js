var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function (app) {

    app.get("/all", function (req, res) {
        db.Article.find({}, function (error, found) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(found)
            }
        })
    });

    app.get('/scrape', function (req, res) {
        axios.get("https://www.nytimes.com/section/arts").then(function (res) {

            var $ = cheerio.load(res.data);
            var results = {};
            $("article.story").each(function (i, element) {
                results.title = $(this).children("div.story-body").children("h2.headline").text();
                results.summary = $(this).children("div.story-body").children("p.summary").text();
                results.link = $(this).children("figure").children("a").attr("href");
                results.photo = $(this).children("figure").children("a").children("img").attr("src")
                if (results.title && results.link && results.summary) {
                    // //  article.create or something similar
                    db.Article.create(results)
                        .then(function (dbArticle) {
                            console.log("dbArticle: " + dbArticle);
                        })
                        .catch(function (error) {
                            res.status(500).send(error);
                            console.log(error)
                        })
                }
            })
        });
        res.send("Scrape Complete");
    });

    //saved -updating the article to be saved
    app.put("/saved/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then(function (data) {
                console.log("save button click" + data);
                db.Article.findOneAndUpdate({ _id: id }, { $push: { saved: true } });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    //find saved articles
    app.get("/savedarticles", function (req, res) {
        db.Article.find( { saved: true })
        .then( function (dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err)
        });
    });

    //remove article from saved article
    app.put("/removearticles/:id", function(req, res){
        console.log("Updating: " + req.params.id);
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
        res.status(200);
      })

      app.post("/note/:id", function(req, res){
        db.Note.create(req.body);
        db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function(dbNote){
          return db.Article.updateOne({ _id: req.params.id }, {$push: {note: dbNote._id}}, { new: true })
        })
        .then(function(dbArticle){
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
      })

      app.get("/note/:id", function(req, res){
          db.Article.findOne({_id: req.params.id})
        .then(function(dbArticle){
          res.json(dbArticle)
      })
    })
}
