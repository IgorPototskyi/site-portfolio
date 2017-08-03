$(function() {

	var theater;
	var isSkillsAnimated = false;
	initTheater();
	parseSkills();
	
	function initTheater() {
		setTheaterSize();
		theater = theaterJS({ "locale": 'en',
							  "minSpeed": 80,
  							  "maxSpeed": 150});
  
		// theater
		// 	.on('type:start, erase:start', function () {
		// 	// add a class to actor's dom element when he starts typing/erasing
		// 	var actor = theater.getCurrentActor()
		// 	actor.$element.classList.add('is-typing')
		// 	})
		// 	.on('type:end, erase:end', function () {
		// 	// and then remove it when he's done
		// 	var actor = theater.getCurrentActor()
		// 	actor.$element.classList.remove('is-typing')
		// 	});
		
		theater
			.addActor('typewriterHi', { accuracy: 0.9})
			.addActor('typewriterName', { accuracy: 0.9})
			.addActor('typewriterWeb', { accuracy: 0.9})
			.addActor('typewriterLike', { accuracy: 0.9});
			
		theater
			.addScene('typewriterHi:Hi!', 1000)
			.addScene('typewriterName:My name is Ihor Pototskyi.', 800)
			.addScene('typewriterWeb:I\'m a frontend web developer.', 800)
			.addScene('typewriterLike:And I really like it.', 600, -8, 'love it.', 600, -8, 'enjoy it!')
			.addScene(function() {
				initGsAnimation();
			});
	}

	function setTheaterSize() {
		var blockWidth = $('.welcome__laptop').innerWidth();
		$('.welcome__scene').css({'font-size': 40 - Math.floor((1000 - blockWidth) / 22)});
	}

	function initGsAnimation() {
		var tl = new TimelineMax();

		tl
			.to('#coffee3', 2, {opacity: 0})
			.to('#coffee2', 2, {opacity: 0})

		TweenMax.to('.nav', 1, {top: 0, opacity: 1, scale: 1});
		$('.welcome__esc').fadeOut();
		TweenMax.to('.welcome__scroll', 1, {bottom: 10, opacity: 1, scale: 1});
			// ease: Back.easeOut, 
	}

	function parseSkills() {
		var $skillsCont = $(".skills__cont");

        $.getJSON('json/skills.json', function(data) {
			var skills = data.slice();
			
            if (skills.length) {
                renderSkills(skills, $skillsCont);
            }
        });
	}
	
	function renderSkills(skills, $skillsCont) {
		var $item;
		var x, y, rotate;

		skills.forEach(function(element, i) {
			$item = $('#skillsItem').clone()
									.removeAttr('id')
                                    .removeAttr('style');

			$item.find('.skills__img').attr({'src': element.imageUrl, 
											 'alt': element.title})
									  .css({'width': element.width});
			$item.find('.skills__descr').text(element.title);

			x = getRandomInt(-20, 20) + 'px';
			y = getRandomInt(-20, 20) + 'px';
			rotate = getRandomInt(0, 360) + 'deg';

			$item.css({'left': x, 'top': y});
			$(".skills__item").get(i).style.setProperty("--rotate", rotate);

			$item.appendTo($skillsCont);
		});
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function skillsAnimate() {
		if (!isSkillsAnimated) {
			$('.skills__img').css('opacity', '0');
			TweenMax.staggerTo('.skills__img', 0.3, {opacity: 0.8}, 0.2);
			isSkillsAnimated = true;
		}
	} 
	

	// ----- EVENTS ------

	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			theater.stop();
			initGsAnimation();
		}
	});

	$(window).on('resize', function(e) {
		setTheaterSize();
	});

	$('a[href*="#"]:not([href="#"])').on('click', function(e) {
    	e.preventDefault();
    	$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
	});

	$('body').on('mouseenter', '.skills__circle', function(e) {
		const $self = $(this);
		$self.find('.skills__img').fadeOut(300);
		$self.find('.skills__descr').fadeIn(300);
	});
	
	$('body').on('mouseleave', '.skills__circle', function(e) {
		const $self = $(this);
		$self.find('.skills__img').fadeIn(300);
		$self.find('.skills__descr').fadeOut(300);
	});
	
	$(window).on('scroll', function(e) {
		var scroll = $(document).scrollTop();
		
		if (scroll > 0) skillsAnimate();
		if (scroll === 0) isSkillsAnimated = false;
	});
	
	

	// function initTypewriter() {
	// 	typewriter = new Typewriter(document.getElementById('welcomeTypewriter'), {deleteSpeed: "80"});

	// 	typewriter.pauseFor(2000)
	// 			  .typeString('Hi!')
	// 			  .pauseFor(2000)
	// 			  .typeString(' My name is Ihor Pototskyi.')
	// 			  .pauseFor(2000)
	// 			  .typeString(" I'm a frontend web developer.")
	// 			  .pauseFor(2000)
	// 			  .typeString(" And I really like it.")
	// 			  .pauseFor(1000)
	// 			  .deleteChars(8)
	// 			  .typeString('love it.')
	// 			  .pauseFor(1000)
	// 			  .deleteChars(8)
	// 			  .typeString('enjoy it!')
	// 			  .start();

	// 	console.log(typewriter);
	// }

	// function initParallax() {
	// 	var wrapper = $('.welcome__wrapper').get(0);
	// 	var parallax = new Parallax(wrapper);
	// }

	// function initScrollMagic() {
	// 	var controller = new ScrollMagic.Controller();

	// 	var tl = new TimelineMax();

	// 	tl
	// 		.to('.welcome__img-cont #coffee3', 2, {opacity: 0})
	// 		.to('.welcome__img-cont #coffee2', 2, {opacity: 0});

	// 	var pinIntroScene = new ScrollMagic.Scene({
	// 		triggerElement: '#pin-container',
	// 		triggerHook: 0,
	// 		duration: 1 * $(window).height()
	// 		// duration: '100%'
	// 	})
	// 	.setPin('#pin-container')
	// 	.setTween(tl)
	// 	.addTo(controller);
	// }



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
