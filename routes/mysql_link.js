var mysql = require("mysql");  
var pool = mysql.createPool({  
   host:"localhost",  
   user:"root",  
   password:"txatxp520",  
   database:"tianyue",  
   port:"3306",  
   connectionLimit:10  
});  
     
var helper = function(){  
    this.query = function(sql,callback){  
        pool.getConnection(function(err,conn){  
             if(err)console.log("获取连接失败,%s",err);  
 
           conn.query(sql,function(err,rows,fields){  
                 if(err)console.log("查询失败,%s",err);  
              callback(rows);  
           });  
 
            conn.release();  
       });  
    };  
    this.insert = function(sql,callback){  
        pool.getConnection(function(err,conn){  
           if(err)console.log("获取连接失败,%s",err);  
 
           conn.query(sql,function(err,res){  
               if(err)console.log("新增失败,%s",err);                
               callback(res.insertId);  
           });  
 
           conn.release();  
       });  
   };  
   this.update = function(sql,callback){  
       pool.getConnection(function(err,conn){  
           if(err)console.log("获取连接失败,%s",err);  
 
           conn.query(sql,function(err,res){  
               if(err)console.log("修改失败,%s",err);            
               //callback(res.changedRows);  
               callback(res.affectedRows);  
           });  
 
           conn.release();  
       })  
   };  
  this.delete = function(sql,callback){  
    pool.getConnection(function(err,conn){  
          if(err)console.log("获取连接失败,%s",err);  
 
          conn.query(sql,function(err,res){  
               if(err)console.log("删除失败,%s",err);  
              callback(res.affectedRows);  
           });  

           conn.release();  
       })  
   }  
}  
   
exports.helper = new helper();  