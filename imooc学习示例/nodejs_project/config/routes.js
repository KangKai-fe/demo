var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

module.exports = function(app) {
    // prehandle user 预处理
    app.use(function(req, res, next){
        var _user = req.session.user;

        app.locals.user = _user;

        next()
    })

    // index
    app.get('/', Index.index)

    // User
        // 若路由为app.post('/user/signup/:userid',(req, res) =>{})
        // var _user = req.param('user');
        // 若路由为/user/signup/1111?userid=1112
        // req.body{userid: 1113}
        // 则req.param('userid')优先匹配1111, 其次1113, 最后1112
        // var _user = req.query.userid
        // 若post或者jquery的ajax请求
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.userlist)


    // Movie
    app.get('/detail/:id', Movie.detail)
    app.get('/admin/movie', Movie.new)
    app.get('/admin/update/:id', Movie.update)
    app.post('/admin/movie/new', Movie.save)
    app.get('/admin/list', Movie.list)
    app.delete('/admin/list', Movie.del)
}

