import BattleManager from './BattleManager'
import Player from './Player'

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

    this.init()
  }

  init () {
    this.attachGameSelectionEvent()
    this.attachPlayEvent()
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

  gameSelection (gameMode) {
    this.setChoiceTitle(gameMode)
  }

  setChoiceTitle (gameMode) {
    const selectorCls = 'Game-choice'
    const choiceTitleElem = document.querySelector(`.${selectorCls}`)
    choiceTitleElem.innerText = gameMode
    choiceTitleElem.className = `${selectorCls} ChoiceTitle-${gameMode}`
  }

  startBattle () {
    // display Battle block
    if (this.$playButton.disabled === false) {
      this.resetBattle()
      this.$playButton.disabled = true
      this.$battle.style.display = 'block'

      const p1 = new Player()
      const p2 = new Player()
      this.bm = new BattleManager(p1, p2)

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
    const elem = document.querySelector('.Battle-counter')

    elem.innerText = counter

    if (this.counterIntervalId === null) {
      this.counterIntervalId = setInterval(() => {
        counter--
        elem.innerText = counter
        if (counter === 0) {
          clearInterval(this.counterIntervalId)
          this.counterIntervalId = null
          this.$playButton.disabled = false
          this.launchMatch()
        }
      }, 1000)
    }
  }

  launchMatch () {
    this.$battleResult.style.display = 'block'
    this.$score.style.display = 'block'

    const scores = this.bm.battle()
    this.printGameBattle(scores[0], scores[1])
    this.updateScore(scores[0], scores[1])
  }

  printGameBattle (score1, score2) {
    const mapRPSToCls = {
      'R': 'fa-hand-rock-o',
      'P': 'fa-hand-paper-o',
      'S': 'fa-hand-scissors-o'
    }
    document.querySelector('.HandGame-player1 i').className = `fa ${mapRPSToCls[score1.hit]}`
    document.querySelector('.HandGame-player2 i').className = `fa ${mapRPSToCls[score2.hit]}`
  }

  updateScore (score1, score2) {
    document.querySelector('.Score-counter-player1').innerText = this.bm.gameScore.playerScores[0].countWonRounds()
    document.querySelector('.Score-counter-player2').innerText = this.bm.gameScore.playerScores[1].countWonRounds()
  }

}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'

export default PageManager
