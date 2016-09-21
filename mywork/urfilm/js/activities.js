   var canvas=document.getElementById("canvas");
   var ctx=canvas.getContext('2d');
   //画雨
   function drawRain(x,y){
   	  ctx.save();
      ctx.fillStyle='rgb(128,138,135)'; 
      //ctx.rotate(15*Math.PI/180);
      ctx.fillRect(x,y,3,20);
      ctx.fill();
      ctx.restore();
   }
  //随机生成
  function dropRain(){
  	var ele={
       x:parseInt(Math.random()*canvas.width),
       y:parseInt(Math.random()*canvas.height)
      };
    var nx=ele.x,ny=0;
    function move(){
    	ctx.clearRect(nx,ny,3,20);
    	nx+=2;ny+=10;
    	drawRain(nx,ny);
    }
    setInterval(move,100);   
  }

 setInterval(dropRain,100);