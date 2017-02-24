;(function(){
	var txp_common={
		options:{
			treeOptions:{

			}
		},
		// 初始化方法
		init:function(){
			var ts=this;
		},
		// 创建元素
		cEle:function(el){
			return document.createElement(el);
		},
		// 创建文本
		cText:function(text){
			return document.createTextNode(text);
		},
		// 合并对象
		extend:function(o,n){
			if(!o || !n){
				return {"msg":"对象合并出错！"};
			}
			for (var p in n){
		        if(n.hasOwnProperty(p))
		            o[p]=n[p];
		    }
		    return o;
		},
		// 获取class，返回数组
		getClass:function(classnames){ 
			var classobj= new Array();//定义数组 
			 
			var classint=0;//定义数组的下标 
			 
			var tags=document.getElementsByTagName("*");//获取HTML的所有标签 
			 
			for(var i in tags){//对标签进行遍历 
			 
				if(tags[i].nodeType==1){//判断节点类型 
				 
					if(tags[i].getAttribute("class") == classnames){//判断和需要CLASS名字相同的，并组成一个数组 
						classobj[classint]=tags[i]; 
					 
						classint++; 
					 
					} 
				 
				} 
			 
			} 
			 
			return classobj;//返回组成的数组 
			 
		},

		// 获取id
		getId:function(id){
			return document.getElementById(id);
		},

		// 把json转成url参数形式
		serializeUrl:function(json){
			var urlString='';
			for(var key in json){
				urlString+=key+'='+json[key]+"&";
			}
			urlString=urlString.substring(0,urlString.length-1);
			return urlString;
		},
		getUrlData:function(){
			var url=window.location.href;
			var data={
			};
			var dataString;
			var dataArray;
			var dataArray2;
			if(url.indexOf("?")<0){
				data['state']=0;
				return data;
			}else{
				data['state']=1;
				dataString=url.split("?")[1];
				dataArray=dataString.split("&");
				for(var i=0;i<dataArray.length;i++){
					dataArray2=dataArray[i].split("=");
					data[dataArray2[0]]=dataArray2[1];
				}
				return data;
			}
		},
		addClass:function( elements,cName ){ 
			var ts=this;
			if( !ts.hasClass( elements,cName ) ){ 
				elements.className += " " + cName; 
			}; 
		},
		hasClass:function( elements,cName ){ 
			return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
		},
		removeClass:function( elements,cName ){ 
			var ts=this;
			if( ts.hasClass( elements,cName ) ){ 
				elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换 
			}; 
		},
		isTel:function(tel){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/; 
			if(!myreg.test(tel)){ 
			    return false; 
			} else{
				return true;
			}
		},





		// 菜单树
		tree:function(data,param){
			if(!data){
				return '请传json数据参数！';
			}
			var ts=this;
			var options={
				treeParentClass:"tree-parent-class",
	         	treeUlClass:"tree-ul-class",
	         	treeLiClass:"tree-li-class",
	         	treeAlink:"http://www.xiaoweiba8.com"
			};
			
			var treeSetting=ts.options.treeOptions;
			if(param){
				options=ts.extend(options,param);
			}
			treeSetting.parent=ts.cEle("ul");
			treeSetting.parent.setAttribute("class",options.treeParentClass);
			// 结构处理
			return ts.treeController(data,treeSetting.parent,options);
		},
		treeController:function(data,parent,options){
			var calleeFn=arguments.callee;
			var ts=this;
			var treeSetting=ts.options.treeOptions;
			for(var key in data){
				 if (data[key].children.length > 0) {
				 	// if(options.)
				 	treeSetting.child = ts.cEle("li");
				 	treeSetting.child.setAttribute("class",options.treeLiClass);
				 	// 创建文本节点
				 	var textnode=ts.cText(data[key].name);
				 	var el_;
				 	if(data[key].link){
				 		var el_=ts.cEle("a");
				 		el_.setAttribute("href","javascript:void(0)");
				 	}else{
				 		var el_=ts.cEle("span");
				 	}
				 	
				 	
				 	var ulnode=ts.cEle("ul");
				 	ulnode.setAttribute("class",options.treeUlClass);
				 	el_.appendChild(textnode);
				 	treeSetting.child.appendChild(el_);
				 	treeSetting.child.appendChild(ulnode);
				 	parent.appendChild(treeSetting.child);

				 	ts.treeController(data[key].children,treeSetting.child.lastChild,options);
				 }else{
				 	var li=ts.cEle("li");
				 	var a=ts.cEle("a");
				 	if(data[key].link){
				 		a.setAttribute("href",data[key].link);
				 	}
				 	else{
				 		a.setAttribute("href",options.treeAlink);
				 	}
				 	li.setAttribute("class",options.treeLiClass);
				 	var text=ts.cText(data[key].name);
				 	a.appendChild(text);
				 	li.appendChild(a);
				 	parent.appendChild(li);
				 }
			}
			return parent;
		},

		// 提示
		tip:function(param){
			var ts=this;
			var txp_tip=ts.getClass("txp_tip");
			var options={
				seep:0,
				type:"loading",//loading text
				text:"加载中.........."
			};
			if(param){
				options=ts.extend(options,param);
			}
			var body=document.body;
			var imgSrc="data:image/gif;base64,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";
			var opacityBg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADAQMAAABs5if8AAAAA1BMVEUAAACnej3aAAAAAXRSTlOArV5bRgAAAApJREFUeF5jAAMAAAYAAdS1GSgAAAAASUVORK5CYII=";
			
			if(txp_tip.length<=0){
				var div=ts.cEle("div");
				div.setAttribute("class","txp_tip");
				var divStyle=div.style;
				// 样式控制
				ts.tipStyle(divStyle,opacityBg);
				// dom控制
				ts.tipDomSET(imgSrc,options,div);
				var w=div.clientWidth;
				divStyle.marginLeft=-(w/2)+"px";
				if(options.seep>0){
					setTimeout(function(){
						div.style.display="none";
					},options.seep);
				}
				return div;
			}else{
				if(options.seep==-1){
					txp_tip[0].style.display="none";
					return false;
				}
				txp_tip[0].style.display="block";
				txp_tip[0].innerHTML='';
				// dom控制
				ts.tipDomSET(imgSrc,options,txp_tip[0]);
				if(options.seep>0){
					setTimeout(function(){
						txp_tip[0].style.display="none";
					},options.seep);
				}
				return div;
			}
		},
		tipDomSET:function(imgSrc,options,div){
			var ts=this;
			var body=document.body;
			var txp_tip=ts.getClass("txp_tip");
			if(options.type=='loading'){
				var img=ts.cEle("img");
				var span_=ts.cEle("span");
				span_.style.paddingRight="5px";
				span_.style.verticalAlign="middle";

				img.src=imgSrc;
				img.style.marginBottom="-2px";
				img.setAttribute("width","20px");
				img.setAttribute("height","20px");
				span_.appendChild(img);
				div.appendChild(span_);
			}
			var span=ts.cEle("span");
			var text=ts.cText(options.text);
			span.appendChild(text);
			div.appendChild(span);
			if(txp_tip.length<=0){
				body.appendChild(div);
			}
		},
		tipStyle:function(divStyle,opacityBg){
			divStyle.height="50px";
			divStyle.padding="0px 15px 0px 15px";
			divStyle.textAlign="center";
			divStyle.borderRadius="15px";
			divStyle.color="#fff";
			divStyle.lineHeight="50px";
			divStyle.backgroundImage="url("+opacityBg+")";
			divStyle.position="fixed";
			divStyle.zIndex="999999999";
			divStyle.top="50%";
			divStyle.marginTop="-25px";
			divStyle.left="50%";
		},


		// ajax请求
		ajax:function(param){
			var ts=this;
			var data;
			var options={
				url:"",
				data:{

				},
				dataType:"json",
				type:"post",
				async:true,
				// 请求成功
				success:function(res){
					data=res;
				},
				// 服务器请求出错
				error:function(err){
					data=err;
				},
				// 请求之后
				httpBefore:function(state){

				},
				// 请求之前
				httpAfter:function(state){

				}
			};
			if(param){
				options=ts.extend(options,param);
			}
			if(options.type=="post"){
				options.type="POST";
			}else{
				options.type="GET";
			}
			// 发送请求之前调用
			options.httpAfter(0);
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			var urlData=ts.serializeUrl(options.data);
			if(options.type=="GET" || options.type=="get"){
				options.url+="?"+urlData;
			}
			 xhr.open(options.type,options.url,options.async);
			 xhr.onreadystatechange = function(){
				  if(xhr.readyState == 4){
					   if(xhr.status == 200){
					   		options.httpBefore(1);
					   		options.success(xhr.responseText);
					   }
					   else{
					   		options.error("服务器返回错误！");
					   }
				  }
			 };
			 
			 if(options.type=="POST" || options.type=="post"){
			 	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			 	if(!urlData){
			 		xhr.send();
			 	}
			 	else{
			 		xhr.send(urlData);
			 	}
			 }else{
			 	 xhr.send();
			 }
			return data;
		},


		// 分页
		paging:function(param){
			var ts=this;
			var options={
				total:50,
				pageSize:5,
				activeIndex:1,
				boxId:"paging-id",
				activeClick:function(res){},
				prevCallback:function(res){},
	            nextCallback:function(res){}
			};
			if(param){
				options=ts.extend(options,param);
			}
			return ts.pagingController(options,param);
		},
		pagingController:function(options){
			var ts=this;
			var pagingDiv=ts.cEle("div");
			pagingDiv.setAttribute("class","txp-pagingDivBox");
			var prevPaging=ts.cEle("a");
			prevPaging.setAttribute("class","txp-pagingPrev");
			prevPaging.innerHTML="上一页";
			prevPaging.style.border="1px solid #dedede";
			var remainderNumber;
			var floorNumber;
			var len_;
			if(parseInt(options.pageSize)%2!=0){
				remainderNumber=Math.round(parseInt(options.pageSize)/2);
				floorNumber=Math.floor(parseInt(options.pageSize)/2);
				len_=Math.floor(parseInt(options.pageSize)/2);
			}else{
				remainderNumber=parseInt(options.pageSize)/2;
				floorNumber=parseInt(options.pageSize)/2;
				len_=parseInt(options.pageSize)/2-1;
			}
			if(parseInt(options.activeIndex)>remainderNumber && parseInt(options.activeIndex)<parseInt(options.total)-floorNumber){
				for(var i=options.activeIndex-floorNumber;i<=parseInt(options.activeIndex)+len_;i++){
					if(i==options.activeIndex){
						var span=ts.cEle("span");
						span.setAttribute("class","txp-active");
						span.setAttribute("data-index",i);
						var spanStlye=span.style;
						spanStlye.marginLeft="10px";
						spanStlye.border="1px solid #dedede";
						span.innerHTML=i;
						pagingDiv.appendChild(span);
					}else{
						var a=ts.cEle("a");
						a.setAttribute("class","txp-link");
						a.setAttribute("data-index",i);
						a.style.marginLeft="10px";
						a.innerHTML=i;
						if(i==options.activeIndex-floorNumber+1){
							var lue=ts.cEle("span");
							lue.setAttribute("class","txp-lue");
							lue.style.marginLeft="10px";
							lue.innerHTML="...";
							pagingDiv.appendChild(lue);
						}
						if(i==parseInt(options.activeIndex)+len_){
							var lue=ts.cEle("span");
							lue.setAttribute("class","txp-lue");
							lue.style.marginLeft="10px";
							lue.innerHTML="...";
							pagingDiv.appendChild(lue);
						}
						pagingDiv.appendChild(a);
						a.onclick=function(){
							options.activeIndex=this.getAttribute("data-index");
							var elObj=ts.pagingController(options);
							ts.getId(options.boxId).innerHTML='';
							ts.getId(options.boxId).appendChild(elObj);
							options.activeClick(options.activeIndex);
						}
					}
					
				}	
			}
			else{
				var maxLen_i=1;
				var maxLen=options.pageSize;
				if(options.activeIndex>=options.total-floorNumber){
					maxLen_i=parseInt(options.total-options.pageSize)+1;
					maxLen=options.total;
				}
				for(var i=maxLen_i;i<=maxLen;i++){
					if(i==options.activeIndex){
						var span=ts.cEle("span");
						span.setAttribute("class","txp-active");
						span.setAttribute("data-index",i);
						var spanStlye=span.style;
						spanStlye.marginLeft="10px";
						spanStlye.border="1px solid #dedede";
						span.innerHTML=i;
						pagingDiv.appendChild(span);
					}else{
						var a=ts.cEle("a");
						a.setAttribute("class","txp-link");
						a.setAttribute("data-index",i);
						a.style.marginLeft="10px";
						a.innerHTML=i;
						// 当索引靠近最大索引时出现
						if(i==parseInt(options.total)-parseInt(options.pageSize)+2){
							var lue=ts.cEle("span");
							lue.setAttribute("class","txp-lue");
							lue.style.marginLeft="10px";
							lue.innerHTML="...";
							pagingDiv.appendChild(lue);
						}
						// 当索引靠近最小索引时出现
						if(i==options.pageSize){
							var lue=ts.cEle("span");
							lue.setAttribute("class","txp-lue");
							lue.style.marginLeft="10px";
							lue.innerHTML="...";
							pagingDiv.appendChild(lue);
						}
						pagingDiv.appendChild(a);
						a.onclick=function(){
							options.activeIndex=this.getAttribute("data-index");
							var elObj=ts.pagingController(options);
							ts.getId(options.boxId).innerHTML='';
							ts.getId(options.boxId).appendChild(elObj);
							options.activeClick(options.activeIndex);
						}
					}
					
				}	
				
					
			}
			
			return pagingDiv;
		}
	};
	window.txp_common=txp_common;
})(window,document);