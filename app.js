var express = require('express');
const morgan = require('morgan');
var path = require('path');
let cors = require('cors');

var userRouter = require('./routes/user');
var app = express();

// disable page caching
app.disable('view cache');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let staticOptions = {
    maxAge: "60s"
}

app.use(express.static(path.join(__dirname, 'public'),staticOptions));

app.use('/user/*', userRouter);
app.use('/', userRouter);

module.exports = app;
