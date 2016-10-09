
import BattleManager from './BattleManager'
import BattleRPS from './BattleRPS'
import Player from './Player'

class Animate {

  static attachAnimation (selector, animationName) {
    let $elem = document.querySelector(selector)

    const originalCls = $elem.className

    $elem.className = `${originalCls} ${animationName}`

    $elem.addEventListener('animationend', () => {
      // reset className
      $elem.className = originalCls
    })
  }
}

/**
 * Handle the UI
 */
class PageManager {

  constructor () {
    this.$playButton = document.querySelector('.PlayButton')
    this.$battle = document.querySelector('.Battle')
    this.$battleResult = document.querySelector('.Battle-result')
    this.$score = document.querySelector('.Score')

    // used to have a singleton of the counter interval
    this.counterIntervalId = null

    // BattleManager instance
    this.bm = null

    // when the player plays, this stores his hit
    this.playerBattleChoice = null

    this.init()
  }

  /**
   * Attach event to the DOM
   */
  init () {
    this.attachGameSelectionEvent()
    this.attachPlayEvent()
    this.attachPlayerChoiceEvent()
  }

  attachGameSelectionEvent () {
    const buttonClasses = ['ChoiceButtons-watcher', 'ChoiceButtons-player']
    for (let buttonCls of buttonClasses) {
      document.querySelector(`.${buttonCls}`).onclick = () => {
        this.gameSelection(buttonCls.replace('ChoiceButtons-', ''))
      }
    }
  }

  attachPlayEvent () {
    this.$playButton.onclick = () => {
      this.startBattle()
    }
  }

  attachPlayerChoiceEvent () {
    document.querySelector('.BattlePlayer-action--R').onclick = () => {
      this.playerBattleChoice = BattleRPS.ROCK
      this.printGameBattleHit1(this.playerBattleChoice)
    }
    document.querySelector('.BattlePlayer-action--P').onclick = () => {
      this.playerBattleChoice = BattleRPS.PAPER
      this.printGameBattleHit1(this.playerBattleChoice)
    }
    document.querySelector('.BattlePlayer-action--S').onclick = () => {
      this.playerBattleChoice = BattleRPS.SCISSORS
      this.printGameBattleHit1(this.playerBattleChoice)
    }
  }

  /**
   * User choose between beeing a watcher or a player
   * setup environment accordingly
   */
  gameSelection (gameMode) {
    const selectorCls = 'Game-choice'
    const choiceTitleElem = document.querySelector(`.${selectorCls}`)
    choiceTitleElem.innerText = gameMode
    choiceTitleElem.className = `${selectorCls} ChoiceTitle-${gameMode}`

    if (gameMode === PageManager.GAME_WATCHER) {
      document.querySelector('.Battle-result-choice').innerText = 'Computer #1'
      document.querySelector('.BattlePlayer').style.display = 'none'
    } else {
      document.querySelector('.Battle-result-choice').innerText = 'YOU'
      document.querySelector('.BattlePlayer').style.display = 'block'
    }
  }

  /**
   * User clicks on Play button
   */
  startBattle () {
    if (this.$playButton.disabled === false) {
      this.resetBattle()

      this.$playButton.disabled = true

      document.querySelector('.ChoiceButtons-watcher').disabled = true
      document.querySelector('.ChoiceButtons-player').disabled = true

      // display Battle block
      this.$battle.style.visibility = 'visible'
      this.$battleResult.style.visibility = 'visible'
      this.$score.style.visibility = 'visible'

      // launch the game by launching the counter
      this.launchCounter()
    }
  }

  resetBattle () {
    this.$battle.style.visibility = 'hidden'
    this.$battleResult.style.visibility = 'hidden'
    this.$score.style.visibility = 'hidden'
  }

  /**
   * Launch the counter
   * each time the counter reach 0, a battle starts for the current round
   * then, the counter is reset and is launch again and again until the game is done
   */
  launchCounter () {
    let counter = 3
    const $elem = document.querySelector('.Battle-counter')
    const isRealPlayer = document.querySelector('.Game-choice').innerText === 'player'

    $elem.innerText = counter

    if (this.counterIntervalId === null) {
      this.counterIntervalId = setInterval(() => {
        counter--
        $elem.innerText = counter

        // counter reaches 0
        if (counter === 0) {
          clearInterval(this.counterIntervalId)
          this.counterIntervalId = null

          // allow the player 1 extra second to play, and insist with some animations
          Animate.attachAnimation('.Battle-counter', 'animCounterGo')
          this.changePlayerBattleChoiceMessage(PageManager.BATTLE_PLAYER_MSG_CLICKNOW)

          // handle this 1 extra second
          setTimeout(() => {
            // first launch of the counter, the BattleManager is not set yet so setup it
            if (this.bm === null) {
              // display battle game blocks
              this.$battleResult.style.display = 'block'
              this.$score.style.display = 'block'

              // create players depends on user's choice
              const p1 = isRealPlayer ? new Player('YOU', Player.PLAYER) : new Player('Computer #1', Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
              // Computer #2 is set up in Gon mode
              const p2 = new Player('Computer #2', Player.COMPUTER, Player.COMPUTER_MODE_GON)

              // the most important here, create the BattleManager
              this.bm = new BattleManager(p1, p2)
            }

            // launch the battle for the current round
            this.launchMatch()

            if (!this.bm.done) {
              // iterate again and again until the game is done
              this.launchCounter()
            } else {
              // end the match, stop everything
              this.endMatch()
            }
          }, 1000)
        }
      }, 1000)
    }
  }

  /**
   * Map RPS hits with FA icons
   */
  mapGameBattleHit (hit) {
    const mapRPSToCls = {
      'R': 'fa-hand-rock-o',
      'P': 'fa-hand-paper-o',
      'S': 'fa-hand-scissors-o'
    }
    return mapRPSToCls[hit]
  }

  /**
   * Print the RPS FA icons
   */
  printGameBattleHit1 (hit) {
    document.querySelector('.HandGame-player1 i').className = `fa ${this.mapGameBattleHit(hit)}`
  }

  /**
   * Print the RPS FA icons
   */
  printGameBattleHit2 (hit) {
    document.querySelector('.HandGame-player2 i').className = `fa ${this.mapGameBattleHit(hit)}`
  }

  /**
   * Display a 'hurry' message when the user reaches the 1 extra second to play
   */
  changePlayerBattleChoiceMessage (msg) {
    document.querySelector('.BattlePlayer-msg').innerText = msg
  }

  /**
   * Launch the battle for the current round
   */
  launchMatch () {
    // launch the battle and get the result scores
    const scores = this.bm.battle(this.playerBattleChoice)

    // display to the UI what bots have played
    this.printGameBattleScore(scores[0], scores[1])

    // update the won counter score
    this.updateScore(scores[0], scores[1])

    // Animate the battle
    if (scores[0].status === 'E') {
      Animate.attachAnimation('.HandGame-player1', 'animWin1')
      Animate.attachAnimation('.HandGame-player2', 'animWin2')
    } else if (scores[0].status === 'W') {
      Animate.attachAnimation('.HandGame-player1', 'animWin1')
      Animate.attachAnimation('.Score-counter-player1', 'animWinScore')
    } else {
      Animate.attachAnimation('.HandGame-player2', 'animWin2')
      Animate.attachAnimation('.Score-counter-player2', 'animWinScore')
    }

    // clear the player battle choice for the next round
    this.playerBattleChoice = null
    setTimeout(() => {
      // remove battle choice to be ready for the next battle
      this.printGameBattleHit1(null)
      this.printGameBattleHit2(null)
    }, 1000)

    // reset 'hurry' message
    this.changePlayerBattleChoiceMessage(PageManager.BATTLE_PLAYER_MSG_WAIT)
  }

  /**
   * Display the battle results, the choice made by the bots
   */
  printGameBattleScore (score1, score2) {
    this.printGameBattleHit1(score1.hit)
    this.printGameBattleHit2(score2.hit)
  }

  /**
   * Update the won counter score
   */
  updateScore (score1, score2) {
    document.querySelector('.Score-counter-player1').innerText = this.bm.gameScore.playerScores[0].countWonRounds()
    document.querySelector('.Score-counter-player2').innerText = this.bm.gameScore.playerScores[1].countWonRounds()
  }

  /**
   * End the match, so user can play again
   */
  endMatch () {
    // set up the winner
    document.querySelector('.MatchResult-winner').innerText = this.bm.winner.playerName
    document.querySelector('.MatchResult').style.display = 'block'

    // reset game state
    this.bm = null
    // enable playbutton
    this.$playButton.disabled = false
    document.querySelector('.ChoiceButtons-watcher').disabled = false
    document.querySelector('.ChoiceButtons-player').disabled = false
  }
}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'
PageManager.BATTLE_PLAYER_MSG_WAIT = 'Choose a hit to play'
PageManager.BATTLE_PLAYER_MSG_CLICKNOW = 'Hurry, cli clic click !!!'
export default PageManager
