var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session'); // express4.0 以上三者独立出来了
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/test');
var dbUrl = 'mongodb://localhost/test';

// app.locals.moment = require('moment')
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.bodyParser());
app.use(cookieParser()); // session的依赖
app.use(cookieSession({
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

require('./config/routes')(app);

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port ' + port);