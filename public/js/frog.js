var btnPlay = document.getElementById('btn-play');
var btnCredits = document.getElementById('btn-credits');
var btnPlayWin = document.getElementById('btn-play-win');
var btnCreditsWin = document.getElementById('btn-credits-win');
var btnBack = document.getElementById('btn-back');
var btnTry = document.getElementById('btn-try');
var screens = document.getElementsByClassName('screen');
var frog = document.getElementById('frog');
var cars = document.getElementsByClassName('car');
var snMenu = document.getElementById('sound-menu');
var snPlay = document.getElementById('sound-play');
var snCrash = document.getElementById('sound-crash');
var lives = document.querySelectorAll('ul li.heart.active');

btnPlay.onmouseover = function () {
	game.addBtnFx(this);
}
btnPlay.onmouseout = function () {
	game.removeBtnFx(this);
}
btnPlay.onclick = function () {
	game.screenTo(0, 1);
	game.start();
}
btnPlayWin.onmouseover = function () {
	game.addBtnFx(this);
}
btnPlayWin.onmouseout = function () {
	game.removeBtnFx(this);
}
btnPlayWin.onclick = function () {
	game.screenTo(0, 1);
	game.start();
}
btnCredits.onmouseover = function () {
	game.addBtnFx(this);
}
btnCredits.onmouseout = function () {
	game.removeBtnFx(this);
}
btnCredits.onclick = function () {
	game.screenTo(0, 2);
}



btnCreditsWin.onmouseover = function () {
	game.addBtnFx(this);
}
btnCreditsWin.onmouseout = function () {
	game.removeBtnFx(this);
}
btnCreditsWin.onclick = function () {
	game.screenTo(0, 2);
}




btnBack.onmouseover = function () {
	game.addBtnFx(this);
}
btnBack.onmouseout = function () {
	game.removeBtnFx(this);
}
btnBack.onclick = function () {
	game.screenTo(2, 0);
}
btnTry.onmouseover = function () {
	game.addBtnFx(this);
}
btnTry.onmouseout = function () {
	game.removeBtnFx(this);
}
btnTry.onclick = function () {
	window.location.replace('index.html');
}

var game = {
	postLeft: 368,
	postTop: 480,
	start: function () {
		this.activeSound();
		this.moveFrog();
		this.renderCars();
		this.randomCars();
	},
	activeSound: function () {
		snMenu.pause();
		snMenu.currentTime = 0;
		snPlay.play();
	},
	addBtnFx: function (btn) {
		btn.classList.add('animated', 'heartBeat', 'infinite');
	},
	removeBtnFx: function (btn) {
		btn.classList.remove('animated', 'heartBeat', 'infinite');
	},
	renderCars: function () {
		for (var i = 0; i < 6; i++) {
			let div = document.createElement('div');
			div.setAttribute('class', 'car');
			screens[1].appendChild(div);
		}
	},
	moveFrog: function () {
		document.onkeydown = function (event) {
			if (event.keyCode == 37) {
				if (game.postLeft > 8) {
					game.postLeft -= 60;
					frog.style.left = game.postLeft + 'px';
				}
				game.jumpFrog();
			}
			if (event.keyCode == 39) {
				if (game.postLeft < 728) {
					game.postLeft += 60;
					frog.style.left = game.postLeft + 'px';
				}
				game.jumpFrog();
			}
			if (event.keyCode == 38) {
				if (game.postTop > 0) {
					game.postTop -= 60;
					frog.style.top = game.postTop + 'px';
					if (game.postTop == 0) {
						game.nextLevel();
					}
				}
				game.jumpFrog();
			}
			if (event.keyCode == 40) {
				if (game.postTop < 480) {
					game.postTop += 60;
					frog.style.top = game.postTop + 'px';
				}
				game.jumpFrog();
			}
		}
	},
	randomCars: function () {
		var lt = -100; // left
		var tp = 480;  // top 
		var rt = 0;    // rotate
		var tm = 70;   // time
		var dr = 'r';  // direction
		for (var i = 0; i < cars.length; i++) {
			let rndcar = Math.round(Math.random() * 5);
			if (i == 3) {
				lt = 810;
				tp -= 60;
				rt = 180;
				dr = 'l';
			}
			tp -= 60;
			tm -= 10;
			cars[i].style.top = tp + 'px';
			cars[i].style.left = lt + 'px';
			cars[i].style.transform = 'rotate(' + rt + 'deg)';
			cars[i].classList.add('car' + rndcar);
			this.moveCars(cars[i], tm, dr);
		}
	},
	moveCars: function (car, tme, dir) {
		let posL = -100;
		let posR = 810;
		setInterval(function () {
			game.checkCollides(car, frog);
			if (dir == 'r') {
				if (posL < 810) {
					posL += 10;
					car.style.left = posL + 'px';
				} else {
					posL = -100;
					game.changeColorCar(car);
				}
			} else {
				if (posR > -100) {
					posR -= 10;
					car.style.left = posR + 'px';
				} else {
					posR = 810;
					game.changeColorCar(car);
				}
			}
		}, tme);
	},
	changeColorCar: function (car) {
		let rndcar = Math.round(Math.random() * 5);
		car.classList.remove('car0', 'car1', 'car2', 'car3', 'car4', 'car5');
		car.classList.add('car' + rndcar);
	},
	jumpFrog: function () {
		frog.classList.add('animated', 'faster', 'heartBeat');
		setTimeout(function () {
			frog.classList.remove('animated', 'faster', 'heartBeat');
		}, 360);
	},
	screenTo: function (start, final) {
		screens[start].classList.remove('bounceInUp');
		screens[start].classList.add('bounceOutDown');
		setTimeout(function () {
			screens[start].classList.remove('bounceOutDown');
			screens[start].classList.add('hide');
			screens[final].classList.remove('hide');
			screens[final].classList.add('animated', 'bounceInUp');
		}, 800);
	},
	resetFrog: function (frog) {
		snCrash.play();
		setTimeout(function () {
			snCrash.stop();
			snCrash.currentTime = 0;
		}, 500);
		screens[1].classList.remove('bounceInUp');
		screens[1].classList.add('shake');
		setTimeout(function () {
			screens[1].classList.remove('shake');
		}, 500);
		this.postLeft = 368,
			this.postTop = 480,
			frog.style.left = this.postLeft + 'px';
		frog.style.top = this.postTop + 'px';
	},
	checkLives: function () {
		lives[lives.length - 1].classList.remove('active');
		lives = document.querySelectorAll('ul li.heart.active');
		if (lives.length < 1) {
			snPlay.pause();
			snPlay.currentTime = 0;
			snMenu.play();
			game.screenTo(1, 3);
		}
	},
	checkCollides: function (car, frog) {
		cartop = car.offsetTop;
		carleft = car.offsetLeft;
		carright = Number(car.offsetLeft) + Number(car.offsetWidth);
		carbottom = Number(car.offsetTop) + Number(car.offsetHeight);

		frogtop = frog.offsetTop;
		frogleft = frog.offsetLeft;
		frogright = Number(frog.offsetLeft) + Number(frog.offsetWidth);
		frogbottom = Number(frog.offsetTop) + Number(frog.offsetHeight);

		if (carright > frogleft &&
			carleft < frogright &&
			cartop < frogbottom &&
			carbottom > frogtop) {
			this.resetFrog(frog);
			this.checkLives();
		}
	},
	nextLevel: function () {
		cars[3].style.transform = 'rotateY(180deg)';
		cars[4].style.transform = 'rotateY(180deg)';
		cars[5].style.transform = 'rotateY(180deg)';
		screens[1].classList.add('road2');
		screens[1].classList.remove('bounceInUp');
		screens[1].classList.add('shake');
		setTimeout(function () {
			screens[1].classList.remove('shake');
		}, 500);
		this.postLeft = 368,
			this.postTop = 480,
			frog.style.left = this.postLeft + 'px';
		frog.style.top = this.postTop + 'px';
	},
	winGame: function () {
		screens[2].classList.remove('road2');
		screens[2].classList.add('bg-win');
		screens[2].classList.remove('bounceInUp');
		screens[2].classList.add('shake');
		setTimeout(function () {
			screens[2].classList.remove('shake');
		}, 500);

	}
};
game.winGame();
