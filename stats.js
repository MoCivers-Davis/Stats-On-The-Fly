var searchTerm;
const corsHelp = "https://cors-anywhere.herokuapp.com/"
var submitBtn = document.getElementById("submitBt")
var inputValue = document.getElementById("input-value")
submitBtn.addEventListener("click", searchPlayer)
var statsHeader = document.getElementById("statsHeader")
//search player function

searchPlayer();

function searchPlayer() {
    if(searchTerm == null){
        searchTerm = "kobe bryant"
    } else {
        searchTerm = inputValue.value
        postImage(searchTerm)
    }
    //take search box value and assign it to search term
    // let searchTerm = inputValue.value
    var playerQuery = corsHelp + "https://www.balldontlie.io/api/v1/players/?search=" + searchTerm;
    $.ajax({
        url: playerQuery,
        method: "GET"
    }).then((playerDetails) => {
        //assign the fetched player id to player id
        let playerID = playerDetails.data[0].id
        let firstName = playerDetails.data[0].first_name
        let lastName = playerDetails.data[0].last_name

        $.ajax({
            url: corsHelp + "https://www.balldontlie.io/api/v1/season_averages/?player_ids[]=" + playerID,
            method: "GET"
        }).then((currentSeasonAverage) => {
            if (currentSeasonAverage.data.length != 0) {
                let season = currentSeasonAverage.data[0].season
                statsHeader.textContent = `Track Player Stats | (${season}-${(season + 1)}) | ${firstName} ${lastName}`
                stats(currentSeasonAverage)
            } else {
                $.ajax({
                    url: corsHelp + "https://www.balldontlie.io/api/v1/stats/?player_ids[]=" + playerID,
                    method: "GET"
                }).then((gamePool) => {
                    //from the pool of fetched games, get the date of the first one
                    let date = gamePool.data[0].game.date
                    //take the year from that date (first 4)
                    let year = parseInt(date.substring(0, 4))
                    statsHeader.textContent = `Track Player Stats | (${year}-${(year + 1)}) | ${firstName} ${lastName}`
                    $.ajax({
                        url: corsHelp + "https://www.balldontlie.io/api/v1/season_averages/?season=" + year + "&player_ids[]=" + playerID,
                        method: "GET"
                    }).then((pastSeasonAverage) => {
                        stats(pastSeasonAverage)
                    })
                })
            }
        })
    })
}

function stats(returnData) {
    let responseStatsArray = returnData.data[0]
    let ourStatsArray = [];
    let fillerRow = document.getElementById("fillerRow")
    ourStatsArray.push(responseStatsArray.pts)
    ourStatsArray.push(responseStatsArray.oreb + responseStatsArray.dreb)
    ourStatsArray.push(responseStatsArray.ast)
    ourStatsArray.push(responseStatsArray.stl)
    ourStatsArray.push(responseStatsArray.turnover)


    while(fillerRow.firstChild) {
        fillerRow.removeChild(fillerRow.firstChild)
    }

    for (i = 0; i < ourStatsArray.length; i++) {
        let td = document.createElement("td")
        td.textContent = ourStatsArray[i].toFixed(2)
        fillerRow.appendChild(td)
    }
}

function postImage(searchTerm) {
    let otherKey = "0910b713c3be4afbb195e10da56e3fc6";
    $.ajax({
        url: corsHelp + "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + searchTerm,
        method: "GET",
        beforeSend: function (xhr) { xhr.setRequestHeader("Ocp-Apim-Subscription-Key", otherKey); }
        // https://stackoverflow.com/questions/3258645/pass-request-headers-in-a-jquery-ajax-get-call
    }).then((response) => {
        let imgSrc = (response.value[0].thumbnailUrl)
        let img = document.querySelector("img")
        img.setAttribute("src", imgSrc)
    })
}