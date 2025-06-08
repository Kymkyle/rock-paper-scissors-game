let score = JSON.parse(localStorage.getItem
('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button')
  .addEventListener('click',() => {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
       const playerMove = pickComputerMove();
       playGame(playerMove);
     }, 1000);
     isAutoPlaying = true;
   } else{
     clearInterval(intervalId);
     isAutoPlaying =  false;   
   } 
  });

// function autoPlay() {
  
// }

document.querySelector('.js-Rock-button')
  .addEventListener('click',() => {
    playGame('Rock');
  });

document.querySelector('.js-Paper-button')
.addEventListener('click',() => {
  playGame('Paper');
});

document.querySelector('.js-Scissors-button')
.addEventListener('click',() => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
 if (event.key === 'r'){
  playGame('Rock');
 } else if (event.key === 'p') {
  playGame('Paper');
 } else if (event.key === 's') {
  playGame('Scissors');
 }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors'){
    if (computerMove === 'Rock') {
      result = 'You lose';
    } else if (computerMove === 'Paper') {
      result ='You win';
    } else if (computerMove === 'Scissors') {
      result ='Tie.';
    }
  } else if (playerMove === 'Paper'){
    if (computerMove === 'Rock') {
      result = 'You win';
    } else if (computerMove === 'Paper') {
      result ='Tie.';
    } else if (computerMove === 'Scissors') {
      result ='You lose';
    }
  } else if (playerMove === 'Rock'){
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result ='You lose';
    } else if (computerMove === 'Scissors') {
      result ='You win';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;

  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement(); 
  
  document.querySelector('.js-moves')
  .innerHTML = ` You
    <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon"> -
    <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon"> Computer`;

  
  document.querySelector('.js-result')
    .innerHTML = result;
}

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = '';
    
    if (randomNumber >= 0 && randomNumber <= 1/3){
      computerMove = 'Rock';
    } else if (randomNumber > 1/3 && randomNumber <= 2/3) {
      computerMove ='Paper';
    } else {
      computerMove ='Scissors';
    }

    return computerMove;
}

document.querySelector('.js-reset-score')
  .addEventListener('click',() => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
  });




