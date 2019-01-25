require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js")
var moment = require("moment")

var operator = process.argv[2];
var operand = process.argv[3];

evaluate();

function evaluate() {
    switch (operator) {
        case "spotify-this-song":
        runSpotify();
        break
        
        case "concert-this":
        runBands();
        break

        case "movie-this":
        runOMDB();
        break

        case "do-what-it-says":
        runRandom();
    }
}

function log(input, output) {
    fs.appendFile("log.txt", "\n" + input + ": " + output, function(err){
        if (err) console.log("Error logging")
    })
}

function runSpotify() {
    if (operand === undefined) {
        operand = "The Sign Ace of Base"
    }
    var input = operator + " " + operand
    spotify.search({
        type: "track",
        query: operand
    }).then(function(response){
        var output = "Artist: " + response.tracks.items[0].artists[0].name + "\nSong Title: " + response.tracks.items[0].name + "\nPreview Link: " + response.tracks.items[0].preview_url + "\nAlbum Title: " + response.tracks.items[0].album.name
        console.log(output)
        log(input, output);
    }).catch(function(err){
        console.log(err);
    })
}

function runBands() {
    var outputArray = []
    axios.get("https://rest.bandsintown.com/artists/" + operand + "/events?app_id=codingbootcamp").then(function(response){
        for (var i = 0; i < 5; i++) {
            var output = response.data[i].lineup + ":\nPerforming at: " + response.data[i].venue.name + "\nIn: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nOn: " + moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm a") + "\n"
            outputArray.push(output)
            console.log(output);
        }
    var input = operator + " " + operand
    log(input, outputArray)
    })
}

function runOMDB() {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + operand).then(function(response){
        var output = "Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors
        console.log(output)
        var input = operator + " " + operand
        log(input, output)
    })
}

function runRandom() {
    fs.readFile("random.txt", "utf8", function (error, data){
        if (error) {
            console.log("error")
        }
        else {
            dataArray = data.split(",");
            operator = dataArray[0];
            operand = dataArray[1];
            evaluate();
        }
    })
}