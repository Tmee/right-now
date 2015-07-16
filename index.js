const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');
const client = redis.createClient();

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});

io.on('connection', function (socket) {
  console.log('Someone has connected.');

  client.subscribe("community");
  client.on("error", function (err) {
      console.log("Error " + err);
  });

  client.on("message", function (channel, message) {
    emit(channel, message);
  });

  var emit = function(channel, message) {
    socket.emit(channel, {channel: channel, text: message});
  };
});