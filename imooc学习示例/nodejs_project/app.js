var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan'); // express4.0 以上4者独立出来了
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/test');
var dbUrl = 'mongodb://localhost/test';

// app.locals.moment = require('moment')
app.set('views', './app/views/pages');
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

// 配置控制台信息
if ('development' === app.get('env')) { // 如果环境变量是开发环境(本地环境)
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

// 引入路由
require('./config/routes')(app);

app.listen(port);
app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')))

console.log('imooc started on port ' + port);