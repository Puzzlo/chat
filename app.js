// app.js

process.env.NODE_CONFIG_DIR  = __dirname + '/config';

var express = require('express');
var config = require('config');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
//var cors = require('cors');
//var async = require('async');


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname, 'public')));


//console.log('NODE_CONFIG_DIR: ' + conf.util.getEnv('NODE_CONFIG_DIR'));
//console.log('SUPPRESS_NO_CONFIG_WARNING: ' + conf.util.getEnv('SUPPRESS_NO_CONFIG_WARNING'));

// favicon
//app.use(favicon(__dirname + '/public/img/favicon.ico'));

// parse cookies to req.cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// parse forms
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use req.session as data store
var session = require('cookie-session');
app.use(session({ keys: config.keys } ));

// add reaction app to redirect on any pages
//require('routes')(app);


var http = require('http').Server(app);
var io = require('socket.io')(http);
var server = http.listen(config.port);
console.log('application running on port ' + config.port);

var birds = require('./routes');
app.use('/', birds);

