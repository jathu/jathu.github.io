var SPACE = document.getElementById('space'),
CTX = SPACE.getContext('2d'), 
H = 0,
PATH = [];

function draw(alt) {
	CTX.clearRect(0,0, SPACE.width, SPACE.height);
	var now = Date.now();
	for(var i = 0; i < PATH.length - 1; i++) {
		var alpha = 1 - (now - PATH[i][3])/1500;
		if(alpha > 0.001) {
			CTX.beginPath();
			CTX.moveTo(PATH[i][0], PATH[i][1]);
			CTX.lineTo(PATH[i+1][0], PATH[i+1][1]);
			CTX.strokeStyle = "hsla("+PATH[i][2]+",100%, 50%, "+alpha+")";
			CTX.lineWidth = 2;
			CTX.stroke();
		}
	}
	if(!!alt) H = (H < 359) ? H+1:0;
}

function update() {
	SPACE.width = window.innerWidth;
	SPACE.height = window.innerHeight;

	var container = document.getElementById('container');
	container.style.marginLeft = Math.floor(container.offsetWidth/-2)+"px";
	container.style.marginTop = Math.floor(container.offsetHeight/-2)+"px";
}

window.onload = function() {
	update();
	document.addEventListener('mousemove', function(e) {
		PATH.push([e.clientX, e.clientY, H, Date.now()]);
		draw(true);
	}, false);
	setInterval(draw, 1);
};

window.onresize = update;