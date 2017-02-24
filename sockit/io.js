// 引入nodejs的express框架
var express = require('express');
var app = express();
// fs模块用于对系统文件及目录进行读写操作。
var fs = require("fs");


var path = require("path");
// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');

app.get('/sockit/io_chat.html', function (req, res) {
   res.sendFile( __dirname + "/" + "sockit/io_chat.html" );
});



var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port
  console.log(host);
  console.log(port);

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})