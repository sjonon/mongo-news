module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
    });
    app.get("/all", function(req, res){
        res.render("index")
    })
    
    //saved
    app.get("/saved", function(req, res){
        res.render("index")
    })





}


