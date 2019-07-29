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
              <div class="card" id=${ data[i]._id}>
              <div class="card-image">
              <img src="${ data[i].photo}">
              <span class="card-title grey"> ${ data[i].title}</span>
              </div>
              <div class="card-content">
              <p>${data[i].summary}</p>
              </div>
              <div class="card-action">
              <a href="${data[i].link}">Read Article</a>
              <btn class="delete" data-id=${data[i]._id}>DELETE ARTICLE</btn>
              <button type="button" class="btn btn-primary note" data-toggle="modal" id=${data[i]._id} data-target=${data[i]._id}>SAVE NOTE</ button>
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



    $(document).on("click", ".delete", function(){
        let id = $(this).data("id");
        //update the DB
        $.ajax({
          method: "PUT",
          url: "/removearticles/" + id
        })
        //then remove the card
        savedArticles();
        // $("#"+id).remove();
    })

    $(document).on("click", ".note", function () {
        var artId = $(this).data("target");
        console.log(artId);
        $.ajax({
            method: "GET",
            url: "/note/"+artId
        }).then(function(data){
            console.log(data)
            if(data.note){
                $("#noteText").val("Saved Notes: " + data.note.body);
            }
        })
        //populate and show a modal to allow user to enter/edit note
          $("#noteModal").modal("show");
          $("#saveNote").on("click", function(){
            $.ajax({
                method: "POST",
                url: "/note/" + artId,
                data: {
                  body: $("#noteText").val()
                }
              })
              .then(function(data){
                console.log("Note saved: " + data);
                $("#noteText").val("");
             })
        })
        })


    
})
