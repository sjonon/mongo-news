postNews();

function postNews() {
  $.ajax({
    method: "GET",
    url: "/all"
  })
    .then(function (data) {
      console.log("postNews fn: " + data);
      for (var i = 0; i < data.length; i++) {
        $(".article").append(` <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="${ data[i].photo}">
              <span class="card-title grey"> ${ data[i].title}</span>
            </div>
            <div class="card-content">
              <p>${data[i].summary}</p>
            </div>
            <div class="card-action">
              <a href="${data[i].link}">Read Article</a>
              <button class="save" data-id=${data[i]._id}>SAVE ARTICLE</button>
            </div>
          </div>
        </div>
      </div>`)
      }
    })
};
//javascript for click handlers will go here
$(document).on("click", "#scrape", function (event) {
  event.preventDefault();
  console.log("button clicked");
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function () {
      postNews();
    });
});

//save article button clicked
$(document).on("click", ".save", function () {
  let id = $(this).data("id");
  let fav = $(this).data("saved");
  console.log(id);
  $.ajax({
    method: "PUT",
    url: "/saved/" + id,
    data: id
  })
    .then(function (found) {
      console.log(found)
    });
});

$(document).on("click", "#clear", function () {
  $(".article").empty();
});



