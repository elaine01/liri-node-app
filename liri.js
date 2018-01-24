// Get keys from keys file
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotifykeys = require('./spotifykeys.js');
var Spotify = require('node-spotify-api');
var omdbkey = require('./omdbkeys.js');
var inquirer = require('inquirer');
var request = require('request');

// user inputs
var command = process.argv[2];
var input = process.argv;
var songName = '';
var data = '';

// console.log(input);

// if (command === undefined) {
// 	inquirer.prompt([
// 	  // intial list of commands
// 	  {
// 	    type: "list",
// 	    message: "What do you want to do?",
// 	    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
// 	    name: "initial-command"
// 	  },
// 	  {
// 	    type: "confirm",
// 	    message: "Are you sure:",
// 	    name: "confirm",
// 	    default: true
// 	  },
// 	])
// 	.then(function(inquirerResponse) {
// 	 console.log(inquirerResponse.initial-command);
// 	})
// else {
// 	whichCommand(command);
// }


// function whichCommand(input) {
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
			doItSays();
			break;
		default:
			console.log("Hi, my name is Liri.");
			console.log("Please use one of the following commands:");
			console.log("'my-tweets'");
			console.log("'spotify-this-song' 'song title'");
			console.log("'movie-this' 'movie title'");
			console.log("'do-what-it-says'");
			console.log("");
			break;
	}
// }

function twitter() {
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

// //initialize spotify
function spotify(data) {
	var spotify = new Spotify(spotifykeys);

	songName = input.splice(3).join(" ");

	if (data != undefined) {
		songName = data;	
	}

	if (!songName) {
		songName = "'The Sign' by Ace of Base"
	} 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
		  return console.log("There's either a typo or the song doesn't exist. Please try again.");
		}
		// console.log("107 ",data.tracks);
		var songInfo = data.tracks.items;

		// console.log("109 ", songInfo);
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

// //initialize omdb
function omdb() {
	movieName = input.splice(3).join("+"); //for movie
	var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&" + apikey;
	console.log(movieName);
	console.log(queryURL);
	if (!movieName) {
		console.log("If you haven't watched 'Mr. Nobody' then you should: "
			+ "\nhttp://www.imdb.com/title/tt0485947"
			+ " \nIt's on Netflix!");
		queryURL = "https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&" + apikey;
	}
	request(queryURL, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		var movie = JSON.parse(body);
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

function doItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {

	  if (error) {
	    return console.log(error);
	  }
	  data = data.split(" ");
	  data = data.splice(1, 50).join(" ");
	  spotify(data);
	});
}


