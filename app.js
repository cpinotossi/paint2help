var express = require('express');
const morgan = require('morgan');
var path = require('path');
let cors = require('cors');


var hwRouter = require('./routes/hw');
var csaiRouter = require('./routes/csai');
var stestRouter = require('./routes/stest');
var aiRouter = require('./routes/ai');
var userRouter = require('./routes/user');
var app = express();

// disable page caching
app.disable('view cache');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.set('view options', { layout: 'layout' });

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let staticOptions = {
    maxAge: "60s"
}

app.use(express.static(path.join(__dirname, 'public'),staticOptions));

//Call a simple Hello World Page
app.use('/helloworld', hwRouter);
//Call server side AI and simple Hello World Page
//app.use('/hellossai', aiRouter, hwRouter);
//Call client side AI and simple Hello World Page
//app.use('/hellocsai', csaiRouter);
//Call server and client side AI and simple Hello World Page
//app.use('/hellocsssai', aiRouter, csaiRouter);


//app.use('/autsch', aiRouter,stestRouter);
//app.use('/uff', aiRouter,stestRouter);
app.use('/user/*', aiRouter,userRouter);
app.use('/', aiRouter,userRouter);


module.exports = app;
