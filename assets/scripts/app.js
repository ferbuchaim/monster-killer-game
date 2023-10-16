const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 12;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'STRONG_PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Chose the maximum life.', '100');

let maxLife = parseInt(enteredValue);

if (isNaN(maxLife) || maxLife <= 0) {
	maxLife = 100;
}

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(maxLife);  

function writeToLog(event, value, monsterHealth, playerHealth) {
	let logEntry = {
		event: event,
		value: value,
		finalMonsterHealth: monsterHealth,
		finalPlayerHealth: playerHealth
};
	battleLog.push(logEntry);
}

function reset() {
	currentMonsterHealth = maxLife;
	currentPlayerHealth = maxLife;
	resetGame(maxLife);
}

function endRound() {
	const playerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage
	writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = playerHealth;
		setPlayerHealth(playerHealth);
		alert('Saved by the bonus life');
	}
	verifyWinner();
}

function attackMonster(playerAttackValue) {
	const damage = dealMonsterDamage(playerAttackValue);
	currentMonsterHealth -= damage;
	if (playerAttackValue <= 14) {
		writeToLog(LOG_EVENT_PLAYER_ATTACK, damage, currentMonsterHealth, currentPlayerHealth);
	} else {
		writeToLog(LOG_EVENT_STRONG_PLAYER_ATTACK, damage, currentMonsterHealth, currentPlayerHealth);
	}
	endRound();
}

function onAttackMonster() {
	attackMonster(PLAYER_ATTACK_VALUE);
}

function onStrongAttack() {
	attackMonster(STRONG_ATTACK_VALUE);
}

function verifyWinner() {
	if (currentMonsterHealth <= 0) {
		alert("You won!");
		writeToLog(LOG_EVENT_GAME_OVER, 'Player won', currentMonsterHealth, currentPlayerHealth);
		reset();
	} else if (currentPlayerHealth <= 0) {
			alert("You died...");
			writeToLog(LOG_EVENT_GAME_OVER, 'Player lost', currentMonsterHealth, currentPlayerHealth);
			reset();
	}
}

function onHeal() {
	let healValue;
	if (currentPlayerHealth === maxLife) {
		alert("Your life bar is full")
		return
	} else if (currentPlayerHealth >= maxLife - HEAL_VALUE) {
		alert("You can't heal more than you max initial health.");
		healValue = maxLife - currentPlayerHealth;
	} else {
		healValue = HEAL_VALUE;
	}
		increasePlayerHealth(HEAL_VALUE);
		currentPlayerHealth += HEAL_VALUE; 
		currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);
		writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
		verifyWinner();
}

attackBtn.addEventListener('click', onAttackMonster);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);
logBtn.addEventListener('click', onLog);

function onLog() {
  console.log(battleLog);
}


