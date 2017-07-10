var request = require("request")

var fs = require("fs")

var arg = process.argv[2]

var search = ""

var all = process.argv

process.argv.forEach((val , index) => {
	if (index > 2){
		search += "+"+val
	}
})

switch (arg) {
	case "tweet":
		tweeter();
		break;
	case "spotify":
		spotter();
		break;
	case "omdb":
		movier();
		break;
}

function movier(){
	var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

	console.log(queryUrl);

	request(queryUrl , function(error, response, body){

		if (!error && response.statusCode === 200) {

			body = JSON.parse(body)
	 		console.log(body.Year)
	 		fs.appendFile("log.txt")
		}
	})
}

function tweeter(){
	var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=10";
	console.log(queryUrl);

	request(queryUrl , function(error, response, body){

		if (!error && response.statusCode === 200) {

			body = JSON.parse(body)
			console.log(body)
			for (var i = 0; i < body.length; i++) {
				console.log(body[i].text)
			}
	 		
	 		fs.appendFile("log.txt")

		}
		else{console.log(error)
			console.log(body)}
	})
}
