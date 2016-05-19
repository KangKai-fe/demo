var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');

// detail page
exports.detail = function(req, res) {
    var id = req.params.id;
    console.log("id:")
    console.log(id)
    Movie.findById(id, function(err, movie) { // 找到该电影
        Comment
        .find({movie: id}) // 找到该电影对应的评论
        .populate('from', 'name') // 将from中的ObjectId反向查询出其name
        .populate('reply.from reply.to', 'name') // reply 中的from和to 的name值的反向查询
        .exec(function(err, comments) { // 执行render
            res.render('detail', {
                title: 'imooc详情页',
                movie: movie,
                comments: comments
            })
        })
    })
}

// admin new page
exports.new =  function(req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {}
    })
}

// admin update movie
exports.update = function(req, res) {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin',{
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
}

// admin post movie
exports.save =  function(req, res) {
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
}

// list page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {

        if(err) {
            console.log(err);
        }

        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        })
    })
}

// list delete movie
exports.del =  function(req, res) {
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
}