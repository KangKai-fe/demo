var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '测试',
    'mid': 8837
})

var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'POST',
    headers: {
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=283a84a3-f198-49b1-adee-169f8e49c615; imooc_isnew_ct=1460076708; PHPSESSID=n31ra3vt0569l5otl8i49ejie1; bdshare_firstime=1461034274104; jwplayer.qualityLabel=è¶æ¸; IMCDNS=0; jwplayer.mute=false; jwplayer.volume=100; loginstate=1; apsid=E4YWY2MWQ2MjIwYjZkMzhjYTNhOWJlZGRlNDI3NjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjk5NzM0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0MDMxNTU5OTVAcXEuY29tAAAAAAAAAAAAAAAAAAAAADNmNGYwYjA0ODUyNjMxNDc4NTQ4NmFkNGU3MDg0NWY0cXAwV3FwMFc%3DNG; last_login_username=403155995%40qq.com; imooc_isnew=2; cvde=570700a4a8efb-2971; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1461028675,1461034282; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1462792314',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/comment/348',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}

var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on('end', function() {
        console.log('评论完毕!');
    });
});

req.on('error', function(e) {
    console.log('Error: ' + e.message);
});

req.write(postData);
req.end();