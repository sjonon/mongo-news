module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
    });
    app.get("/all", function(req, res){
        res.render("index")
    })
    // Grab the articles as a json
    // $.getJSON("/articles", function(data) {
    //     // For each one
    //     for (var i = 0; i < data.length; i++) {
    //     // Display the apropos information on the page
    //     $("#article").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link +"<br />" + data[i].photo +"</p>");
    //     }
    // });






}


