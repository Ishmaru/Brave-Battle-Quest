//Level modifier for enemies Increases per enemy defeat
var enemyLV = 0;

//Actual play space, holds enemies, and other events. Actions only effect the 0 index and shifts when done
var area = [];


//the Hero object
var hero = {
  name: "Akari",
  level: 0,
  healthMax: 100,
  armor: 0,
  armorMod: 5,
  strength: 15,
  strengthMod: 0,
  staminaMax: 20,
  exp: 0,
  nextLv: 30,
  enemyDefeated: 0,
  health: 100,
  stamina: 20,
  // Attack deals random dammage based on strength + strengthMod * a random number, subtracts stamina, Calls enemy attack after.
  attack: function attack(){
    if (hero.health >= 1 && hero.stamina >= 1) {
      area[0].health -= getStrength();
      hero.stamina -= 1;
      console.log("ATTACK!");
      console.log(area[0].name + " HP: " + area[0].health);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.attack.name);
    }
  },
  // Defend increases armor by armorMod, Increases stamina by 1, Calls enemy attack, then returns armor to its state before function.
  defend: function defend(){
    if (hero.health >= 1) {;
      hero.stamina += 1;
      hero.armor += hero.armorMod;
      if (hero.stamina >= hero.staminaMax) hero.stamina = hero.staminaMax;
      console.log("Defending...");
      console.log("Your Armor: " + hero.armor);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      hero.armor -= hero.armorMod;
      renderSkill(hero.defend.name);
    }
  },
  //fire deals random dammage based on strength + strengthMod  * a random number, subtracts lots of stamina, Calls enemy attack after.
  fire: function fire(){
    if (hero.health >= 1 && hero.stamina >= 5) {
      // area[0].health -=(parseInt(Math.random() * (hero.strength + hero.strengthMod)));
      area[0].health -= getStrength() * 2;
      hero.stamina -= 5;
      console.log("SECRET TECHNIQUE!!!!");
      console.log(area[0].name + " HP: " + area[0].health);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.fire.name);
    }
  },
  //heal increases health by 50 but not past value of healthMax. If health is greater, health sets to healthMax. Then calls enemy attack after.
  heal: function heal(){
    if (hero.health >= 1 && (hero.health < hero.healthMax) && hero.stamina >= 10) {
      hero.health += 50;
      hero.stamina -= 10;
      if (hero.health >= hero.healthMax) hero.health = hero.healthMax;
      console.log("Fisrt Aid.");
      console.log("Your Health: " + hero.health);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.heal.name);
    }
  },
  //wait restores stamina, and calls enemy attack.
  wait: function wait(){
    if (hero.health >= 1 && hero.stamina < hero.staminaMax) {
      hero.stamina += 8;
      if (hero.stamina >= hero.staminaMax) hero.stamina = hero.staminaMax;
      console.log("Waiting...");
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.wait.name);
    }
  },
  //restore sets health to healthMax. and reduced staming significantly. Then calls enemy attack after.
  restore: function restore(){
    if (hero.health >= 1 && (hero.health < hero.healthMax) && hero.stamina >= 25) {
      hero.health = hero.healthMax;
      hero.stamina -= 25;
      if (hero.health >= hero.healthMax) {
        hero.health = hero.healthMax;
      }
      console.log("Fisrt Aid.");
      console.log("Your Health: " + hero.health);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.restore.name);
    }
  },
  //lightning deals random dammage based on strength + strengthMod  * a random number, subtracts lots of stamina, Calls enemy attack after.
  lightning: function lightning(){
    if (hero.health >= 1 && hero.stamina >= 5) {
      area[0].health -= getStrength() * 5
      hero.stamina -= 15;
      console.log("ULTIMATE SECRET TECHNIQUE!!!!");
      console.log(area[0].name + " HP: " + area[0].health);
      console.log("Your Stamina: " + hero.stamina);
      area[0].attack(hero);
      renderSkill(hero.lightning.name);
    }
  },
  //Charge reduces armor by armorMod * -1.5, sets stamina to the max value, then calls enemy attack.
  charge: function charge(){
    if (hero.health >= 1 && hero.stamina < hero.staminaMax) {
      hero.stamina = hero.staminaMax;
      var armortemp = hero.armorMod;
      hero.armorMod -= (hero.armorMod * -1.5);
    console.log("Waiting...");
    console.log("Your Stamina: " + hero.stamina);
    area[0].attack(hero);
    hero.armorMod = armortemp;
    renderSkill(hero.charge.name);
    }
  },
}
//function to calculate dammage
function getStrength() {
  var dammage = (Math.floor(Math.random() * hero.strength) + hero.level + hero.strengthMod);
  return dammage;
}

//Items
var item = {
  strengthItem1: function () {
    hero.strengthMod += 2;
  },
  strengthItem2: function () {
    hero.strengthMod += 4;
  },
  strengthItem3: function () {
    hero.strengthMod += 6;
  },
  armorItem1: function () {
    hero.armor += 2;
  },
  armorItem2: function () {
    hero.armor += 4;
  },
  armorItem3: function () {
    hero.armor += 6;
  },
  magicOrb: function () {
    hero.level += 1;
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    hero.armor += 2;
    hero.strength += 2;
    hero.stamina += 2;
    hero.exp = 0;
    hero.nextLv *= 1.5;
    console.log("LEVEL UP!!!!");
    console.log("Health + 15");
    console.log("Armor + 2");
    console.log("Strength + 2");
    console.log("Stamina + 2");
  },
  vitalityCrystal: function () {
    hero.healthMax += 15;
    hero.health = hero.healthMax;
  },
  staminaRing: function () {
    hero.staminaMax += 5;
    hero.stamina = hero.staminaMax;
  },
  luckCharm: function () {
    enemyLV -= 1;
  }
};





//Enemy Consructor Function

var Enemy = function Enemy(name, health, strength, exp){
  this.name = name;
  this.health = health;
  this.strength = strength;
  this.exp = exp;
};

//Enemy Prototype attack Function for all Enemies

Enemy.prototype.attack = function(hero) {
  if (this.health > 0) {
    hero.health -= (parseInt(Math.random() * ((this.strength - hero.armor) + 1)));
    console.log(this.name + " Attacks!!!!");
    console.log("Your Health: " + hero.health);
  } else {
      console.log(this.name + " Defeated!");
      hero.exp += this.exp;
      console.log("Gained " + this.exp + " Experence!");
      area.shift();
      enemyLV += 1;
      hero.enemyDefeated += 1;
      hero.stamina += 5;
      levelUp();
      if (this.name === "chest") getItem();
  };

};


//spawn new Enemy at random
function nextEnemy() {
  var r = Math.random();
  if (r >= 0.84) {
      area.push(new Enemy("whyvern", (10 + (enemyLV * 5)), (25 + enemyLV), (15 + enemyLV)));
  } else if (r >= 0.68) {
      area.push(new Enemy("goul", (15 + (enemyLV * 5)), (10 + enemyLV), (10 + enemyLV)));
  } else if (r >= 0.52) {
      area.push(new Enemy("skywhale", (30 + (enemyLV * 10)), (5 + enemyLV), (30 + enemyLV)));
  } else if (r >= 0.36) {
      area.push(new Enemy("wasp", (5 + (enemyLV * 2)), (2 + enemyLV), (5 + enemyLV)));
  } else if (r >= 0.2) {
      area.push(new Enemy("stalion", (15 + (enemyLV * 5)), (20 + enemyLV), (40 + enemyLV)));
  } else if (r >= 0.04) {
      area.push(new Enemy("darkness", (20 + (enemyLV * 5)), (25 + enemyLV), (20 + enemyLV)));
  } else {
      area.push(new Enemy("chest", 0.000001, 0, 0));
  };

  console.log("A new Opponent Approaches!");
  console.log(area[0]);
};

//Levels up character stats if exp > nextLV then/or runs next enemy
function levelUp() {
  if (hero.exp >= hero.nextLv) {
    hero.level += 1;
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    hero.armor += 2;
    hero.strength += 2;
    hero.staminaMax += 2;
    hero.stamina = hero.staminaMax;
    hero.exp = 0;
    hero.nextLv *= 1.5;
    console.log("LEVEL UP!!!!");
    console.log("Health + 15");
    console.log("Armor + 2");
    console.log("Strength + 2");
    console.log("Stamina + 2");
    renderLevelUp();
  };
  nextEnemy();
  renderEnemy();
};


// random generates a new Item
function getItem() {
  var r = Math.floor(Math.random() * 10);
  item[Object.keys(item)[r]]();
  console.log(item[Object.keys(item)[r]])
};






//----------------
//RENDER FUNCTIONS
//----------------



//Get Input from event listener:
//Action MENU
var attack = document.getElementById('attack');
attack.addEventListener('click', function() {
    hero.attack();
});
var defend = document.getElementById('defend');
defend.addEventListener('click', function() {
    hero.defend();
});
var fire = document.getElementById('fire');
fire.addEventListener('click', function() {
    hero.fire();
});
var heal = document.getElementById('heal');
heal.addEventListener('click', function() {
    hero.heal();
});
var wait = document.getElementById('wait');
wait.addEventListener('click', function() {
    hero.wait();
});
var charge = document.getElementById('charge');
charge.addEventListener('click', function() {
    hero.charge();
});
var lightning = document.getElementById('lightning');
lightning.addEventListener('click', function() {
    hero.lightning();
});
var restore = document.getElementById('restore');
restore.addEventListener('click', function() {
    hero.restore();
});

//Status Menu
var ststusMenu = document.getElementById('ststusMenu');
var health = document.getElementById('health');
var stamina = document.getElementById('stamina');

function renderStats() {
  health.textContent = "Health: " + hero.health;
  stamina.textContent = "Stamina: " + hero.stamina;
};



//Enemy Object
var enemyAvatar = document.getElementById('enemy');
var enemydammage = document.getElementById('dammage');
var enemyAttack = document.getElementById('dammageTaken');

// Renders enemy avatar
function renderEnemy() {
  enemyAvatar.style.backgroundImage = getAvatarBgImg();
};

function getAvatarBgImg() {
  if (area[0].name === "stalion") return "url('art/stalion1.png')";
  if (area[0].name === "goul") return "url('art/soul1.png')";
  if (area[0].name === "skywhale") return "url('art/skywhale1.png')";
  if (area[0].name === "darkness") return "url('art/darkness1.png')";
  if (area[0].name === "wasp") return "url('art/wasp1.png')";
  if (area[0].name === "whyvern") return "url('art/whyvern1.png')";
  if (area[0].name === "chest") return "url('art/chest.png')";
};

//renders a graphical representation of the skill used
function renderSkill(skill) {
  enemydammage.style.backgroundImage = 'url("art/' + skill + '.png")';
  renderStats();
};

//render a Menu for statistics
function renderPlayerStats() {
  var $newDiv = $('<div>');
  $newDiv.attr("id","player");
  $newDiv.appendTo('div#area.background');
  var $newUL = $('<ul>');
  $newUL.appendTo($newDiv);
// Render all major stats of the hero object
  for (var i = 0; i < 10; i++) {
    var $newLI = $('<li>');
    $newLI.appendTo($newUL);
    $newLI.text([Object.keys(hero)[i + 0]] + ": " + hero[Object.keys(hero)[i + 0]]);
  }
  // make the created menu clickable to remove it
  var playerStats = document.getElementById('player');
  playerStats.addEventListener('click', function() {
    $('#player').remove();
  });
};


//render a menu when level up
function renderLevelUp() {
  var lvUp = ["LEVEL UP!", "level: " + hero.level, "health + 15", "stamina + 2", "armor + 2", "strength + 2", "next lv: " + hero.nextLv]
  var $newDiv = $('<div>');
  $newDiv.attr("id","playerLvUp");
  $newDiv.appendTo('div#area.background');
  var $newUL = $('<ul>');
  $newUL.appendTo($newDiv);
// Render all major stats of the hero object
  for (var i = 0; i < lvUp.length; i++) {
    var $newLI = $('<li>');
    $newLI.appendTo($newUL);
    $newLI.text(lvUp[i]);
  }
  // make the created menu clickable to remove it
  var close = document.getElementById('playerLvUp');
  close.addEventListener('click', function() {
    $('#playerLvUp').remove();
  });
};

//render a menu for enemy stats
function renderEnemyStats() {
  var $newDiv = $('<div>');
  $newDiv.attr("id","enemyStat");
  $newDiv.appendTo('div#area.background');
  var $newUL = $('<ul>');
  $newUL.appendTo($newDiv);
// Render all major stats of the hero object
  for (var i = 0; i < 4; i++) {
    var $newLI = $('<li>');
    $newLI.appendTo($newUL);
    $newLI.text([Object.keys(area[0])[i + 0]] + ": " + area[0][Object.keys(area[0])[i + 0]]);
  };
  // make the created menu clickable to remove it
  var enemysStats = document.getElementById('enemyStat');
  enemysStats.addEventListener('click', function() {
    $('#enemyStat').remove();
  });
  // $newDiv.background.url = getAvatarBgImg();
  enemysStats.style.backgroundImage = getAvatarBgImg();
};




//Add event listener to run renderPlayerStats
var getStats = document.getElementById('statusMenu');
getStats.addEventListener('click', function(){
  renderPlayerStats();
});

//Add event listener to run renderPlayerStats
var getStats = document.getElementById('enemy');
getStats.addEventListener('click', function(){
  renderEnemyStats();
});





//test game:
nextEnemy();
renderSkill();
renderEnemy();



