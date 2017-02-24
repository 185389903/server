// 引入express框架
var express = require('express');
var routes = require('./routes');
var fs=require("fs");
var path = require("path");
var ejs = require("ejs");
var io=require("socket.io");
var app = express();

// 这句将模版引擎设置为 ejs

app.set("view engine","ejs");
app.set("views",__dirname + "/views");
var dir_header_path=__dirname+'/views/header.ejs';
var str=fs.readFileSync(dir_header_path,'utf8');
var html=ejs.render(str,{"urlData":"标题11111","filename":dir_header_path});
// 设置html中的静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.get("/news",routes.news);

console.log(html);

var server =app.listen(8033,function(){
	var host = server.address().address
  	var port = server.address().port
});

var ws=io.listen(server);