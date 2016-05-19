var Comment = require('../models/comment');
var _ = require('underscore');


// comment
exports.save =  function(req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    if (_comment.cid) { // cid为在评论区点击用户头像后动态生成的,用来区分是否是用户间的相互回复
        Comment.findById(_comment.cid, function(err, comment) { // 通过cid查询当前评论
            var reply = {
                from: _comment.from, // 谁回复的
                to: _comment.tid, // 回复给谁
                content: _comment.content // 回复内容
            }

            comment.reply.push(reply) // 将reply添加到该comment的reply数组中

            comment.save(function(err, comment) {

                if (err) {
                    console.log(err);
                }

                res.redirect('/detail/' + movieId);
            })
        })
    } else { // 直接的评论
        var comment = new Comment(_comment);

        comment.save(function(err, comment) {

            if (err) {
                console.log(err);
            }

            res.redirect('/detail/' + movieId);
        })
    }
}
