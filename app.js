
var express = require('express')
var app = express()
var routes = require('./routes')
var path = require('path');
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', routes.index);
app.get('/load', routes.loadQ);
app.post('/guess', routes.grader);

var server = app.listen(3000, function () {
  
})
