require('dotenv').config();
var restclient = require('node-restclient');
var Twit = require('twit');
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var app = express();
app.get('/', function(req, res){
  res.send('kalimaaaaaaaa');
});

// app.listen(process.env.PORT || 3000, function(){
// })
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var db = mongoose.connection;
var kalimarSchema = new mongoose.Schema({
  title: String,
  value: Number
});
var KalimarDb = mongoose.model('KalimarDb, kalimarSchema');
mongoose.connect('mongodb://localhost/twitterbot');
// mongoose.connect('mongodb:');

var T = new Twit({
  consumer_key:         'process.env.CONSUMER_KEY',
  consumer_secret:      'process.env.CONSUMER_SECRET',
  access_token:         'process.env.ACCESS_TOKEN',
  access_token_secret:  'process.env.ACCESS_TOKEN_SECRET'
});

var max_id = 0;
KalimarDb.findOne({ title: 'max_id'}, function(err,reply) {
  if (err) return console.error(err);
  max_id = reply.value;
});

function reply() {
  T.get('statuses/mentions_timeline', {since_id: max_id}, function(e,r) {
    if(r != undefined) {
      for(var i = 0 ; i < r.length ; i++) {
        if(max_id < r[i].id) {
          var message ='@' + r[i].user.screen_name + ' ' + kalimar();
          T.post('statuses/update', { status: message }, function(err, reply) {
            console.log("message error: " + err);
            console.log("Sent a message: " + message);
          });
        }
      }
    }
  })
  console.log(max_id);
}

function kalimar() {
  var kalimars = [
    "Kalimaaaaaa",
    "Kalimaaaaaaa! https://pbs.twimg.com/media/CiGvseHU4AAmA7I.jpg",
    "Kalimaa! https://pbs.twimg.com/media/CgWa0ZxUAAANDnV.jpg"
  ];
  var result = kalimars[Math.floor(Math.random() * kalimars.length)];
  
  return result;
}

SetInterval(function() {
  try {
    reply();
  }
  catch (e)) {
    console.log(e);
  }
}, 120000);