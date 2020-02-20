

// ==========CLick Function================
$("#search-form").on("submit", function (event) {
    event.preventDefault();
    console.log("clicked")
    // ==========YOUTUBE API================
    let apiKey = "AIzaSyDkIGQJd6UBEld0eEES9VOybmaAnp2jtqQ";
    let basketballPlayerInput = $("#input-value").val()

    let queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=" + basketballPlayerInput + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.items)
        $("#youtube-display").empty();
        for (let i = 0; i < response.items.length; i++) {


            // console.log(response);
            // console.log(response.items[i].id.videoId)


            let youtubeURL = "https://www.youtube.com/embed/"
            let videoURL = response.items[i].id.videoId;
            let completedURL = youtubeURL + videoURL
            console.log(completedURL);

            
            let embeddedURL = $("<iframe>");
            embeddedURL.attr("src", completedURL)
            $("#youtube-display").append(embeddedURL)
            
            
        } //for loop
        

    }); //ajax


}); //click function

