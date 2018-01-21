// // Get keys from keys file
var keys = require("./keys.js");

// // install
var Twitter = require("twitter");

// var command = process.argv[2];
// var input = process.argv.splice(3).join(" ");

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
// 	});
// } else {
// 	whichCommand(command);
// }


// function whichCommand(input) {
// 	switch(command) {
// 		case "my-tweets":
// 			// run twitter function
// 			break;
// 		case "spotify-this-song":
// 			// run spotify function
// 			break;
// 		case "movie-this":
// 			// run omdb
// 			break;
// 		case "do-what-it-says":
// 			//default
// 			break;
// 		default:
// 			console.log("Liri doesn't know what you want to do..");
// 			break;
// 	}
// }


// function twitter() {

// }

var params = {
	screen_name: 'eq01234',
	count: 3, // currently don't have 20 tweets, otherwise count: 20
	exclude_replies: true,
	include_rts: false,
};

var client = new Twitter(keys);


client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	console.log("Here are the latest tweets:");
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


