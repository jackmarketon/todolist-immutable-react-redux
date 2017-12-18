var express = require('express');
var port = process.env.PORT || 3000;
var app = express.createServer();

app
  .get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
  })
  .configure(() => {
    app.use('/static', express.static(__dirname + '/static'));
  })
  .listen(port);
