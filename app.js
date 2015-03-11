require('coffee-script/register');
// require( './db' );
require('./server');
var restful = require('node-restful'),
    mongoose = restful.mongoose;

var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var users = require('./routes/user');
var app = express();

mongoose.connect("mongodb://localhost/notifications");

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

//app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






app.use('/', routes);


var Notification = app.notification = restful.model("notification", mongoose.Schema({
    id: { type: String, required: false },
    date_start: { type: String, required: false },
    date_end: { type: String, required: false },
    type: { type: String, required: true }
}))
    .methods(['get', 'post', 'put', 'delete']);

Notification.register(app, '/notification');


var SMS = app.SMS = restful.model("SMS", mongoose.Schema({
    message: String,
    date: String
}))
    .methods(['get', 'post']);
SMS.register(app, '/sms');


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
