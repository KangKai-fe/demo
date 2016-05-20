var Movie = require('../models/movie');
var Category = require('../models/category');


// admin new page
exports.new =  function(req, res) {
    res.render('category_admin', {
        title: 'imooc 后台分类录入页',
        category: {}
    })
}

// admin post movie
exports.save =  function(req, res) {
    var _category = req.body.category;
    var category = new Category(_category)

    category.save(function(err, category) {

        if (err) {
            console.log(err);
        }

        res.redirect('/admin/category/list');
    })
}

// categorylist page
exports.list = function(req, res) {
    Category.fetch(function(err, categories) {

        if(err) {
            console.log(err);
        }

        res.render('categorylist', {
            title: 'imooc 分类列表页',
            categories: categories
        })
    })
}

// index page
exports.index = function(req, res) {

    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function(err, categories) {

            if (err) {
                console.log(err);
            }

            res.render('index', {
                title: 'imooc 首页',
                categories: categories
            })
        })
}

// list delete category
exports.del =  function(req, res) {
    var id = req.query.id

    if (id) {
        Category.remove({_id: id}, function(err, category) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
}