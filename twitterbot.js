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
mongoose.connect('mongodb:');
