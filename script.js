// var queryURL = "https://cors-anywhere.herokuapp.com/https://www.balldontlie.io/api/v1/players/237"
var jawn = "https://www.balldontlie.io/api/v1/stats"
var searchTerm = "embiid"
var playerID;
const corsHelp = "https://cors-anywhere.herokuapp.com/"
var queryURL = corsHelp + "https://www.balldontlie.io/api/v1/players/?search=" + searchTerm;
$.ajax({
    //url : "https://stats.nba.com/stats/playercareerstats/?"//scoreboard/?GameDate=01/28/2020&LeagueID=00",//&LeagueID=00&DayOffset=0",//"https://stats.nba.com/stats/
    //zplayercareerstats",
    url: queryURL,//"stats.nba.com/stats/scoreboard/?GameDate=02/14/2015&LeagueID=00&DayOffset=0",
    method: "GET"
}).then((response) => {

    console.log(response)
    //TODO change back playerid back to let and restrucutre function order
    playerID = response.data[0].id
    $.ajax({//last 25 gamees or so
        url: corsHelp + "https://www.balldontlie.io/api/v1/stats/?player_ids[]=" + playerID,
        method: "GET"
    }).then((games) => {
        console.log(games)
        console.log(games.data[0].game.date)
        let date = games.data[0].game.date
        let year = date.substring(0, 4)

        $.ajax({
            url: corsHelp + "https://www.balldontlie.io/api/v1/season_averages/"/*?season=" */ + "?player_ids[]=" + playerID,//year + "&player_ids[]=" + playerID,// + "&player_ids=" + playerID,
            method: "GET"
        }).then((playerStats) => {
            // console.log(year)
            //if the player did not record stats in the current year then we will go for whatever year the stats previously were recorded
            if (playerStats.data.length == 0) {
                $.ajax({
                    url: corsHelp + "https://www.balldontlie.io/api/v1/season_averages/?season=" + year + "&player_ids[]=" + playerID,
                    method: "GET"
                }).then((again) => {
                    console.log(year)
                    console.log(again)
                })
            } else {
                console.log(playerStats)
            }
        })
    })
})