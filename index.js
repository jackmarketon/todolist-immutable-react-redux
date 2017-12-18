var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app
  .use('/static', express.static(__dirname + '/static'))
  .get('/', function (request, response) {
    response.sendFile(__dirname + '/static/index.html');
  })
  .listen(port);
