// 引入nodejs的express框架
var express = require('express');
var app = express();
// fs模块用于对系统文件及目录进行读写操作。
var fs = require("fs");



// 路径解析，得到规范化的路径格式
/*
//对window系统，目录分隔为'\', 对于UNIX系统，分隔符为'/'，针对'..'返回上一级；/与\\都被统一转换
//path.normalize(p);

var myPath = path.normalize(__dirname + '/test/a//b//../c/utilyou.mp3');
console.log(myPath); //windows: E:\workspace\NodeJS\app\fs\test\a\c\utilyou.mp3
*/

// 路径结合、合并，路径最后不会带目录分隔符
/*var myPath = path.join(path1, path2, path3);
console.log(myPath); path1\path2\path3*/

// 获取相对路径
/*var from = 'c:\\from\\a\\',
    to = 'c:/test/b';

var _path = path.relative(from, to);
console.log(_path); ..\..\test\b; 表示从from到to的相对路径*/

/*// 获取路径中目录名

var myPath = path.dirname(__dirname + '/test/util you.mp3');
console.log(myPath);*/

/*// 获取路径中文件名,后缀是可选的，如果加，请使用'.ext'方式来匹配，则返回值中不包括后缀名；

var myPath = path.basename(__dirname + '/test/util you.mp3', '.mp3');
console.log(myPath);*/

/*path.extname(path)//获取路径中的扩展名，如果没有'.'，则返回空*/

/*path.sep属性/返回操作系统中文件分隔符； window是'\\', Unix是'/'*/

// //返回操作系统中目录分隔符，如window是';', Unix中是':'
// path.delimiter属性


var path = require("path");
// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');
// multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
// 处理上传的文件
var multer  = require('multer');
// 引入mysql处理插件
var mysql = require('mysql');  
      
// 数据库名字
var TEST_DATABASE = 'tianyue'; 
 //数据表 
var TEST_TABLE = 'news';  

// 创建数据库连接初始化方法，数据库用户名和数据库密码
var client = mysql.createConnection({  
  user: 'root',  
  password: 'txatxp520',  
});
// 打开连接
client.connect();
// 发送连接请求
client.query("use " + TEST_DATABASE);
// 定义请求数据变量
var resData;
// 发送查询语句
client.query(  
  // 查询语句
  'SELECT * FROM '+TEST_TABLE,  
  // 查询无论失败还是成功回调
  function selectCb(err, results, fields) {  
    // 如果err为true则请求出错或者数据返回出错
    if (err) {  
      throw err;  
    }  
    
    // 如果results为true则返回数据成功
    if(results){
      resData=results;
        /*for(var i = 0; i < results.length; i++){
            console.log("%d\t%s\t%s", results[i].id, results[i].title);
        }*/
    }   
     //关闭连接 
    client.end();  
  }  
);


/*bodyParser.json(options) options可选 ， 这个方法返回一个仅仅用来解析json格式的中间件。这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib。

bodyParser.urlencoded(options) options可选，这个方法也返回一个中间件，这个中间件用来解析body中的urlencoded字符， 只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib。

作者：onweer
链接：https://www.zhihu.com/question/36962099/answer/125337339
来源：知乎
著作权归作者所有，转载请联系作者获得授权。

extended设置true还是false
返回的对象是一个键值对，当extended为false的时候，
键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型
*/
// app.use方法实际上是将中间件保存在一个数组中，注册路由时，依次将数组的元素取出
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
/*multer是Nodejs中用于处理文件上传 multipart/form-data数据的中间件，用于处理任何表单提交数据(包含非multipart/form-data类型的表单); 
multer 在request对象中加入了body和file或files属性，body属性包含了form中的文本内容，file或files包含了form 中的附件数据*/

app.get('/uploadFile.html', function (req, res) {
   res.sendFile( __dirname + "/" + "uploadFile.html" );
});
app.use(express.static(path.join(__dirname, 'public')));

app.post("/data",function(req,res){
   var response = {
         message:'File uploaded successfully', 
         filename:1,
         data:resData
    };
  res.end( JSON.stringify( response ));
});

app.post('/uploadFile', function (req, res) {

  // 定义需要存放的路劲
   var des_file = __dirname + "/" + new Date().getTime() +req.files[0].originalname;


   // 临时文件req.files[0].path

   // 读取文件
   fs.readFile( req.files[0].path, function (err, data) {

        // 读取文件成功开始写入文件/目录
        fs.writeFile(des_file, data, function (err){
         if( err ){
              console.log( err );
         }else{
            // 写入文件成功！
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname,
                   data:resData
              };
          }
          res.end( JSON.stringify( response ) );
       });
   });
})

var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port
  console.log(host);
  console.log(port);

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})