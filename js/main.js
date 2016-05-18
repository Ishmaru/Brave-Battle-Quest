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
  // move handles status changes on hero + enemy in area [0]
  move: function move(moveName, sCost, sCharge, xDammage, heal, armorBoost) {
    if (hero.health >= 1 && (sCost < hero.stamina)) {
      area[0].health -= getStrength() * xDammage;
      hero.armor += armorBoost;
      hero.stamina -= sCost;
      hero.stamina += sCharge;
      hero.health += heal;
      if (hero.health > hero.healthMax) {
        hero.health = hero.healthMax
      }
      if (hero.stamina > hero.staminaMax) {
        hero.stamina = hero.staminaMax;
      }
      // area[0].attack(hero);
      hero.armor -= armorBoost;
      renderSkill(moveName);
      renderStamina();
      spellFadein();
      area[0].attack(hero);
    }
  }
};

//function to calculate player dammage
function getStrength() {
  var dammage = (Math.floor(Math.random() * hero.strength) + hero.level + hero.strengthMod);
  return dammage;
};

//calculate enemy dammage
function enemyCalculation(attacker) {
  var dammage = (parseInt(Math.random() * ((attacker.strength - hero.armor) + 1)));
  return dammage;
};

//Items
var item = {
  strengthitem1: function strengthitem1() {
    hero.strengthMod += 2;
    renderGetItem(item.strengthitem1.name, "Strength: + 2", "Dagger");
  },
  strengthitem2: function strengthitem2() {
    hero.strengthMod += 4;
    renderGetItem(item.strengthitem2.name, "Strength: + 4", "Sword");
  },
  strengthitem3: function strengthitem3() {
    hero.strengthMod += 6;
    renderGetItem(item.strengthitem3.name, "Strength: + 6", "Axe");
  },
  armoritem1: function armoritem1() {
    hero.armorMod += 1;
    renderGetItem(item.armoritem1.name, "Armor: + 1", "Helmit");
  },
  armoritem2: function armoritem2() {
    hero.armorMod += 2;
    renderGetItem(item.armoritem2.name, "Armor: + 2", "Shield");
  },
  armoritem3: function armoritem3() {
    hero.armorMod += 3;
    renderGetItem(item.armoritem3.name, "Armor: + 3", "Breastplate");
  },
  magicorb: function magicorb() {
    hero.level += 1;
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    hero.armor += 2;
    hero.strength += 2;
    hero.stamina += 2;
    hero.exp = 0;
    hero.nextLv *= 1.5;
    Math.floor(hero.nextLv);
    renderGetItem(item.magicorb.name, "Level Up!", "Magic Tome");
  },
  vitalitycrystal: function vitalitycrystal() {
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    renderGetItem(item.vitalitycrystal.name, "Max Health: + 15", "Vital Crystal");
  },
  staminashard: function staminashard() {
    hero.staminaMax += 5;
    hero.stamina = hero.staminaMax;
    renderGetItem(item.staminashard.name, "Max Stamina: + 5", "Stamina Shard");
  },
  luckcharm: function luckcharm() {
    enemyLV -= 1;
    renderGetItem(item.luckcharm.name, "Enemy Lv Down!", "Luck Charm");
  }
};

// random generates a new Item
function getItem() {
  var r = Math.floor(Math.random() * 10);
  item[Object.keys(item)[r]]();
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
    setTimeout(function(){
      hero.health -= enemyCalculation(area[0]);
      attackedFade();
      renderHealth();
    }, 1000);
  } else {
      hero.exp += this.exp;
      area.shift();
      enemyLV += 1;
      hero.enemyDefeated += 1;
      hero.stamina += 1;
      enemyDie();
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
};

//Levels up character stats if exp > nextLV then/or runs next enemy
function levelUp() {
  if (hero.exp >= hero.nextLv) {
    hero.level += 1;
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    hero.armor += 1;
    hero.strength += 1;
    hero.staminaMax += 2;
    hero.stamina = hero.staminaMax;
    hero.exp = 0;
    hero.nextLv *= 1.5;
    renderLevelUp();
  };
  nextEnemy();
  renderEnemy();
};


//----------------
//RENDER FUNCTIONS
//----------------

// (moveName, sCost, sCharge, xDammage, heal, armorBoost)
//Get Input from event listener:
//Action MENU
var attack = document.getElementById('attack');
attack.addEventListener('click', function() {
    hero.move("attack", 1, 0, 1, 0, 0);
});
var defend = document.getElementById('defend');
defend.addEventListener('click', function() {
  hero.move("defend", 0, 1, 0, 0, hero.armorMod);
});
var fire = document.getElementById('fire');
fire.addEventListener('click', function() {
  hero.move("fire", 5, 0, 2, 0, 0);
});
var heal = document.getElementById('heal');
heal.addEventListener('click', function() {
  hero.move("heal", 10, 0, 0, 50, 0);
});
var wait = document.getElementById('wait');
wait.addEventListener('click', function() {
  hero.move("wait", 0, 10, 0, 0, 0);
});
var charge = document.getElementById('charge');
charge.addEventListener('click', function() {
  hero.move("charge", 0, 25, 1, 0, -hero.armorMod);
});
var lightning = document.getElementById('lightning');
lightning.addEventListener('click', function() {
  hero.move("lightning", 15, 0, 5, 0, 0);
});
var restore = document.getElementById('restore');
restore.addEventListener('click', function() {
  hero.move("restore", 20, 0, 0, 150, 0);
});

//Status Menu
var ststusMenu = document.getElementById('ststusMenu');
var health = document.getElementById('health');
var stamina = document.getElementById('stamina');

function renderHealth() {
  $('#health').text("Health: " + hero.health);
};

function renderStamina() {
  $('#stamina').text("Stamina: " + hero.stamina);
};

//Enemy Object
var enemyAvatar = document.getElementById('enemy');
var enemydammage = document.getElementById('dammage');
var enemyAttack = document.getElementById('dammageTaken');

// Renders enemy avatar
function renderEnemy() {
  $('#enemy').fadeIn('fast', function() {
  });
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
};


// _____________
//POP up Menus
// ----------------

// OPEN MENUS VIA CLICK

//Add event listener to run renderPlayerStats
var getStats = document.getElementById('statusMenu');
getStats.addEventListener('click', function(){
  renderPlayerStats();
});

//Add event listener to run renderEnemyStats
var getEStats = document.getElementById('enemy');
getEStats.addEventListener('click', function(){
  renderEnemyStats();
});

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
  var lvUp = ["LEVEL UP!", "level: " + hero.level, "health + 15", "stamina + 2", "armor + 1", "strength + 1", "next lv: " + hero.nextLv]
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
  renderHealth();
  renderStamina();
};

//render a menu for enemy stats
function renderEnemyStats() {
  var $newDiv = $('<div>');
  $newDiv.attr("id","enemyStat");
  $newDiv.appendTo('div#area.background');
  var $newUL = $('<ul>');
  $newUL.appendTo($newDiv);
// Render all major stats of the Enemy object inside area array
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

//render a menu when item collect
function renderGetItem(itemR, itemB, itemN) {
  var $newDiv = $('<div>');
  $newDiv.attr("id","event");
  $newDiv.appendTo('div#area.background');
  var $newUL = $('<ul>');
  $newUL.appendTo($newDiv);
  var $newLI = $('<li>');
  $newLI.text('NEW ITEM!!!');
  $newLI.appendTo($newUL);
  $newLI = $('<li>');
  $newLI.text(itemN);
  $newLI.appendTo($newUL);
  $newLI = $('<li>');
  $newLI.text(itemB);
  $newLI.appendTo($newUL);
  // make the created menu clickable to remove it
  var itemGet = document.getElementById('event');
  itemGet.addEventListener('click', function() {
    $('#event').remove();
  });
  // Render item:
  itemGet.style.backgroundImage = 'url("art/' + itemR + '.png")';
};

//__________
//Animation
//__________

function enemyDie() {
  $("#enemy").fadeOut(2000, function() {
    levelUp();
    renderEnemy();
  }
)};
function attackedFade() {
  $('#dammageTaken').fadeIn('fast', function() {
    $('#dammageTaken').fadeOut('fast')
  })
};
function spellFadeOut() {
  $('#dammage').fadeOut('slow', function() {
    enemydammage.style.backgroundImage = 'url("art/undefined.png")';
  });
};
function spellFadein() {
    $('#dammage').fadeIn('fast', function(){
      spellFadeOut();
    } );
};


//test game:
nextEnemy();
// renderSkill();
renderEnemy();
// spellFadeOut();
$('#dammageTaken').fadeOut(0);
