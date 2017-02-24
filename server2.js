var http = require('http');
var fs = require('fs');
// fs模块用于对系统文件及目录进行读写操作。
var url = require('url');
http.createServer(function (request, response) {
	// 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   console.log(pathname);//如果访问的是http://127.0.0.1:8881/index.html返回/index.html，
   // 后面如有参数也不返回参数部分
   // 读取文件内容
   // pathname.substr(1)把第一个反斜杠去掉
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         // 读取失败走这里
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	     
          //读取成功走这里 
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // 响应文件内容
         // data.toString()把得到的index.html转换成字符串，
         //然后用write方法写入response对象里面，下面有response.end方法把存起来的数据发送到请求方浏览器中
         response.write(data.toString());		
      }
      //  发送响应数据
      // 下面有response.end方法把存起来的数据发送到请求方浏览器中
      response.end();
   });   
}).listen(8881);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8881/');