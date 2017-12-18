var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app
  .use('/static', express.static('/static'))
  .get('/', function (request, response) {
    response.sendFile('/static/index.html');
  })
  .listen(port);
