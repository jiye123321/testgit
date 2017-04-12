
function getStyle(obj,name)     //去除offsetLeft
{
	if(obj.currentStyle)
	{
			return obj.currentStyle[name];
		}
		else
		{
			return getComputedStyle(obj,false)[name];
		}
	};
	function startMove(obj,json,fnEnd)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bStop=true;  //假设所有的值都已经到了
			for(var attr in json)
			{
			var cur=0;     //parseInt:把字符串转换为整数
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);//因为计算机算的不精确，可能会出现小数，所以四舍五入精确下
			}
			else
			{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
				bStop=false;
				
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opcity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
			}
			if(bStop)
			{
				clearInterval(obj.timer);
				if(fnEnd)fnEnd();
			}
		},30);
};