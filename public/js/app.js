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
                </div>
              </div>
            </div>
          </div>`)
        }
    })
})