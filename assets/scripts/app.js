const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 12;

let maxLife = 50;
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);  

function reset() {
    currentMonsterHealth = maxLife;
    currentPlayerHealth = maxLife;
    resetGame(maxLife);
}

function endRound() {
    const playerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = playerHealth;
        setPlayerHealth(playerHealth);
        alert('Saved by the bonus life');
    }
    verifyWinner();
}

function attackMonster(playerAttackValue, monsterAttackValue) {
    const damage = dealMonsterDamage(playerAttackValue);
    currentMonsterHealth -= damage;
    endRound();
}

function onAttackMonster() {
    attackMonster(PLAYER_ATTACK_VALUE, MONSTER_ATTACK_VALUE);
}

function onStrongAttack() {
    attackMonster(STRONG_ATTACK_VALUE, MONSTER_ATTACK_VALUE);
}

function verifyWinner() {
    if (currentMonsterHealth <= 0) {
        alert("You won!");
        reset();
    } else if (currentPlayerHealth <= 0) {
        alert("You died...");
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
        verifyWinner();
}

attackBtn.addEventListener('click', onAttackMonster);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);


