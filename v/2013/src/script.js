function Ball(ctx, x, y) {
	var self = this;

	this.init = function(ctx, x, y) {
		self.ctx = ctx;
		self.radius = Math.floor(Math.random() * (MAXRADIUS - MINRADIUS) + MINRADIUS);
		self.x = x || Math.floor(Math.random() * MAXdX);
		self.y = y || Math.floor(Math.random() * MAXdY);
		self.color = randomColor({
			luminosity: "light"
		});
		self.gradientVector = self.generateGradient();
	}

	this.generateGradient = function() {
		var RANGE = 10;
		var f = function() {
			return Math.floor(Math.random() * ((RANGE*2)+1)) - RANGE;
		}
		var vec = [f(), f()];
		return (vec[0] == 0 && vec[1] == 0) ? self.generateGradient():vec;
	}

	this.draw = function() {
		self.ctx.beginPath();
		self.ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI, false);
		self.ctx.fillStyle = self.color;
		self.ctx.fill();
		self.x += self.gradientVector[0];
		self.y += self.gradientVector[1];
	}

	this.inSpace = function() {
		return ((self.x >= 0 && self.x <= MAXdX) || (self.y >= 0 && self.y <= MAXdY));
	}

	this.init(ctx, x, y); // Call initializer
}

var canvas = document.getElementById('space');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var MAXdX = canvas.offsetWidth;
var MAXdY = canvas.offsetHeight;
var MINRADIUS = 5;
var MAXRADIUS = 15;
var MYBALLS = [];
for(var i = 0; i < 100; i++) {
	MYBALLS.push(new Ball(ctx));
}

setInterval(function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	MAXdX = canvas.offsetWidth;
	MAXdY = canvas.offsetHeight;
	for(var i = 0; i < MYBALLS.length; i++) {
		if(MYBALLS[i].inSpace()) {
			MYBALLS[i].draw();
		} else {
			MYBALLS[i] = new Ball(ctx);
			MYBALLS[i].draw();
		}
	}
}, 30);

function burst(e, amount) {
	for(var i = 0; i < amount; i++) {
		MYBALLS.push(new Ball(ctx, e.pageX, e.pageY));
	}
}

CLICKING = false;
document.addEventListener('mousedown', function(e) {
	CLICKING = true;
	burst(e, 50);
}, false);
document.addEventListener('mouseup', function(e) {
	CLICKING = false;
}, false);
document.addEventListener('mousemove', function(e) {
	if(CLICKING) {
		burst(e, 1);
	}
}, false);

var cont = document.getElementById('container'), OPACITY = 0;
var contFadeIn = setInterval(function() {
	if(OPACITY < 1) {
		cont.style.opacity = (OPACITY += 0.01);
	} else {
		clearInterval(contFadeIn);
	}
}, 20);

function centerCont() {
	cont.style.left = ((window.innerWidth/2) - (cont.offsetWidth/2))+"px";
	cont.style.top = ((window.innerHeight/2) - (cont.offsetHeight/2))+"px";
}

window.onresize = centerCont;
centerCont();
