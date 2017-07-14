var request = require("request")

var fs = require("fs")



var keys = require('./twitterkeys');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var arg = process.argv[2]

var selection = process.argv.splice(3)

var search = ""

var all = process.argv

process.argv.forEach((val , index) => {
	if (index > 2){
		search += "+"+val
	}
})




switch (arg) {
	case "my-tweets":
		tweeter();
		break;
	case "spotify-this-song":
		spotter();
		break;
	case "movie-this":
		movier();
		break;
	case "do":
		doer();
		break;
}



function movier(){
	var queryUrl = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl , function(error, response, body){

		if (!error && response.statusCode === 200) {

			body = JSON.parse(body)
			console.log("")
			console.log(body.Title)
	 		console.log("Year: "+body.Year)
	 		console.log(body.Ratings[1].Source+" Rating:"+body.Ratings[1].Value)
	 		console.log("Imbd Rating: "+body.imdbRating)
	 		console.log("Counrty produced in: "+body.Country)
	 		console.log("Plot: "+body.Plot)
	 		console.log("Actors: "+body.Actors)
	 		console.log("")
		}
	})
}

function tweeter(){
var client = new Twitter({
  consumer_key: keys.consumerKey,
  consumer_secret: keys.consumerSecret,
  access_token_key: keys.token,
  access_token_secret: keys.secret
});
 
var params = {screen_name: 'nodejs' , count: 5};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		console.log("")
  		console.log("Tweet: "+i+": "+tweets[i].text);
  		console.log("")
  	}
    

  }
  else{
  	console.log(error);
  }
});
}

function spotter(selection){
var client_id = '4326f1583d504a8db104448e63ef5272'; 
var client_secret = '2140f36bb8434cd1a9d92abe86ed9c3a'; 
 
var spotify = new Spotify({
  id: '4326f1583d504a8db104448e63ef5272',
  secret: '2140f36bb8434cd1a9d92abe86ed9c3a'
});
 
spotify.search({ type: 'track', query: selection , limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data.tracks.items[0].name)
console.log(data.tracks.items[0].artists[0].name)
console.log(data.tracks.items[0].album.name)
console.log(data.tracks.items[0].external_urls.spotify)

});
}

function doer(){

	fs.readFile("random.txt" , "utf-8" , function(err, data){
		if(err){
			console.log(err)
		}
		
		spotter(data)
	})

}