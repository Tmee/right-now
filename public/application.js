var socket = io();

socket.on('connect', function () {
  console.log('You have connected!');
  socket.send('message', {
    username: 'yournamehere',
    text: 'I did the thing.'
  });
});


socket.on('message', function (message) {
  // console.log('Something came along on the "message" channel:', message);
});

socket.on('community', function (message) {
  // console.log('Something came along on the "community" channel:', message);
  console.log(message.text);
  $('h1').append('<p>' + JSON.parse(message.text)['msg'] + '</p>')
});

socket.on('gamenight', function (message) {
  // console.log('Something came along on the "gamenight" channel:', message);
});