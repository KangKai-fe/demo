var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// detail page
exports.detail = function(req, res) {
    var id = req.params.id;

    Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
        if (err) {
            console.log(err);
        }
    })
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
    Category.find({}, function(err, categories) {
        res.render('admin', {
            title: 'imooc 后台录入页',
            categories: categories,
            movie: {}
        })
    })
}

// admin update movie
exports.update = function(req, res) {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            Category.find({}, function(err, categories) {
                res.render('admin',{
                    title: 'imooc 后台更新页',
                    movie: movie,
                    categories: categories
                })
            })
        })
    }
}

// admin poster
exports.savePoster = function(req, res, next) {
    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;

    console.log(req.files)
    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

            fs.writeFile(newPath, data, function(err) {
                req.poster = poster;
                next();
            })
        })
    } else {
        next();
    }
}

// admin post movie
exports.save =  function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (req.poster) {
        movieObj.poster = req.poster;
    }

    if (id) {
        Movie.findById(id, function(err, movie) {

            if (err) {
                console.log(err);
            }

            var oldCategory = movie.category;
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, newmovie) {

                if (err) {
                    console.log(err);
                }

                if (oldCategory !== newmovie.category) {
                    Category.findById(oldCategory,function(err,category){
                        var index = category.movies.indexOf(_movie.id);
                        category.movies.splice(index,1)
                        category.save()
                    });

                    Category.findById(_movie.category,function(err,category){
                        category.movies.push(_movie.id);
                        category.save();
                    });
                }

                res.redirect('/detail/' + movie._id);
            })
        });
    } else {
        _movie = new Movie(movieObj);
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;

        _movie.save(function(err, movie) {

            if (err) {
                console.log(err);
            }

            if (categoryId) {
                Category.findById(categoryId, function(err, category) {
                    category.movies.push(movie._id);

                    category.save(function(err, category) {
                        res.redirect('/detail/' + movie._id);
                    })
                })
            } else if (categoryName) {
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                })

                category.save(function(err, category) {
                    movie.category = category._id;
                    movie.save(function(err, movie) {
                        res.redirect('/detail/' + movie._id);
                    })
                })
            }
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