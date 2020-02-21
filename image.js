

// ==========CLick Function================
$("#search-form").on("submit", function (event) {
    event.preventDefault();
    console.log("clicked")
    // ==========YOUTUBE API================
   
    let basketballPlayerInput = $("#input-value").val()
    let firstNameArr = basketballPlayerInput.split(" ")
    let searchName = firstNameArr[1] + "/" + firstNameArr[0]

    console.log(searchName)
    // let queryURL = "https://nba-players.herokuapp.com/players/" + basketballPlayerInput 

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response.items)
//         $("#youtube-display").empty();
//         for (let i = 0; i < response.items.length; i++) {


//             // console.log(response);
//             // console.log(response.items[i].id.videoId)


//             let youtubeURL = "https://www.youtube.com/embed/"
//             let videoURL = response.items[i].id.videoId;
//             let completedURL = youtubeURL + videoURL
//             console.log(completedURL);

            
//             let embeddedURL = $("<iframe>");
//             embeddedURL.attr("src", completedURL)
//             $("#youtube-display").append(embeddedURL)
            
            
            
            
//         } //for loop
        

//     }); //ajax


// }); //click function

