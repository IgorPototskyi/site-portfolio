$(function() {

	initTypewriter();
	// initParallax();
	// initScrollMagic();
	initGsAnimation();

	function initTypewriter() {
		var typewriter = new Typewriter(document.getElementById('welcomeTypewriter'), {deleteSpeed: "80"});

		typewriter.pauseFor(3000)
				  .typeString('Hi!')
				  .pauseFor(2000)
				  .typeString(' My name is Ihor Pototskyi.')
				  .pauseFor(2000)
				  .typeString(" I'm a frontend web developer.")
				  .pauseFor(2000)
				  .typeString(" And I really like it.")
				  .pauseFor(1000)
				  .deleteChars(8)
				  .typeString('love it.')
				  .pauseFor(1000)
				  .deleteChars(8)
				  .typeString('enjoy it!')
				  .start();
	}

	function initParallax() {
		var wrapper = $('.welcome__wrapper').get(0);
		var parallax = new Parallax(wrapper);
	}

	function initScrollMagic() {
		var controller = new ScrollMagic.Controller();

		var tl = new TimelineMax();

		tl
			.to('.welcome__img-cont #coffee3', 2, {opacity: 0})
			.to('.welcome__img-cont #coffee2', 2, {opacity: 0});

		var pinIntroScene = new ScrollMagic.Scene({
			triggerElement: '#pin-container',
			triggerHook: 0,
			duration: 1 * $(window).height()
			// duration: '100%'
		})
		.setPin('#pin-container')
		.setTween(tl)
		.addTo(controller);
	}

	function initGsAnimation() {
		var tl = new TimelineMax();

		tl
			.to('.welcome__img-cont #coffee3', 2, {opacity: 0})
			.to('.welcome__img-cont #coffee2', 2, {opacity: 0});
	}

	// createCanvas();

	// function createCanvas() {
	// 	var canvas = document.getElementById('canvas');
	// 	console.log(canvas);
	// 	var ctx = canvas.getContext('2d');

	// 	var shapes = [];
	// 	var num = 50;

	// 	var staticXpos;
	// 	var staticYpos;

	// 	var opt = {
	// 		shapecolor: "#fff",
	// 		radius: 2,
	// 		distance: 200,
	// 		circleopacity: 1,
	// 		speed: .5
	// 	};

	// 	var w = canvas.width = window.innerWidth;
	// 	var h = canvas.height = window.innerHeight;

	// 	addEventListener('resize', function() {
	// 		w = canvas.width = window.innerWidth;
	// 		h = canvas.height = window.innerHeight;
	// 	});
	// 	//helper functions
	// 	function random(min, max) {
	// 		return Math.floor(Math.random() * (max - min + 1) + min);
	// 	}

	// 	function clearcanvas() {
	// 		ctx.clearRect(0, 0, w, h);
	// 	}

	// 	function getCords(e) {
	// 		var rect = canvas.getBoundingClientRect();
	// 		return {
	// 			x: e.clientX - rect.left,
	// 			y: e.clientY - rect.top
	// 		};
	// 	}

	// 	function createShapes(Xpos, Ypos) {
	// 		this.x = Xpos ? Xpos : random(0, w);
	// 		this.y = Ypos ? Ypos : random(0, h);
	// 		this.speed = opt.speed;
	// 		this.vx = Math.cos(random(0, 360)) * this.speed;
	// 		this.vy = Math.sin(random(0, 360)) * this.speed;
	// 		this.r = opt.radius;
	// 		this.color = opt.shapecolor;
	// 		this.opacity = opt.circleopacity;
	// 		this.draw = function() {
	// 			ctx.beginPath();
	// 			ctx.globalCompositeOperation = 'source-over';
	// 			ctx.globalAlpha = this.opacity;
	// 			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
	// 			ctx.closePath();
	// 			ctx.fillStyle = this.color;
	// 			ctx.fill();
	// 		};

	// 		this.move = function() {
	// 			this.x += this.vx;
	// 			this.y += this.vy;
	// 			if (this.x >= w || this.x <= 0) {
	// 			this.vx *= -1;
	// 			}
	// 			if (this.y >= h || this.y <= 0) {
	// 			this.vy *= -1;
	// 			}
	// 			this.x > w ? this.x = w : this.x;
	// 			this.y > h ? this.y = h : this.y;
	// 			this.x < 0 ? this.x = 0 : this.x;
	// 			this.y < 0 ? this.y = 0 : this.y;
	// 		};
	// 	}

	// 	function check(point1, rest) {
	// 		for (var j = 0; j < rest.length; j++) {
	// 			var yd = point1.y - rest[j].y;
	// 			var xd = point1.x - rest[j].x;
	// 			var d = Math.sqrt(xd * xd + yd * yd);
	// 			if (d < opt.distance) {
	// 			ctx.beginPath();
	// 			ctx.globalAlpha = (1 - (d / opt.distance));
	// 			ctx.globalCompositeOperation = 'destination-over';
	// 			ctx.lineWidth = 1;
	// 			ctx.moveTo(point1.x, point1.y);
	// 			ctx.lineTo(rest[j].x, rest[j].y);
	// 			ctx.strokeStyle = opt.shapecolor;
	// 			ctx.lineCap = "round";
	// 			ctx.closePath();
	// 			ctx.stroke();
	// 			}
	// 		}
	// 	}

	// 	function loop() {
	// 		clearcanvas();
	// 		shapes[0].x = staticXpos;
	// 		shapes[0].y = staticYpos;
	// 		shapes[0].move();
	// 		shapes[0].draw();
	// 		for (var i = 1; i < shapes.length; i++) {
	// 			shapes[i].move();
	// 			shapes[i].draw();
	// 			check(shapes[i], shapes);
	// 		}
	// 		window.requestAnimationFrame(loop);
	// 	}

	// 	function init() {
	// 	for (var i = 0; i < num; i++) {
	// 		shapes.push(new createShapes());
	// 	}
	// 	window.requestAnimationFrame(loop);
	// 	}

	// 	//events
	// 	canvas.addEventListener('mousemove', function(e) {
	// 	var pos = getCords(e);
	// 	staticXpos = pos.x;
	// 	staticYpos = pos.y;
	// 	});
	// 	canvas.addEventListener('click', function(e) {
	// 	var pos = getCords(e);
	// 	shapes.push(new createShapes(pos.x, pos.y));
	// 	});
	// 	canvas.addEventListener("contextmenu", function(e) {
	// 	e.preventDefault();
	// 	shapes.splice(shapes.length - 1, 1);
	// 	});

	// 	init();
	// };

});
