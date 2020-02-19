//works
document.write("hello")

$.ajax({
    //url : "https://stats.nba.com/stats/playercareerstats/?"//scoreboard/?GameDate=01/28/2020&LeagueID=00",//&LeagueID=00&DayOffset=0",//"https://stats.nba.com/stats/
    //zplayercareerstats",
    url : "https://stats.nba.com/stats/scoreboard/?GameDate=01/28/2020&LeagueID=00&DayOffset=0",
    method : "GET"
}).then( (response) => {
  
    console.log("stuff")
  
    console.log(response)
})