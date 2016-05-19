//----------------
//RENDER FUNCTIONS
//----------------

// (moveName,strength, sCost, sCharge, heal, armorBoost)
//Get Input from event listener:
//Action MENU
$('#attack').click(function() {
    hero.move("attack", getStrength(0), 1, 0, 0, 0);
});
$('#defend').click(function() {
  hero.move("defend", 0, 0, 1, 0, hero.armorMod);
});
$('#fire').click(function() {
  hero.move("fire", getStrength(5), 5, 0, 0, 0);
});
$('#heal').click(function() {
  hero.move("heal", 0, 10, 0, 50, 0);
});
$('#wait').click(function() {
  hero.move("wait", 0, 0, 10, 0, 0);
});
$('#charge').click(function() {
  hero.move("charge", 0, 0, 25, 0, -hero.armorMod);
});
$('#lightning').click(function() {
  hero.move("lightning", getStrength(10), 15, 0, 0, 0);
});
$('#restore').click(function() {
  hero.move("restore", 0, 20, 0, 150, 0);
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
  $('#enemy').fadeIn('fast');
  enemyAvatar.style.backgroundImage = getAvatarBgImg();
  renderEHealth();
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
function renderSkill(skill) {enemydammage.style.backgroundImage = 'url("art/' + skill + '.png")';};

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

function enemyDie() {
  $("#enemy").fadeOut(2000, function() {
    levelUp();
    renderEnemy();
    input = true;
  }
)};

function attackedFade(dammage) {
  $('#dmg').text("Dammage");
  $('#dammageTaken').fadeIn('fast', function() {
    $('#dammageTaken').fadeOut('fast', function() {
      $('#dmg').text(" ");
      input = true;
    })
  })
};

function spellFadeOut() {
  $('<p>')
  $('#dammage').fadeOut('slow', function() {
    enemydammage.style.backgroundImage = 'url("art/undefined.png")';
    // renderEHealth();
  });
};

function spellFadein() {
    $('#dammage').fadeIn('fast', function(){
      spellFadeOut();
      // renderEHealth();
    } );
};

function fadeDeath() {
  // $('#area').style.backgroundImage = 'url("art/enemyattack.png")';
  $('.button').remove();
  $('.status').remove();
  $('#area').attr("class","dead");
  $('#area').fadeOut(4000, function() {
    $('.gameover').fadeIn('fast', function() {
      $('.gameover').text("GAME OVER");
      tryAgain();
      $('.progress').text("Enemies Defeated: " + hero.enemyDefeated);
    });
  });
};

function fadeStrength(dammage) {
  $('#str').text(dammage);
  setTimeout(function(){$('#str').text(" ");}, 600);
};

function tryAgain() {
  var $newButton = $('<div>');
  $newButton.attr("id","retry");
  $newButton.attr("class","button");
  $newButton.text('Try Again?');
  $newButton.appendTo('body');
  $newButton.click(function() {
    location.reload();
  });
}
