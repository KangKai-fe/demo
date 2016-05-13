var fs = require('fs');

var readStream = fs.createReadStream('1.mp3');
var writeStream = fs.createWriteStream('1_stream.mp3');

readStream.on('data', function(chunk) {
    // 防爆仓处理
    if (writeStream.write(chunk) === false) {
        console.log('still cached');
        readStream.pause();
    }
});

readStream.on('end', function() {
    writeStream.end();
})

writeStream.on('drain', function() {
    console.log('data drains');

    readStream.resume();
})