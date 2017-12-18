var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var path = require('path');

app
  .use('/static', express.static('static'))
  .get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../static/index.html'));
  })
  .listen(port);
