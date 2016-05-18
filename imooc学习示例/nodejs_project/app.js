var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session'); // express4.0 以上三者独立出来了
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
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
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port ' + port);

// index page
app.get('/', function(req, res) {
    console.log('user in session: ')
    console.log(req.session.user);

    var _user = req.session.user;

    if (_user) {
        app.locals.user = _user;
    }
    Movie.fetch(function(err, movies) {

        if(err) {
            console.log(err);
        }

        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    })
})

// signup
app.post('/user/signup', function(req, res) {
    // 若路由为app.post('/user/signup/:userid',(req, res) =>{})
    // var _user = req.param('user');
    // 若路由为/user/signup/1111?userid=1112
    // req.body{userid: 1113}
    // 则req.param('userid')优先匹配1111, 其次1113, 最后1112
    // var _user = req.query.userid
    // 若post或者jquery的ajax请求
    var _user = req.body.user;

    User.findOne({name: _user.name}, function(err, user) {

        if (err) {
            console.log(err);
        }

        if (user) {
            return res.redirect('/')
        } else {
            var user = new User(_user);

            user.save(function(err, user) {

                if (err) {
                    console.log(err);
                }

                res.redirect('/admin/userlist')
            })
        }
    })

})

// signin
app.post('/user/signin', function(req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name, name}, function(err, user) {

        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/')
        }

        user.comparePassword(password, function(err, isMatch) {

            if (err) {
                console.log(err)
            }

            if (isMatch) {
                req.session.user = user // sessing: 服务器和客户端间的会话状态


                return res.redirect('/')
            } else {
                console.log('Password is not matched')
                return res.redirect('/')
            }
        })
    })

})

// logout
app.get('/logout', function(req, res) {
    delete req.session.user;
    delete app.locals.user;

    res.redirect('/');
})

// userlist page
app.get('/admin/userlist', function(req, res) {
    User.fetch(function(err, users) {

        if(err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'imooc 用户列表页',
            users: users
        })
    })
})


// detail page
app.get('/detail/:id', function(req, res) {
    var id = req.params.id;

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'imooc ' + movie.title,
            // id: id,
            movies: movie
        })
    })
})

// admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            // _id: '',
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})

// admin update movie
app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin',{
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/detail/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        _movie.save(function(err, movie) {

            if (err) {
                console.log(err);
            }

            res.redirect('/detail/' + movie._id);
        })
    }
})

// list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {

        if(err) {
            console.log(err);
        }

        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        })
    })
})

// list delete movie
app.delete('/admin/list', function(req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({_id: id}, function(err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
})