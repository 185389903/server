<?php
	$config=require("./config.php");
	$xwb_config=json_decode(json_encode(xwb_config()));
	require($xwb_config->globalUrl."Home.class.php");
?> <html lang="zh-CN"> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="renderer" content="webkit|ie-comp|ie-stand"> <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"> <meta name="description" content="小尾巴网是提供给广大前端开发者一个学习和查找前端相关资源的网站。有提供:javascript;css;css1;css2;css3;html;html5等基础知识和一些demo例子等相关学习资源给广大开发者借鉴和学习"> <meta name="keywords" content="JavaScript,js,html,html5,css,css3,前端,前端开发,前端框架,库,前端库"> <title> <?php 
			if(!isset($_GET['title'])){
				echo '小尾巴脚本-小尾巴-小尾巴前端';
			}else{
				echo $_GET['title'];
			}
		 ?> </title> <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"> <link rel="stylesheet" type="text/css" href="css/ico.css"> <link rel="stylesheet" type="text/css" href="css/index.css"> <!--[if IE 7]> <link rel="stylesheet" href="css/ico_ie.min.css"><![endif]--> </head> <body> 
		 <?php
		require("conmom/header.php"); 
	?> <section class="container content"> <div class="col-lg-9 pad0"> <h2 class="list-Title"><span class="label label-info">前端用例</span></h2> <ul class="row demo-List" id="webDemoList"> <?php
					 echo $newHomeClass->returnWebDemoData("前端用例");
		  		?> </ul> </div> <div class="col-lg-3"> <h2 class="list-Title pad0"><span class="label label-danger">热搜排行</span></h2> <ul class="media"> <?php
					 echo $newHomeClass->returnWebDemoData("热搜排行");
		  		?> </ul> <h2 class="list-Title pad0"><span class="label label-danger">基础css</span></h2> <ul class="media"> <?php
					 echo $newHomeClass->returnWebDemoData("css1");
					 echo $newHomeClass->returnWebDemoData("css2");
					 echo $newHomeClass->returnWebDemoData("css3");
		  		?> </ul> <h2 class="list-Title pad0"><span class="label label-danger">基础html</span></h2> <ul class="media"> <?php
					 echo $newHomeClass->returnWebDemoData("html");
		  		?> </ul> <h2 class="list-Title pad0"><span class="label label-danger">基础javascript</span></h2> <ul class="media"> <?php
					 echo $newHomeClass->returnWebDemoData("javascript");
		  		?> </ul> </div> </section> <?php
		require("conmom/footer.php"); 
	?> <script src="js/lib/jquery/jquery-1.10.2.min.js"></script> <script src="js/lib/jquery/masonry-docs.min.js"></script> <script src="js/lib/bootstrap/bootstrap.min.js"></script> <script src="js/common.js"></script> <script type="text/javascript" src="https://www.xiaoweiba8.com/js/app/index.83831601d9e05093a442.js?83831601d9e05093a442"></script></body> </html>