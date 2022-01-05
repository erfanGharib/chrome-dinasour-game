//get element place them in a variable
let reload_btn = document.querySelector('#reload-btn');
let game_over = document.querySelector('#game-over');
let score = document.querySelectorAll('.score');
let scores = document.querySelector('#scores');
let foot = document.querySelectorAll('.foot');
let styleSheet = document.querySelector('#styleSheet');
let t_rex = document.getElementsByName('trex')[0];
let frame = document.querySelector('#frame').style;
let path = document.querySelector('#path');
let cloud = document.querySelector('#cloud');
let cactus = document.querySelectorAll('.cactus-child')[0].style;
let html = document.querySelector('#html');
let body = document.body.style;

//place keyframes in variable
var keyframes = '@keyframes goUp{0% {top:5px}50% {top:-150px}53% {top:-150px}100% {top:5px}} @keyframes goLeft {0% {left:-210px}100% {left:-3250px}}';
var x = 0;
var pad = "00000";

//get sounds and place in variable
let die_sound = new Audio('../sounds/die.wav');
let jump_sound = new Audio('../sounds/jump.wav');
let point_sound = new Audio('../sounds/point.wav');

//reload game by clicking reload button
function reload() {
    x=00000;
    game_over.style.display = 'none';
    styleSheet.innerHTML = keyframes;
    html.setAttribute('onkeydown', 'var key = event.keyCode; keyPressed(key)');
    path.classList.add('path');
    cloud.classList.add('cloud');
    foot[0].classList.add('addAnimate');
    foot[1].classList.add('addAnimate');
    t_rex.style.top='5px';
}

//function for all action that done on t-rex jump
function keyPressed(keycode) {
    if (keycode == 32) {
        //play jump sound
        jump_sound.play();
        //add class and key frames for t-rex jump
        t_rex.classList.add('trex');
        path.classList.add('path');
        cloud.classList.add('cloud');
        foot[0].classList.remove('addAnimate');
        foot[1].classList.remove('addAnimate');
        styleSheet.innerHTML = keyframes;

        setTimeout(() => {
            if (x == 0) {
                setInterval(() => {
                    //plus plus the score
                    if (game_over.style.display != 'flex') {
                        var g_score = '' + x; x++;
                        var SP = pad.substring(0, pad.length - g_score.length) + g_score;
                        score[1].innerHTML = SP;
                    }

                    //play point sound when the score.innerHTML plused 100 
                    var toS = score[1].innerHTML.toString();
                    var subString_4 = toS.substring(3);
                    var subString_all = toS.substring(0);
                    if (subString_4 === '00' && subString_all != '00000') {
                        point_sound.play();
                        score[1].classList.add('score-opacity');
                        setTimeout(()=>{score[1].classList.remove('score-opacity')},1500);
                    }

                    //night mode code
                    var subString_3 = toS.substring(2);
                    if (subString_3 == '700') {
                        body.filter = 'invert()';
                        body.background = '#000';
                    }
                    else if (subString_3 == '900') {
                        body.filter = 'invert(0%)';
                        body.background = '#fafafa';
                    }
                }, 100)
            }
            frame.width = '670px';
            t_rex.classList.remove('trex');
            foot[0].classList.add('addAnimate');
            foot[1].classList.add('addAnimate');
        }, 800);
    }
}
//lose game 
setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(t_rex).getPropertyValue('top'));
    var cactusLeft = parseInt(window.getComputedStyle(path).getPropertyValue('left'));
    if (game_over.style.display == 'none' && ((cactusLeft>-1730&&cactusLeft<-1643) || (cactusLeft>-2482&&cactusLeft<-2374) || (cactusLeft>-3241&&cactusLeft<-3112)) && (characterTop>-50)) {
        path.style.left=cactusLeft+'px';
        t_rex.style.top=characterTop+'px';
        die_sound.play();
        html.removeAttribute('onkeydown');
        path.classList.remove('path')
        cloud.classList.remove('cloud');
        path.style.animationDelay='0s';
        cloud.style.animationDelay='0s';
        game_over.style.display = 'flex';
        t_rex.classList.remove('trex');
        if(score[1].innerHTML>score[0].innerHTML)
            score[0].innerHTML=score[1].innerHTML
            var set = score[0].innerHTML;
            localStorage.setItem('score',set);
    }
    else if (game_over.style.display=='flex'&& foot[1].classList.contains('addAnimate')){
        foot[1].classList.remove('addAnimate');
        foot[0].classList.remove('addAnimate');
    }
    var lastHighScore = localStorage.getItem('score',set);
    score[0].innerHTML = lastHighScore;
}, 10);