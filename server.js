'use strict';

var express = require('express');

var app = express();

app.set('public');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port', port);
});
