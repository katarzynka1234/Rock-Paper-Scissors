

// === GAME STATUS ==// 
// -- Displaying elements depending on the game status -- //
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Zagraj jeszcze raz!';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
setGameElements();

//GAME NOT STARTED //
//-- Initial state of game -- //
var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    }

// === GAME STARTED === //
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

// --Set of players data - start of new game --
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Wpisz swoje imię', 'Imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

// -- Player's choices -- //
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () { playerPick('kamień') });
pickPaper.addEventListener('click', function () { playerPick('papier') });
pickScissors.addEventListener('click', function () { playerPick('nożyce') });

// -- Random computer choice -- //
function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

// -- Presenting choices
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();
  
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
   
    checkRoundWinner(playerPick, computerPick);
}

// Check the result - base is the winner is player
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // dead-heat
    } else if (
        (computerPick == 'kamień' && playerPick == 'nożyce') ||
        (computerPick == 'nożyce' && playerPick == 'papier') ||
        (computerPick == 'papier' && playerPick == 'kamień')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }

    setGamePoints();
}

// Dispaly the current result
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

    checkFinishResult();
}


// === GAME ENDED === //
// Finish the game - player get 10 score -- //
function checkFinishResult() {
    if (player.score === 10) {
        gameState = 'ended';
        alert('Wygrana jest Twoja! ' + player.name + ' , zdobyłaś/eś 10 punktów :)');
        setGameElements();
    } else if (computer.score === 10) {
        gameState = 'ended';
        alert('Game over! Komputer zdobył 10 punktów.');
        setGameElements();
    }
}
