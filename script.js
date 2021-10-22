score = 0;
cross = true;

m1 = new Audio('m.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    m1.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.code)
    if (e.code == "ArrowUp") {
        player = document.querySelector('.player');
        player.classList.add('animateplayer');
        setTimeout(() => {
            player.classList.remove('animateplayer')
        }, 700);
    }
    if (e.code == "ArrowRight") {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = playerX + 112 + "px";
    }
    if (e.code == "ArrowLeft") {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = (playerX - 112) + "px";
    }
}

setInterval(() => {
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    enemy = document.querySelector('.enemy');

    dx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(enemy, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
   // console.log(offsetX, offsetY)

    if (offsetX < 35  ){ 
        audiogo.play();
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        document.getElementById("sub").innerHTML = "Opsss you jumped early! Not quite close...";
        enemy.classList.remove('enemyAni')
        setTimeout(() => {
            m1.pause();
        }, 100);
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
        player.style.left = 70 + "px";
    }
    else if (offsetX < 145 && cross) {
        score += 100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            enemy.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Score: " + score
}