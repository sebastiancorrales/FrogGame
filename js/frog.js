var btnPlay = document.getElementById('btn-play')
var btnCredits = document.getElementById('btn-credits')
var btnBack = document.getElementById('back')
var screens = document.getElementsByClassName('screen')
var frog = document.getElementById('frog')
var cars = document.getElementsByClassName('car')
var snMenu = document.getElementById('sound-menu')
var snPlay = document.getElementById('sound-play')
var lives = 3


btnPlay.onmouseover = () => btnPlay.classList.add('animated', 'tada', 'infinite')
btnPlay.onmouseout = () => btnPlay.classList.remove('animated', 'tada', 'infinite')
btnPlay.onclick = () => game.screenTo(0, 1)

btnCredits.onmouseover = () => btnCredits.classList.add('animated', 'tada', 'infinite')
btnCredits.onmouseout = () => btnCredits.classList.remove('animated', 'tada', 'infinite')
btnCredits.onclick = () => game.screenTo(0, 2)

btnBack.onmouseover = () => btnBack.classList.add('animated', 'tada', 'infinite')
btnBack.onmouseout = () => btnCredits.classList.remove('animated', 'tada', 'infinite')
btnBack.onclick = () => game.screenTo(2, 0)

var game = {
    posLeft: 370,
    posTop: 490,
    startGame: function () {
        this.activeSound()
        this.moveFrog()
        this.renderCars()
        this.randomCars()
    },
    activeSound: function () {
        snMenu.pause()
        snMenu.currentTime = 0
        snMenu.play()
    },
    moveFrog: function () {
        document.onkeydown = event => {
            switch (event.keyCode) {
                // Izquierda
                case 37:
                    if (game.posLeft > 30) {
                        game.posLeft -= 60
                        frog.style.left = game.posLeft + 'px';
                    }
                    game.jumpFrog()
                    break
                // Arriba
                case 38:
                    if (game.posTop > 20) {
                        game.posTop -= 60
                        frog.style.top = game.posTop + 'px';
                    }
                    game.jumpFrog()
                    break
                // Derecha
                case 39:
                    if (game.posLeft < 700) {
                        game.posLeft += 60
                        frog.style.left = game.posLeft + 'px';
                    }
                    game.jumpFrog()
                    break
                // Abajo
                case 40:
                    if (game.posTop < 480) {
                        game.posTop += 60
                        frog.style.top = game.posTop + 'px';
                    }
                    game.jumpFrog()
                    break
            }
        }
    },
    randomCars: function () {
        var lt = -100 //Left
        var tp = 490 // top
        var rt = 0 //Rotate
        var tm = 70 //Time
        var dr = 'r' //Direction

        for (let i = 0; i < cars.length; i++) {
            let ranCar = Math.round(Math.random() * 5)
            if (i == 3) {
                lt = 810
                tp -= 60
                rt = -0
                dr = 'l'
            }
            tp -= 60
            tm -= 10
            cars[i].style.top = tp + 'px'
            cars[i].style.left = lt + 'px'
            cars[i].style.transform = 'rotate(' + rt + 'deg)'
            cars[i].classList.add('car' + ranCar)

            this.moveCars(cars[i], tm, dr)
        }
    },
    moveCars: function (car, tme, dir) {
        let posL = -100
        let posR = 810
        setInterval(function () {
            game.checkCollides(car, frog)
            if (dir == 'r') {
                if (posL < 810) {
                    posL += 10
                    car.style.left = posL + 'px'
                } else {
                    posL = -100
                    game.changeColorCar(car)
                }
            } else {
                if (posR > -100) {
                    posR -= 10
                    car.style.left = posR + 'px'
                }
                else {
                    posR = 810
                    game.changeColorCar(car)
                }
            }
        }, tme)
    },
    jumpFrog: function () {
        frog.classList.add('animated', 'heartBeat')
        setTimeout(() => frog.classList.remove('animated', 'heartBeat'), 360)
    },
    renderCars: function () {
        for (var i = 0; i < 6; i++) {
            let div = document.createElement('div')
            div.setAttribute('class', 'car')
            screens[1].appendChild(div)
        }
    },
    screenTo: function (start, final) {
        screens[start].classList.remove('bounceInUp')
        screens[start].classList.add('bounceOutDown')
        setTimeout(function () {
            screens[start].classList.remove('bounceOutDown')
            screens[start].classList.add('hide')
            screens[final].classList.remove('hide')
            screens[final].classList.add('animated', 'bounceInUp')
        }, 500)
    },
    changeColorCar: function (car) {
        let ranCar = Math.round(Math.random() * 5)
        car.classList.remove('car0', 'car1', 'car2', 'car3', 'car4', 'car5')
        car.classList.add('car' + ranCar)

    },
    resetFrog: function (frog) {
        screens[1].classList.remove('animated', 'bounceInUp')
        screens[1].classList.add('animated', 'shake')

        setTimeout(() => screens[1].classList.remove('animated', 'shake'), 500)
        this.posLeft = 370
        this.posTop = 550
        frog.style.left = posLeft + 'px'
        frog.style.top = posTop + 'px'
    },
    checkLives: function () {
        let lives = document.querySelectorAll('ul li.heart.active')
        
        lives.classList.remove('active')
        nlives[nlives - 1].classList.remove('active')
        nlives -= 1
        if (nlives < 1) {
            alert('morido')
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
            this.resetFrog(frog)
            this.checkLives()
        }
    }
}
game.startGame()