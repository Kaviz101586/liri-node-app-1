require("dotenv").config();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

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

function runSpotify() {
    console.log("spotify")
}

function runBands() {
    console.log("bands")
}

function runOMDB() {
    console.log("omdb")
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