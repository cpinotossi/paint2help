var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

// disable page caching
app.disable('view cache');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let staticOptions = {
    maxAge: "60s"
}

app.use(express.static(path.join(__dirname, 'public'),staticOptions));
app.use(express.static(path.join(__dirname, 'images'),staticOptions));

app.use('/', indexRouter);

module.exports = app;
