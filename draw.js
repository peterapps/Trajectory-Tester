var height = 30; //Height of robot in inches
var length = 36; //Length of robot in inches

var pixelsToInches = 2; //multiply inches by this to get pixels

var canvas, ctx, boilerW, boilerH, boilerX, boilerY, robotW, robotH, robotX, robotY;
function loadCanvas(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	boilerW = 42 * pixelsToInches; //3 ft 6 in (42 in) wide
	boilerH = 97 * pixelsToInches; //8ft 1 in (97 in) tall
	boilerX = parseInt(canvas.width) - boilerW - 100;
	boilerY = parseInt(canvas.height) - boilerH;
	ctx.fillStyle = "red";
	ctx.fillRect(boilerX, boilerY, boilerW, boilerH);
	
	robotW = length * pixelsToInches;
	robotH = height * pixelsToInches;
	robotX = boilerX - distance - robotW;
	robotY = parseInt(canvas.height) - robotH;
	ctx.fillStyle = "gray";
	ctx.fillRect(robotX, robotY, robotW, robotH);
}
function fire(){
	draw();
	var startX = robotX + robotW/2;
	var startY = parseInt(canvas.height) - robotH;
	//Horizontal line
	ctx.strokeStyle = "purple";
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(canvas.width, startY);
	ctx.stroke();
	for (var i = 0; i < angleArr.length; i++){
		var ang = angleArr[i];
		var velocityX = velocity * Math.cos(ang * Math.PI / 180);
		var velocityY = velocity * Math.sin(ang * Math.PI / 180);
		ctx.strokeStyle = colors[i];
		ctx.beginPath();
		ctx.arc(startX, startY, 100 + (i * 50), 0, -(ang * Math.PI / 180), true);
		ctx.stroke();
		for (var x = 0; x < parseInt(canvas.width) - robotX; x++){
			var t = x / velocityX;
			var y = parseInt(canvas.height) - ((velocityY * t) - (0.5 * 386.09 * Math.pow(t,2)));
			var drawX = robotX + robotW/2 + x;
			var drawY = y - robotH;
			ctx.fillStyle = colors[i];
			ctx.fillRect(drawX, drawY, 2, 2);
			if (y > parseInt(canvas.height) + robotH) break;
			if (drawY > boilerY && drawX > boilerX) break;
		}
	}
}
