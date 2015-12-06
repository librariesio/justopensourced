var EventSource = require('eventsource');
var Twitter = require('twitter');

var es = new EventSource('https://github-firehose.herokuapp.com/events');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

es.on('event', function(e) {
  var data = JSON.parse(e.data)
  if(data.type === 'PublicEvent'){
    var status = data.actor.login + " just open sourced a repository: https://github.com/" + data.repo.name
    client.post('statuses/update', {status: status}, function(error, tweet, response){
      if (!error) {
        console.log(tweet);
      } else {
        console.log(error);
      };
    });
  }
});
