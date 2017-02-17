'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', layoutsDir: __dirname + '/public/views/layouts' }));
app.set('views', __dirname + '/public/views');
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('home');
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port', port);
});
