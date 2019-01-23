require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var operator = process.argv[2];
var operand = process.argv[3];

evaluate();

function evaluate() {
    switch (operator) {
        case "spotify-this":
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

}

function runBands() {

}

function runOMDB() {

}

function runRandom() {
    
}