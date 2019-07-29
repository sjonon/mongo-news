$(document).ready(function () {


    function savedArticles() {
        $.ajax({
            method: "GET",
            url: "/savedarticles",
        })
            .then(function (data) {
                console.log(data);
                $(".savedarticle").empty();
                for (i = 0; i < data.length; i++) {
                    $(".savedarticle").append(` <div class="row">
              <div class="col s12 m7">
              <div class="card">
              <div class="card-image">
              <img src="${ data[i].photo}">
              <span class="card-title"> ${ data[i].title}</span>
              </div>
              <div class="card-content">
              <p>${data[i].summary}</p>
              </div>
              <div class="card-action">
              <a href="${data[i].link}">Read Article</a>
              <btn class="save" data-id=${data[i]._id}>DELETE ARTICLE</btn>
              <button data-target=${data[i]._id} class="btn modal-trigger">SAVE NOTE</button>
              <div id=${data[i]._id} class="modal">
              <div class="modal-content">
              <h4>Add Note</h4>
              <p>A bunch of text</p>
              </div>
              <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">SAVE</a>
              </div>
              </div>
                </div>
                </div>
                </div>
                </div>
               `
                )
                }
            })
    };
    savedArticles();

    $('.modal').modal();

    // $(".note").on("click", function () {
    //     instance.open();
    // })
})