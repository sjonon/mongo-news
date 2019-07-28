//javascript for click handlers will go here
$(document).on("click", "#scrape", function(event){
    event.preventDefault();
    console.log("button clicked");
    $.ajax({
        method: "GET",
        url: "/all"
    })
    .then(function(data){
        console.log(data);
        for(var i = 0; i < data.length; i++){
          console.log(`${data[i].photo}`);
            $(".article").append( ` <div class="row">
            <div class="col s12 m7">
              <div class="card">
                <div class="card-image">
                  <img src="${ data[i].photo }">
                  <span class="card-title"> ${ data[i].title }</span>
                </div>
                <div class="card-content">
                  <p>${data[i].summary}</p>
                </div>
                <div class="card-action">
                  <a href="${data[i].link}">Read Article</a>
                  <btn class="save" data-id=${data[i]._id}>SAVE ARTICLE</btn>
                </div>
              </div>
            </div>
          </div>`)
        }
    })
});

//save article button clicked
$(document).on("click", ".save", function(){
  let id = $(this).data("id");
  let fav = $(this).data("saved");
  console.log(id);
  $.ajax({
    method: "PUT",
    url: "/saved/" +id,
    data: id
  })
  .then(function(data){
    console.log(data);
    db.Article.findOneAndUpdate({ _id: id}, {$push: { saved: true}});
  })
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
  });

  $(document).on("click", "#clear", function(){
    $(".article").empty();
  });