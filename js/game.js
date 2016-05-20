// -----------------
// GAME STATE DATA
// -----------------

//initilize game
function gameInit() {
  //spawn first enemy:
  nextEnemy();
  // render Enemy();
  renderEnemy();
  // sets effects for faded out();
  $('#dammageTaken').fadeOut(0).addClass('dammageTaken');
  $('.gameover').fadeOut(0);
};

//Check to see if you have died
function deadCheck() {
  if (hero.health <= 0) fadeDeath();
};

//function to calculate player dammage
function getStrength(xDammage) {
  if (input === true) {
    var dammage = (Math.floor(Math.random() * (hero.strength + xDammage)) + hero.level + xDammage);
    fadeStrength(dammage);
    return dammage;
  }
};

//calculate enemy dammage
function enemyCalculation(attacker) {
  var dammage = (parseInt(Math.random() * ((attacker.strength - hero.armor) + 1)));
  return dammage;
};

// random generates a new Item
function getItem() {
  var r = Math.floor(Math.random() * 10);
  item[Object.keys(item)[r]]();
};

//Enemy Prototype attack Function for all Enemies
Enemy.prototype.attack = function(hero) {
  renderEHealth();
  if (this.health > 0) {
    setTimeout(function(){
      hero.health -= enemyCalculation(area[0]);
      attackedFade();
      renderHealth();
      deadCheck();
    }, 1000);
  } else {
      hero.exp += this.exp;
      area.shift();
      enemyLV += 1;
      hero.enemyDefeated += 1;
      hero.stamina += 1;
      enemyDie();
      if (this.name === "chest") getItem();
      $("#die0")[0].play();
  };
};

//spawn new Enemy at random
function nextEnemy() {
  var r = Math.random();
  if (r >= 0.84) {
      area.push(new Enemy("whyvern", (enemyLV), (10 + (enemyLV * 5)), (25 + enemyLV), (15 + enemyLV)));
  } else if (r >= 0.68) {
      area.push(new Enemy("goul", (enemyLV), (15 + (enemyLV * 5)), (10 + enemyLV), (10 + enemyLV)));
  } else if (r >= 0.55) {
      area.push(new Enemy("skywhale", (enemyLV), (30 + (enemyLV * 10)), (5 + enemyLV), (30 + enemyLV)));
  } else if (r >= 0.45) {
      area.push(new Enemy("wasp", (enemyLV), (5 + (enemyLV * 2)), (2 + enemyLV), (5 + enemyLV)));
  } else if (r >= 0.3) {
      area.push(new Enemy("stalion", (enemyLV), (15 + (enemyLV * 5)), (20 + enemyLV), (40 + enemyLV)));
  } else if (r >= 0.1) {
      area.push(new Enemy("darkness", (enemyLV), (20 + (enemyLV * 5)), (25 + enemyLV), (20 + enemyLV)));
  } else {
      area.push(new Enemy("chest", "0", 1, 0, 0));
  };
};

//Levels up character stats if exp > nextLV then/or runs next enemy
function levelUp() {
  if (hero.exp >= hero.nextLv) {
    hero.level += 1;
    hero.healthMax += 10;
    hero.health = hero.healthMax;
    hero.armor += 1;
    hero.strength += 1;
    hero.staminaMax += 2;
    hero.stamina = hero.staminaMax;
    hero.exp -= hero.nextLv;
    hero.nextLv = Math.floor(hero.nextLv * 1.3);
    renderLevelUp();
  };
  nextEnemy();
  renderEnemy();
};

