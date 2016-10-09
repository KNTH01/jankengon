
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

  gameSelection (gameMode) {
    this.setChoiceTitle(gameMode)
  }

  setChoiceTitle (gameMode) {
    const selectorCls = 'Game-choice'
    const choiceTitleElem = document.querySelector(`.${selectorCls}`)
    choiceTitleElem.innerText = gameMode
    choiceTitleElem.className = `${selectorCls} ChoiceTitle-${gameMode}`

    if (gameMode === PageManager.GAME_WATCHER) {
      document.querySelector('.Battle-result-choice').innerText = 'Computer #1'
    } else {
      document.querySelector('.Battle-result-choice').innerText = 'YOU'
    }
  }

  startBattle () {
    // display Battle block
    if (this.$playButton.disabled === false) {
      this.resetBattle()
      this.$playButton.disabled = true
      this.$battle.style.display = 'block'

      this.launchCounter()
    }
  }

  resetBattle () {
    this.$battle.style.display = 'none'
    this.$battleResult.style.display = 'none'
    this.$score.style.display = 'none'
  }

  launchCounter () {
    let counter = 3
    const $elem = document.querySelector('.Battle-counter')
    const isRealPlayer = document.querySelector('.Game-choice').innerText === 'player'

    $elem.innerText = counter

    if (this.counterIntervalId === null) {
      this.counterIntervalId = setInterval(() => {
        counter--
        $elem.innerText = counter

        if (counter === 0) {
          clearInterval(this.counterIntervalId)
          this.counterIntervalId = null

          Animate.attachAnimation('.Battle-counter', 'animCounterGo')
          this.changePlayerBattleChoiceMessage(PageManager.BATTLE_PLAYER_MSG_CLICKNOW)

          setTimeout(() => {
            if (this.bm === null) {
              this.$battleResult.style.display = 'block'
              this.$score.style.display = 'block'

              const p1 = isRealPlayer ? new Player('YOU', Player.PLAYER) : new Player('Computer #1', Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
              const p2 = new Player('Computer #2', Player.COMPUTER, Player.COMPUTER_MODE_GON)
              this.bm = new BattleManager(p1, p2)
            }

            this.launchMatch()

            if (!this.bm.done) {
              this.launchCounter()
            } else {
              this.endMatch()
            }
          }, 1000)
        }
      }, 1000)
    }
  }

  mapGameBattleHit (hit) {
    const mapRPSToCls = {
      'R': 'fa-hand-rock-o',
      'P': 'fa-hand-paper-o',
      'S': 'fa-hand-scissors-o'
    }
    return mapRPSToCls[hit]
  }

  printGameBattleHit1 (hit) {
    document.querySelector('.HandGame-player1 i').className = `fa ${this.mapGameBattleHit(hit)}`
  }

  printGameBattleHit2 (hit) {
    document.querySelector('.HandGame-player2 i').className = `fa ${this.mapGameBattleHit(hit)}`
  }

  changePlayerBattleChoiceMessage (msg) {
    document.querySelector('.BattlePlayer-msg').innerText = msg
  }

  launchMatch () {
    const scores = this.bm.battle(this.playerBattleChoice)

    this.printGameBattleScore(scores[0], scores[1])
    this.updateScore(scores[0], scores[1])

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
      // remove battle choice
      this.printGameBattleHit1(null)
      this.printGameBattleHit2(null)
    }, 1000)

    // reset message
    this.changePlayerBattleChoiceMessage(PageManager.BATTLE_PLAYER_MSG_WAIT)
  }

  printGameBattleScore (score1, score2) {
    this.printGameBattleHit1(score1.hit)
    this.printGameBattleHit2(score2.hit)
  }

  updateScore (score1, score2) {
    document.querySelector('.Score-counter-player1').innerText = this.bm.gameScore.playerScores[0].countWonRounds()
    document.querySelector('.Score-counter-player2').innerText = this.bm.gameScore.playerScores[1].countWonRounds()
  }

  endMatch () {
    // set up the winner
    document.querySelector('.MatchResult-winner').innerText = this.bm.winner.playerName
    document.querySelector('.MatchResult').style.display = 'block'

    // reset game state
    this.bm = null
    // enable playbutton
    this.$playButton.disabled = false
  }

}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'
PageManager.BATTLE_PLAYER_MSG_WAIT = 'Wait for counter to be 0 before select ;)'
PageManager.BATTLE_PLAYER_MSG_CLICKNOW = 'Hurry, cli clic click !!!'
export default PageManager
