//var WINDOW_WIDTH = 1024;//网页宽度
//var WINDOW_HEIGHT = 768;//网页高度
//var RADIUS = 8;//半径
//var MARGIN_TOP = 60;//起始点距上边高度(x)
//var MARGIN_LEFT = 30;//起始点距左边高度(y)
const endTime=new Date(2019,2,29,21,2,33);

var curShowTimeSeconds=0;//显示时间
var balls=[];//球的数组
const colors=["#9400D3","#ff1493","#00BFFF","#FFD700","#a52a2a","#7FFF00","#FF8C00","#008000"];//球的颜色



window.onload=function() {
    WINDOW_WIDTH=document.body.clientWidth;
    WINDOW_HEIGHT=document.body.clientHeight;
    MARGIN_LEFT= Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
    var canvas = document.getElementById("canvas");//定义一个画布
    var context = canvas.getContext("2d");//定义画布是2D
    canvas.width = WINDOW_WIDTH;//画布的宽度是屏幕的宽度
    canvas.height = WINDOW_HEIGHT;//画布的高度是屏幕的高度
    curShowTimeSeconds=getCurShowSeconds();//显示的时间等于现在的时间
    setInterval(function() {//定时调用函数（注意一下）（参数为两个，一个匿名函数，一个时间）建议使用webstrom查看
        updata()
        render(context);//时间获取函数
    }, 50);

}

function getCurShowSeconds(){//获取的时间戳
    var cutTime=new Date()//获取电脑的时间
    var ret=endTime.getTime()-cutTime.getTime()
    ret=Math.round(ret/1000)
    return ret>=0 ? ret:0;
}
function updata(){//更新时间
    var nextShowTimeSeconds=getCurShowSeconds();

   var nextHours=parseInt(nextShowTimeSeconds / 3600);
   var nextMintes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds % 60;

   var cutHours=parseInt(curShowTimeSeconds / 3600);
    var cutMintes=parseInt((curShowTimeSeconds-cutHours*3600)/60);
    var cutSeconds=curShowTimeSeconds % 60;

    if(nextSeconds != cutSeconds){

        if(parseInt(cutHours/10)!=parseInt(cutHours/10));

        if(parseInt(cutHours%10 )!= parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(cutHours%10));
        }
       if(parseInt(cutMintes/10) != parseInt(nextMintes/10)) {
           addBalls(MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(cutMintes/10));
       }
       if(parseInt(cutMintes%10 )!= parseInt(nextMintes%10)){
           addBalls(MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(cutMintes%10));
       }
       if (parseInt(cutSeconds/10 )!= parseInt(nextSeconds/10) ){
           addBalls(MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(cutSeconds/10));
       }
       if (parseInt(cutSeconds%10) != parseInt(nextSeconds%10)) {
           addBalls(MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10));
       }
    curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
    console.log(balls.length);
}

function  updateBalls() {
    for( var i =0;i< balls.length;i++)
    {
        balls[i].x +=balls[i].vx;
        balls[i].y +=balls[i].vy;
        balls[i].vy +=balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy= - balls[i].vy*0.75;
    }
}
    //删掉离开页面的小球
    var count=0;
    for(var i=0;i<balls.length;i++)
        if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH)
        balls[count++]=balls[i]
    while(balls.length>count){
            balls.pop();
    }


}
function addBalls( x, y, num ) {
    for (var i = 0; i < digit[num].length; i ++)//遍历i行有1的就填充
        for (var j = 0; j < digit[num][i].length; j ++)//遍历j列的就填充
            if (digit[num][i][j] == 1){
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall)
            }
}
function  render( cxt) {//时间获取函数
    /*var myData=new Date()//获取现在的时间戳
    var hours=myData.getHours();
    var mintes=myData.getMinutes();
    var seconds=myData.getSeconds();
   // var hours=12;
   // var mintes=56;
  //  var seconds=30;
*/
    cxt.clearRect(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=parseInt(curShowTimeSeconds / 3600);
    var mintes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit( MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
   // renderDigit( MARGIN_LEFT+14*(RADIUS + 1) ,MARGIN_TOP,parseInt(mintes%10),cxt);
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )//矩阵的宽度为7个像素点，为了美观多加了半个像素点
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(mintes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(mintes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
     for( var i =0;i < balls.length ;i ++){
         cxt.fillStyle=balls[i].color;
         cxt.beginPath();
         cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
         cxt.closePath();
         cxt.fill();
     }

}

function  renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";//填充的颜色
    for (var i = 0; i < digit[num].length; i++)//遍历i行有1的就填充
        for (var j = 0; j < digit[num][i].length; j++)//遍历j列的就填充
            if (digit[num][i][j] == 1){
                cxt.beginPath();
            cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);//画圆的要求
            cxt.closePath();//开始封闭
            cxt.fill()//开始填充
        }
}
