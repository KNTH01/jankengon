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

    const res = this.bm.battle()
    console.log(res)
  }
}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'

export default PageManager
