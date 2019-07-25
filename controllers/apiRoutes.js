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
                            console.log(dbArticle);
                        })
                        .catch(function (error) {
                            res.status(500).send();
                            console.log(error)
                        })
                }
            })
        });
        res.send("Scrape Complete");


    });

}
