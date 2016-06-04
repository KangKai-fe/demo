# Canvas 常用API
##目录
* 基本结构
* 线条
* 线条属性
* 图形变换
* 填充样式
* 曲线
* 文字渲染
* 其他

###基本结构
HTML:

	<canvas id=“canvas”></canvas>

JavaScript:

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	// 使用context进行绘制
	
	*canvas.width
	*canvas.height
	*canvas.getContext('2d')
	
###线条
	// 状态设置
	context.moveTo(x, y);
	context.lineTo(x, y);
	
	context.beginPath();
	context.closePath();
	
	context.lineWidth = num;
	context.strokeStyle = string;
	context.fillStyle = string;
	
	// 绘制: 一般先填充后描边, 防止边被覆盖
	context.fill();		// 填充
	context.stroke();	// 描边
	
	context.rect(x, y, width, height);
	context.fillRect(x, y, width, height);
	context.strokeRect(x, y, width, height);

###线条属性
	context.lineWidth = num;

	context.lineCap = 
		'butt'(default)
		'round'
		'square'

	context.lineJoin = 
		'miter'(default)
		'bevel'
		'round'
	
	context.miterLimit = num;

###图形变换
	context.save();				// 状态保存
	context.restore();			// 状态恢复
	
	context.translate(x, y);	// 位移
	context.rotate(deg);		// 旋转
	context.scale(sx, sy);		// 缩放
	
	context.transform(a, b, c, d, e, f);	// 变换矩阵
	context.setTransform(a, b, c, d, e, f);
	a: 水平缩放
	b: 水平倾斜
	c: 垂直倾斜
	d: 垂直缩放
	e: 水平位移
	f: 垂直位移

###填充样式
	context.fillStyle =
		color 
		gradient 
		image
		canvas
		video
	// strokeStyle与fillStyle相似;
	
context.fillStyle = color;

	#ffffff
	#642
	rgb( 255 , 128 , 0 )
	rgba( 100 , 100 , 100 , 0.8 )
	hsl( 20 , 62% , 28% )
	hsla( 40 , 82% , 33% , 0.6 )
	red
	
context.fillStyle = gradient;

	Linear Gradient:
		var grd = context.createLinearGradient(xstart, ystart, xend, yend);
	Radial Gradient:
		var grd = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
		
		grd.addColorStop( stop , color );

context.fillStyle = image || canvas || video;

	context.createPattern(img, repeat-style);
	context.createPattern(canvas, repeat-style);
	context.createPattern(video, repeat-style);
	
	repeat-style:
		no-repeat 
		repeat-x
		repeat-y
		repeat 

###曲线
	context.arc(
		centerx, centery, radius,
		startingAngle, endingAngle,
		anticlockwise = false 	// 默认顺时针
	);
	
	// 绘制出的曲线不一定过起始点和终止点, 但是一定会和起始点控制点连线, 终止点控制点连线相切
	context.moveTo(x0, y0);		// 起始点
	context.arcTo(
		x1, y1,					// 控制点
		x2, y2, 				// 终止点
		radius 					// 半径
	);
	
	// 贝塞尔二次曲线QuadraticCurveTo, 绘制出的曲线过起始点和终止点
	context.moveTo(x0, y0);		// 起始点
	context.arcTo(
		x1, y1,					// 控制点
		x2, y2	 				// 终止点
	);
	
	// 贝塞尔三次曲线BezierCurveTo, 绘制出的曲线过起始点和终止点
	context.moveTo(x0, y0);		// 起始点
	context.arcTo(
		x1, y1,					// 控制点
		x2, y2,	 				// 终止点
	);
