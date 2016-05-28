// ------------------
// GAME MODEL DATA!!!
// ------------------
// Signifies weather game is "loaded"
var loaded = false;

// enables/disables player moves
var input = true;

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
  nextLv: 25,
  enemyDefeated: 0,
  health: 100,
  stamina: 20,
  // move handles status changes on hero + enemy in area [0]
  move: function move(moveName, strength, sCost, sCharge, heal, armorBoost, shake, soundId) {
    if (input === true) {
      if (hero.health >= 1 && (sCost <= hero.stamina)) {
        // check to see if the move creates a shake effect
        if (shake === true) {enemyShake(hero.stamina, sCost);}
        //modify stats of player and enemy
        area[0].health -= strength;
        hero.armor += armorBoost;
        hero.stamina -= sCost;
        hero.stamina += sCharge;
        hero.health += heal;
        //before rendering check to see if health and stamina are above max values, and fix
        if (hero.health > hero.healthMax) {hero.health = hero.healthMax}
        if (hero.stamina > hero.staminaMax) {hero.stamina = hero.staminaMax;}
        //render sounds, stats, trigger fades, and start enemy atack
        playMoveSound(soundId);
        renderHealth();
        renderSkill(moveName);
        renderStamina();
        spellFadein();
        area[0].attack(hero);
        //set a timeout callback to revert armor stat to a non boosted state AFTER enemy attacks
        setTimeout(function(){ hero.armor -= armorBoost;}, 1700);
        input = false;
      }
    }
  }
};

//Enemy Consructor Function
var Enemy = function Enemy(name, level, health, strength, exp){
  this.name = name;
  this.level = level;
  this.health = health;
  this.strength = strength;
  this.exp = exp;
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
    hero.healthMax += 10;
    hero.health = hero.healthMax;
    hero.armor += 1;
    hero.strength += 1;
    hero.stamina += 2;
    hero.exp = 0;
    hero.nextLv = Math.floor(hero.nextLv * 1.3);
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
