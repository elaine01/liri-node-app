// // Get keys from keys file
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotifykeys = require('./spotifykeys.js');
var Spotify = require('node-spotify-api');
var omdbkey = require('./omdbkeys.js');
var inquirer = require('inquirer');
var request = require('request');


var command = process.argv[2];
var input = process.argv.splice(3).join(" ");

console.log(input);

if (command === undefined) {
	inquirer.prompt([
	  // intial list of commands
	  {
	    type: "list",
	    message: "What do you want to do?",
	    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
	    name: "initial-command"
	  },
	  {
	    type: "confirm",
	    message: "Are you sure:",
	    name: "confirm",
	    default: true
	  },
	])
	.then(function(inquirerResponse) {
	 console.log(inquirerResponse.initial-command);
	});
 
else {
	whichCommand(command);
}


function whichCommand(input) {
	switch(command) {
		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			spotify();
			break;
		case "movie-this":
			omdb();
			break;
		case "do-what-it-says":
			//default
			break;
		default:
			console.log("Liri doesn't know what you want to do..");
			break;
	}
}

// function twitter() {
	//set parameters
	var params = {
		screen_name: 'eq01234',
		count: 4, // currently don't have 20 tweets, otherwise will hardcode 20
		exclude_replies: true,
		include_rts: false,
	};

	//initiate twitter keys
	var client = new Twitter(keys);

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("---------------Here are the latest tweets---------------");
	  	for (i = 0; i < (params.count); i++) {
	  		console.log("");
		    console.log("");
		    console.log("Tweet #" + (i+1));
		    console.log("Date: " + tweets[i].created_at);
		    console.log("Tweeted: " + tweets[i].text);
		    console.log("");
		    console.log("");
	  	}  
	  }
	});
}

 
//initialize spotify
function spotify() {
	var spotify = new Spotify(spotifykeys);

	if (!input) {
		input = "'The Sign' by Ace of Base"
	}
	spotify.search({ type: 'track', query: input }, function(err, data) {
		if (err) {
		  return console.log("There's either a typo or the song doesn't exist. Please try again.");
		}
		var songInfo = data.tracks.items;
			
			console.log("---------------Song Search---------------");
		for (var j = 0; j < 5; j++) {
			console.log("");
			console.log("");
			console.log("Artist: " + songInfo[j].artists[0].name);
			console.log("Song: " + songInfo[j].name); 
			console.log("From Album: " + songInfo[j].album.name);
			console.log("Preview: " + songInfo[j].preview_url);
			console.log("");
			console.log("");
		}
	});
}

//initialize omdb
function omdb() {

	input = process.argv.splice(3).join("+");
	var queryURL = "https://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&" + apikey;

	if (!input) {
		console.log("If you haven't watched 'Mr. Nobody' then you should: "
			+ "\nhttp://www.imdb.com/title/tt0485947"
			+ " \nIt's on Netflix!");
		queryUrl = "https://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=40e9cece";
	}
	request(queryURL, function (error, response, body) {
		// console.log('error:', error); // Print the error if one occurred
		var movie = JSON.parse(body);

		  console.log(movie); // Print the HTML for the Google homepage.
			console.log("");
			console.log("---------------Movie Search---------------");
		  console.log("Title: " + movie.Title);
		  console.log("Year: " + movie.Year);
		  console.log("IMDB Rating: " + movie.imdbRating);
		  console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
		 	console.log("Produced in: " + movie.Country);
		  console.log("Language: " + movie.Language);
		  console.log("Actors: " + movie.Actors);
		  console.log("Plot: " + movie.Plot);
			console.log("");
			console.log("");
	});
}



