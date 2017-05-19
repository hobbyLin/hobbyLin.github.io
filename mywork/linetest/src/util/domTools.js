//原生dom操作一些函数
export default{
	//取
	$(selector){
		return document.querySelector(selector);
	},
	//判断是否有class
	hasClass(ele, cls) { 
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
	},
	setClass(ele, cls) { 
		ele.setAttribute('class', cls); 
	},
	//获取偏移
	getOffset(elem) {    
    	let docElem = document.documentElement; 
    	let box = elem.getBoundingClientRect();  
	    return {  
            top: box.top  +  docElem.scrollTop ,  
            left: box.left + docElem.scrollLeft   
		}
	}
}