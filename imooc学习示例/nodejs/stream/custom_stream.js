// 定制的流
var stream = require('stream');
var util = require('util');

function ReadStream() {
    stream.Readable.call(this);
}

// 继承(要继承的目标的函数, 被继承的)
util.inherits(ReadStream, stream.Readable);

ReadStream.prototype._read = function() {
    this.push('I ');
    this.push('Love ');
    this.push('Imooc\n');
    this.push(null);
}

function WritStream() {
    stream.Writable.call(this);
    this._cached = new Buffer('');
}

util.inherits(WritStream, stream.Writable);

WritStream.prototype._write = function(chunk, encode, cb) {
    console.log(chunk.toString());
    cb();
}

function TransformStream () {
    stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);

TransformStream.prototype._transform = function(chunk, encode, cb) {
    this.push(chunk);
    cb();
}

TransformStream.prototype._flush = function(cb) {
    this.push('Oh Yeah!');
    cb();
}

var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);