var http = require('http');
var fs = require('fs');
// fs模块用于对系统文件及目录进行读写操作。
var url = require('url');
http.createServer(function (request, response) {
	// 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/html'});

	// 发送响应数据 "Hello World"
	response.end('<div style="color:blue;">Hello World5555\n</div>'+pathname);
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');