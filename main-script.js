document.addEventListener('DOMContentLoaded', () => {
   
//    function startAgain() {
    
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    let isGameOver = false;
    let scoreCon = document.getElementById('score');
    let birdLeft = 230
    let birdBottom = 200
    let gravity = 2
    let score = 0;
    let scoreTime = 3000;
    var pass = true;
    let refresh = document.getElementById('restart');
    let gap = 450;
   
    let restartGame = document.getElementById('startAgain');
    var point = new Audio('point.mp3');
    var hit = new Audio('hit.mp3');

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';

    }

    let timerId = setInterval(startGame, 20)



    function jump() {

        if (birdBottom < 480) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
        
        
    }
    document.addEventListener('click', jump);



    function generateObstable() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 150;
        let obstacleBottom = randomHeight;
        const topObstacle = document.createElement('div');
        const obstacle = document.createElement('div');

        // if(isGameOver) hit.play();

        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if (obstacleLeft === -60) {
                
                clearInterval(timerId1);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 270 && birdLeft == 230 &&
                (birdBottom < obstacleBottom + 200 || birdBottom > obstacleBottom + gap - 150) ||
                birdBottom === 50
            ) {
              
                gameOver();
                
                clearInterval(timerId1)
                pass = false;
                refresh.style.visibility = "visible";
                document.removeEventListener('click', jump);
            }
            // else if(pass) {
            //     score += 1;
            //     updateScore();
            // }

        }
        let timerId1 = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstable, scoreTime)
    }
   

    setInterval(() => {
       if(pass) score += 1;
        updateScore();
       if(!isGameOver) point.play();
    }, scoreTime);

    


    generateObstable();

    function gameOver() {
        clearInterval(timerId)
        isGameOver = true;
        document.removeEventListener('keyup', jump)
        

    }


   


    function updateScore(){
        scoreCon.innerHTML = "Score : " + score;
        
    }


restartGame.addEventListener('click', startAgain);

function startAgain(){
    location.reload();
}

// }

//     restartGame.addEventListener('click' , startAgain);

})

