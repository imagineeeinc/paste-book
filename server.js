require("env")
var express = require("express");
var socket = require('socket.io');
var app = express();

const hostname = '127.0.0.1';
const port = process.PORT || 3000;

var server = app.listen(port, function(){
    console.log(`Listening to requests on port ${port}`);
});

app.use(express.static("public"));

var io = socket(server);

//app.get('/', (req, res) => {
//  res.send('Hello World, from express');
//});

io.on('connection', (socket) => {
    //console.log('a user connected');
    socket.on('disconnect', () => {
        //console.log('user disconnected');
    });
  });
//console.log(socket.connected);
//console.log(socket.id);
//console.log(socket.disconnected);