!function e(t,n,a){function r(l,o){if(!n[l]){if(!t[l]){var i="function"==typeof require&&require;if(!o&&i)return i(l,!0);if(u)return u(l,!0);var c=new Error("Cannot find module '"+l+"'");throw c.code="MODULE_NOT_FOUND",c}var s=n[l]={exports:{}};t[l][0].call(s.exports,function(e){var n=t[l][1][e];return r(n?n:e)},s,s.exports,e,t,n,a)}return n[l].exports}for(var u="function"==typeof require&&require,l=0;l<a.length;l++)r(a[l]);return r}({1:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=e("./Player"),o=a(l),i=e("./BattleRPS"),c=a(i),s=e("./Score"),h=function(){function e(t,n){if(r(this,e),!(t instanceof o["default"]&&n instanceof o["default"]))throw"BattleManager constructor bad parameters";this.p1=t,this.p2=n,this.gameScore=new s.GameScore,this.nbRound=0,this.done=!1}return u(e,[{key:"battle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this.p1.play(e),a=this.p2.play(t,this.gameScore.playerScores[1].score),r=c["default"].battle(n,a),u=s.PlayerScore.STATUS_EQUALITY,l=s.PlayerScore.STATUS_EQUALITY;1===r?(u=s.PlayerScore.STATUS_WON,l=s.PlayerScore.STATUS_LOST):2===r&&(u=s.PlayerScore.STATUS_LOST,l=s.PlayerScore.STATUS_WON);var o=[{hit:n,status:u},{hit:a,status:l}];return this.gameScore.registerNewScores(o[0],o[1]),this.nbRound++,this.checkGameState(),o}},{key:"checkGameState",value:function(){var t=this.gameScore.getMaxWonRounds();if(t>e.ROUNDS_NUMBER)throw"BattleManager should already stop the game and setup a winner";t===e.ROUNDS_NUMBER&&(this.gameScore.playerScores[0].countWonRounds()===e.ROUNDS_NUMBER?this.p1.winner=!0:this.p2.winner=!0,this.done=!0)}},{key:"winner",get:function(){return this.p1.winner?this.p1:this.p2.winner?this.p2:null}}]),e}();h.ROUNDS_NUMBER=10,n["default"]=h},{"./BattleRPS":2,"./Player":4,"./Score":5}],2:[function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(){function e(){a(this,e)}return r(e,null,[{key:"battle",value:function(e,t){if(!e)return 2;if(!t)return 1;switch(e+t){case"PP":case"RR":case"SS":return 0;case"RS":case"SP":case"PR":return 1;case"SR":case"PS":case"RP":return 2;default:throw"Error, battle not found"}}}]),e}();u.ROCK="R",u.PAPER="P",u.SCISSORS="S",n["default"]=u},{}],3:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=e("./BattleManager"),o=a(l),i=e("./BattleRPS"),c=a(i),s=e("./Player"),h=a(s),f=function(){function e(){r(this,e)}return u(e,null,[{key:"attachAnimation",value:function(e,t){var n=document.querySelector(e),a=n.className;n.className=a+" "+t,n.addEventListener("animationend",function(){n.className=a})}}]),e}(),y=function(){function e(){r(this,e),this.$playButton=document.querySelector(".PlayButton"),this.$battle=document.querySelector(".Battle"),this.$battleResult=document.querySelector(".Battle-result"),this.$score=document.querySelector(".Score"),this.counterIntervalId=null,this.bm=null,this.playerBattleChoice=null,this.init()}return u(e,[{key:"init",value:function(){this.attachGameSelectionEvent(),this.attachPlayEvent(),this.attachPlayerChoiceEvent()}},{key:"attachGameSelectionEvent",value:function(){var e=this,t=["ChoiceButtons-watcher","ChoiceButtons-player"],n=!0,a=!1,r=void 0;try{for(var u,l=function(){var t=u.value;document.querySelector("."+t).onclick=function(){e.gameSelection(t.replace("ChoiceButtons-",""))}},o=t[Symbol.iterator]();!(n=(u=o.next()).done);n=!0)l()}catch(i){a=!0,r=i}finally{try{!n&&o["return"]&&o["return"]()}finally{if(a)throw r}}}},{key:"attachPlayEvent",value:function(){var e=this;this.$playButton.onclick=function(){e.startBattle()}}},{key:"attachPlayerChoiceEvent",value:function(){var e=this;document.querySelector(".BattlePlayer-action--R").onclick=function(){e.playerBattleChoice=c["default"].ROCK,e.printGameBattleHit1(e.playerBattleChoice)},document.querySelector(".BattlePlayer-action--P").onclick=function(){e.playerBattleChoice=c["default"].PAPER,e.printGameBattleHit1(e.playerBattleChoice)},document.querySelector(".BattlePlayer-action--S").onclick=function(){e.playerBattleChoice=c["default"].SCISSORS,e.printGameBattleHit1(e.playerBattleChoice)}}},{key:"gameSelection",value:function(t){var n="Game-choice",a=document.querySelector("."+n);a.innerText=t,a.className=n+" ChoiceTitle-"+t,t===e.GAME_WATCHER?(document.querySelector(".Battle-result-choice").innerText="Computer #1",document.querySelector(".BattlePlayer").style.display="none"):(document.querySelector(".Battle-result-choice").innerText="YOU",document.querySelector(".BattlePlayer").style.display="block")}},{key:"startBattle",value:function(){this.$playButton.disabled===!1&&(this.resetBattle(),this.$playButton.disabled=!0,document.querySelector(".ChoiceButtons-watcher").disabled=!0,document.querySelector(".ChoiceButtons-player").disabled=!0,this.$battle.style.visibility="visible",this.$battleResult.style.visibility="visible",this.$score.style.visibility="visible",this.launchCounter())}},{key:"resetBattle",value:function(){this.$battle.style.visibility="hidden",this.$battleResult.style.visibility="hidden",this.$score.style.visibility="hidden"}},{key:"launchCounter",value:function(){var t=this,n=3,a=document.querySelector(".Battle-counter"),r="player"===document.querySelector(".Game-choice").innerText;a.innerText=n,null===this.counterIntervalId&&(this.counterIntervalId=setInterval(function(){n--,a.innerText=n,0===n&&(clearInterval(t.counterIntervalId),t.counterIntervalId=null,f.attachAnimation(".Battle-counter","animCounterGo"),t.changePlayerBattleChoiceMessage(e.BATTLE_PLAYER_MSG_CLICKNOW),setTimeout(function(){if(null===t.bm){t.$battleResult.style.display="block",t.$score.style.display="block";var e=r?new h["default"]("YOU",h["default"].PLAYER):new h["default"]("Computer #1",h["default"].COMPUTER,h["default"].COMPUTER_MODE_RANDOM),n=new h["default"]("Computer #2",h["default"].COMPUTER,h["default"].COMPUTER_MODE_GON);t.bm=new o["default"](e,n)}t.launchMatch(),t.bm.done?t.endMatch():t.launchCounter()},1e3))},1e3))}},{key:"mapGameBattleHit",value:function(e){var t={R:"fa-hand-rock-o",P:"fa-hand-paper-o",S:"fa-hand-scissors-o"};return t[e]}},{key:"printGameBattleHit1",value:function(e){document.querySelector(".HandGame-player1 i").className="fa "+this.mapGameBattleHit(e)}},{key:"printGameBattleHit2",value:function(e){document.querySelector(".HandGame-player2 i").className="fa "+this.mapGameBattleHit(e)}},{key:"changePlayerBattleChoiceMessage",value:function(e){document.querySelector(".BattlePlayer-msg").innerText=e}},{key:"launchMatch",value:function(){var t=this,n=this.bm.battle(this.playerBattleChoice);this.printGameBattleScore(n[0],n[1]),this.updateScore(n[0],n[1]),"E"===n[0].status?(f.attachAnimation(".HandGame-player1","animWin1"),f.attachAnimation(".HandGame-player2","animWin2")):"W"===n[0].status?(f.attachAnimation(".HandGame-player1","animWin1"),f.attachAnimation(".Score-counter-player1","animWinScore")):(f.attachAnimation(".HandGame-player2","animWin2"),f.attachAnimation(".Score-counter-player2","animWinScore")),this.playerBattleChoice=null,setTimeout(function(){t.printGameBattleHit1(null),t.printGameBattleHit2(null)},1e3),this.changePlayerBattleChoiceMessage(e.BATTLE_PLAYER_MSG_WAIT)}},{key:"printGameBattleScore",value:function(e,t){this.printGameBattleHit1(e.hit),this.printGameBattleHit2(t.hit)}},{key:"updateScore",value:function(e,t){document.querySelector(".Score-counter-player1").innerText=this.bm.gameScore.playerScores[0].countWonRounds(),document.querySelector(".Score-counter-player2").innerText=this.bm.gameScore.playerScores[1].countWonRounds()}},{key:"endMatch",value:function(){document.querySelector(".MatchResult-winner").innerText=this.bm.winner.playerName,document.querySelector(".MatchResult").style.display="block",this.bm=null,this.$playButton.disabled=!1,document.querySelector(".ChoiceButtons-watcher").disabled=!1,document.querySelector(".ChoiceButtons-player").disabled=!1}}]),e}();y.GAME_WATCHER="watcher",y.GAME_PLAYER="player",y.BATTLE_PLAYER_MSG_WAIT="Choose a hit to play",y.BATTLE_PLAYER_MSG_CLICKNOW="Hurry, cli clic click !!!",n["default"]=y},{"./BattleManager":1,"./BattleRPS":2,"./Player":4}],4:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=e("./BattleRPS"),o=a(l),i=e("./Score"),c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Nobody",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.COMPUTER,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.COMPUTER_MODE_RANDOM;r(this,e),this.playerName=t,this.playerType=n,this.playerMode=a,this.winner=!1}return u(e,[{key:"play",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!t&&this.playerType===e.COMPUTER&this.playerMode===e.COMPUTER_MODE_RANDOM)return this.randomHit();if(!t&&this.playerType===e.COMPUTER&this.playerMode===e.COMPUTER_MODE_GON)return this.playGon(n);if(t)return t;if(t||this.playerType!==e.PLAYER)throw"Illegal player move !";return null}},{key:"playGon",value:function(e){var t=function(e){if(e&&e.length>=2){var t=e;e.length>2&&(t=e.slice(e.length-2));var n=[];switch(t[0].hit+t[1].hit){case"RR":n=[o["default"].ROCK,o["default"].SCISSORS];break;case"PP":n=[o["default"].ROCK,o["default"].PAPER];break;case"SS":n=[o["default"].PAPER,o["default"].SCISSORS];break;default:return null}return n[Math.floor(2*Math.random())]}return null},n=function(e){if(!e)return null;var t=1===e.length?e[0]:[e.length-1];if(t.status===i.PlayerScore.STATUS_WON)switch(t.hit){case o["default"].ROCK:return o["default"].PAPER;case o["default"].PAPER:return o["default"].SCISSORS;case o["default"].SCISSORS:return o["default"].ROCK}return null},a=function(e){if(!e)return null;var t=1===e.length?e[0]:[e.length-1];if(t.status===i.PlayerScore.STATUS_LOST)switch(t.hit){case o["default"].ROCK:return o["default"].SCISSORS;case o["default"].PAPER:return o["default"].ROCK;case o["default"].SCISSORS:return o["default"].PAPER}return null},r=[t,n,a],u=!0,l=!1,c=void 0;try{for(var s,h=r[Symbol.iterator]();!(u=(s=h.next()).done);u=!0){var f=s.value,y=f(e);if(y)return y}}catch(d){l=!0,c=d}finally{try{!u&&h["return"]&&h["return"]()}finally{if(l)throw c}}return this.randomHit()}},{key:"randomHit",value:function(){var e=[o["default"].ROCK,o["default"].PAPER,o["default"].SCISSORS],t=Math.floor(3*Math.random());return e[t]}}]),e}();c.PLAYER="Player",c.COMPUTER="Computer",c.COMPUTER_MODE_RANDOM="mode_random",c.COMPUTER_MODE_GON="mode_Gon",n["default"]=c},{"./BattleRPS":2,"./Score":5}],5:[function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(){function e(){a(this,e),this.score=[]}return r(e,[{key:"registerNewScore",value:function(e){if(!e.status)throw"Invalid score";this.score.push(e)}},{key:"countWonRounds",value:function(){var t=this.score.filter(function(t){return t.status===e.STATUS_WON});return t.length}},{key:"countLostRounds",value:function(){var t=this.score.filter(function(t){return t.status===e.STATUS_LOST});return t.length}},{key:"countEqualityRounds",value:function(){var t=this.score.filter(function(t){return t.status===e.STATUS_EQUALITY});return t.length}},{key:"countRoundNumber",value:function(){return this.score.length}}]),e}();u.STATUS_WON="W",u.STATUS_LOST="L",u.STATUS_EQUALITY="E";var l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new u,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new u;a(this,e),this.playerScores=[],this.playerScores.push(t),this.playerScores.push(n)}return r(e,[{key:"registerNewScores",value:function(e,t){this.playerScores[0].registerNewScore(e),this.playerScores[1].registerNewScore(t)}},{key:"getMaxWonRounds",value:function(){return Math.max(this.playerScores[0].countWonRounds(),this.playerScores[1].countWonRounds())}},{key:"getMaxLostRounds",value:function(){return Math.max(this.playerScores[0].countLostRounds(),this.playerScores[1].countLostRounds())}},{key:"getMaxEqualityRounds",value:function(){return Math.max(this.playerScores[0].countEqualityRounds(),this.playerScores[1].countEqualityRounds())}}]),e}();n.PlayerScore=u,n.GameScore=l;n.ScoreManager=function o(){a(this,o)}},{}],6:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var r=e("./lib/PageManager"),u=a(r);window.onload=function(){new u["default"]}},{"./lib/PageManager":3}]},{},[6]);