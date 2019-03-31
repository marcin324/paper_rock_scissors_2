const gameSummary = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};

const gamePresent = {
    playerChoice: ``,
    computerChoice: ``,
};

const playerPick = document.querySelector('[data-summary="your-choice"]');
const computerPick = document.querySelector('[data-summary="ai-choice"]');
const winner = document.querySelector('[data-summary="who-win"]');
const numberOfGames = document.querySelector('p.numbers span');
const won = document.querySelector('p.wins span');
const lost = document.querySelector('p.losses span');
const draw = document.querySelector('p.draws span');

const hands = [...document.querySelectorAll('.select img')];

const btnStart = document.querySelector('.btnStart');
const btnPlay = document.querySelector('.btnPlay');
const btnReset = document.querySelector('.btnReset');


const startGame = () => {
    if (!gamePresent.playerChoice) {
        return alert(`Kliknij w jeden z obrazków`);
    }

    gamePresent.computerChoice = computerSelection();
    const gameResult = checkResult(gamePresent.playerChoice, gamePresent.computerChoice);
    publishResult(gamePresent.playerChoice, gamePresent.computerChoice, gameResult);
    endGame();
};


const playerSelection = (e) => {
    playerPick.textContent = ``;
    computerPick.textContent = ``;
    winner.textContent = ``;

    hands.forEach(hand => {
        hand.style.boxShadow = ``;
    });
    gamePresent.playerChoice = e.target.dataset.option;
    e.target.style.boxShadow = `0 0 0 4px #ED7A00`;
};


const computerSelection = () => {
    const computerMovement = hands[Math.floor(Math.random() * hands.length)].dataset.option;
    return computerMovement;
};


const checkResult = (player, computer) => {
    if (player === computer) {
        return `draw`;
    } else if ((player === 'papier' && computer === 'kamień') ||
        (player === 'kamień' && computer === 'nożyczki') ||
        (player === 'nożyczki' && computer === 'papier')) {
        return `win`;
    } else {
        return `loss`;
    }
};


const publishResult = (player, computer, result) => {
    playerPick.textContent = player;
    computerPick.textContent = computer;

    gameSummary.games++;
    numberOfGames.textContent = gameSummary.games;

    if (result === `win`) {
        gameSummary.wins++;
        won.textContent = gameSummary.wins;
        winner.style.color = `green`;
        winner.textContent = `Super, wygrałeś :)`;
    } else if (result === `loss`) {
        gameSummary.losses++;
        lost.textContent = gameSummary.losses;
        winner.style.color = `red`;
        winner.textContent = `Komputer :(`;
    } else {
        gameSummary.draws++;
        draw.textContent = gameSummary.draws;
        winner.style.color = `grey`;
        winner.textContent = `Remis!`;
    }
};


const endGame = () => {
    document.querySelector(`[data-option="${gamePresent.playerChoice}"]`).style.boxShadow = ``;
    gamePresent.playerChoice = ``;
}


const deleteResults = () => {

    gameSummary.games = 0;
    numberOfGames.textContent = gameSummary.games

    gameSummary.wins = 0;
    won.textContent = gameSummary.wins;

    gameSummary.losses = 0;
    lost.textContent = gameSummary.losses;

    gameSummary.draws = 0;
    draw.textContent = gameSummary.draws;

    playerPick.textContent = ``;
    computerPick.textContent = ``;
    winner.textContent = ``;
};


const showGame = () => {
    alert(`Kliknij w jeden z obrazków, a następnie w przycisk losujący wybór komputera`);
    document.querySelector('.game').style.display = `block`;
    document.querySelector('.start').classList.add('hidden');
};

hands.forEach(hand => {
    hand.addEventListener('click', playerSelection);
});
btnPlay.addEventListener('click', startGame);
btnReset.addEventListener('click', deleteResults);
btnStart.addEventListener('click', showGame);