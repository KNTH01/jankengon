class PageManager {

  constructor () {
    this.$playButton = document.querySelector('.PlayButton')
    this.$battle = document.querySelector('.Battle')
    this.$battleResult = document.querySelector('.Battle-result')
    this.$score = document.querySelector('.Score')

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
    this.resetBattle()
    this.$battle.style.display = 'block'
    this.launchCounter()
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

    const id = setInterval(() => {
      counter--
      elem.innerText = counter
      if (counter === 0) {
        clearInterval(id)
        this.launchMatch()
      }
    }, 1000)
  }

  launchMatch () {
    this.$battleResult.style.display = 'block'
    this.$score.style.display = 'block'
  }

  togglePlayButton () {

  }

}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'

export default PageManager
