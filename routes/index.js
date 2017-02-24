var express = require('express');
var app = express();
// fs模块用于对系统文件及目录进行读写操作。
var url = require('url');
// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var resData=[{}];
var helper=require('./mysql_link');
var sql="SELECT * FROM news";
var helper_obj=helper.helper;
helper_obj.query(sql,function(res){
  resData=res;
});
exports.news=function(req,res){
	var arg = url.parse(req.url, true).query;
	res.render("news",{"title":"<a href='https://www.xiaoweiba8.com'>汤兴平</a>",items:resData,"urlData":arg.a});
};