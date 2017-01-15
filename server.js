'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('build'));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port', port);
});
