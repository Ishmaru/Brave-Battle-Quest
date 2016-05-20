//----------------
//RENDER FUNCTIONS
//----------------

//Init render board from splash
function renderGame() {
  $('#area').addClass('background').removeClass('noDisplay');
  $('#splashPg').addClass('noDisplay').removeClass('background');
};

// (moveName, getStrength(xDammage), sCost, sCharge, heal, armorBoost, shakeTrue, soundId)
//Get Input from event listener:
//Action MENU
$('#attack').click(function() {
  hero.move("attack", getStrength(0), 1, 0, 0, 0, true, "#iced");
});
$('#defend').click(function() {
  hero.move("defend", 0, 0, 1, 0, hero.armorMod, false, "#miscd");
});
$('#fire').click(function() {
  hero.move("fire", getStrength(5), 5, 0, 0, 0, true, "#fired");
});
$('#heal').click(function() {
  hero.move("heal", 0, 10, 0, 50, 0, false, "#miscd");
});
$('#wait').click(function() {
  hero.move("wait", 0, 0, 10, 0, 0, false, "#waitd");
});
$('#charge').click(function() {
  hero.move("charge", 0, 0, hero.staminaMax, 0, -(hero.armorMod * 2), false, "#heald");
});
$('#lightning').click(function() {
  hero.move("lightning", getStrength(10), 15, 0, 0, 0, true, "#windd");
});
$('#restore').click(function() {
  hero.move("restore", 0, 20, 0, 150, 0, false, "#heald");
});

// render enemy shake if attack is possible
function enemyShake(stamina, staminaCost) {
  if (stamina >= staminaCost) {
    $('#enemy').addClass('animated shake');
  }
};

//Status Menu
var ststusMenu = document.getElementById('ststusMenu');
var health = document.getElementById('health');
var stamina = document.getElementById('stamina');

//update Health indicator on top right
function renderHealth() {
  $('#health').text("Health: " + hero.health);
};
//update stamina indicator on top right
function renderStamina() {
  $('#stamina').text("Stamina: " + hero.stamina);
};

//Enemy Object
var enemyAvatar = document.getElementById('enemy');
var enemydammage = document.getElementById('dammage');
var enemyAttack = document.getElementById('dammageTaken');

// Renders enemy avatar
function renderEnemy() {
  $('#enemy').fadeIn('fast');
  enemyAvatar.style.backgroundImage = getAvatarBgImg();
  renderEHealth();
};

//url assignment based on current enemy
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
function renderSkill(skill) {enemydammage.style.backgroundImage = 'url("art/' + skill + '.png")';};
//counter to show enemy health without going to enemy stats menu
function renderEHealth() {$('#eHealth').text("Health: " + area[0].health);};

// _____________
//POP up Menus
// ----------------

// OPEN MENUS VIA CLICK

//Add event listener to run renderPlayerStats
$('#statusMenu').click(function() {renderPlayerStats();});

//Add event listener to run renderEnemyStats
$('#enemy').click(function() {renderEnemyStats();});

//render a Menu for statistics
function renderPlayerStats() {
  var $newDiv = $('<div>').attr("id","player").appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
// Render all major stats of the hero object
  for (var i = 0; i < 10; i++) {
    var $newLI = $('<li>').appendTo($newUL).text([Object.keys(hero)[i + 0]] + ": " + hero[Object.keys(hero)[i + 0]]);
  }
  // make the created menu clickable to remove it
  $('#player').click(function() {$('#player').remove();});
};

//render a menu when level up
function renderLevelUp() {
  var lvUp = ["LEVEL UP!", "level: " + hero.level, "health + 10", "stamina + 2", "armor + 1", "strength + 1", "next lv: " + hero.nextLv]
  $('#lvu')[0].play();
  var $newDiv = $('<div>').attr("id","playerLvUp").appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
// Render all major stats of the hero object
  for (var i = 0; i < lvUp.length; i++) {
    var $newLI = $('<li>').appendTo($newUL).text(lvUp[i]);
  }
  // make the created menu clickable to remove it
  $('#playerLvUp').click(function(){$('#playerLvUp').remove();});
  renderHealth();
  renderStamina();
};

//render a menu for enemy stats
function renderEnemyStats() {
  var $newDiv = $('<div>').attr("id","enemyStat").appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
// Render all major stats of the Enemy object inside area array
  for (var i = 0; i < 5; i++) {
    var $newLI = $('<li>').appendTo($newUL).text([Object.keys(area[0])[i + 0]] + ": " + area[0][Object.keys(area[0])[i + 0]]);
  };
  // make the created menu clickable to remove it
  $('#enemyStat').click(function() {$('#enemyStat').remove();});
  // $newDiv.background.url = getAvatarBgImg();
  $('#enemyStat').css("background-image", getAvatarBgImg());
};

//render a menu when item collect
function renderGetItem(itemR, itemB, itemN) {
  $('#lvu')[0].play();
  var $newDiv = $('<div>').attr('id','event').appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
  var $newLI = $('<li>').text('NEW ITEM!!!').appendTo($newUL);
  $newLI = $('<li>').text(itemN).appendTo($newUL);
  $newLI = $('<li>').text(itemB).appendTo($newUL);
  // make the created menu clickable to remove it
  $('#event').click(function() {$('#event').remove();});
  // Render item:
  $('#event').css("background-image", 'url("art/' + itemR + '.png")');
};

//__________
//Animation
//__________

//fade out when enemy dies
function enemyDie() {
  $("#enemy").fadeOut(2000, function() {
    levelUp();
    renderEnemy();
    input = true;
  }
)};
// fade effect for when player recieves dammage.
function attackedFade(dammage) {
  $("#hurt")[0].play();
  $('#area').addClass('animated bounce');
  $('#dmg').text("Damage");
  $('#dammageTaken').fadeIn('fast', function() {
    $('#dammageTaken').fadeOut('fast', function() {
      $('#dmg').text(" ");
      $('#area').removeClass('animated bounce');
      input = true;
    })
  })
};
// fade out player skill
function spellFadeOut() {
  $('<p>')
  $('#dammage').fadeOut('slow', function() {
    enemydammage.style.backgroundImage = 'url("art/undefined.png")';
    $('#enemy').removeClass('animated infinite shake');
  });
};
//fade in player skill
function spellFadein() {
    $('#dammage').fadeIn('fast', function(){
      spellFadeOut()
    })};

//fade out screen when health =0
function fadeDeath() {
  $("#music")[0].pause();
  $('.button').remove();
  $('.status').remove();
  $('#area').attr("class","dead");
  $('#area').fadeOut(4000, function() {
    $('.gameover').fadeIn('fast', function() {
      $('#dead')[0].play();
      $('.gameover').text("GAME OVER");
      tryAgain();
      $('.progress').text("Enemies Defeated: " + hero.enemyDefeated);
    });
  });
};
//fade the dammage indicator on enmey object
function fadeStrength(dammage) {
  $('#str').text(dammage);
  setTimeout(function(){$('#str').text(" ");}, 600);
};
// Create Retry Button on death
function tryAgain() {
  var $newButton = $('<div>');
  $newButton.attr("id","retry");
  $newButton.attr("class","button");
  $newButton.text('Try Again?');
  $newButton.appendTo('body');
  $newButton.click(function() {
  location.reload();
  });
};
// Plays approperate sound when players makes a move
function playMoveSound(soundId) {
  $(soundId)[0].play();
};

//Click to start!
$('#start').click(function() {
  renderGame();
  gameInit();
});

//Play music on start
  $("#music")[0].play();
