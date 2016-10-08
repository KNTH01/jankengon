class PageManager {
  static init () {
    PageManager.attachGameSelectionEvent()
    PageManager.attachPlayEvent()
  }

  static attachGameSelectionEvent () {
    const buttonClasses = ['ChoiceButtons-watcher', 'ChoiceButtons-player']
    for (let buttonCls of buttonClasses) {
      document.querySelector(`.${buttonCls}`).onclick = function () {
        PageManager.gameSelection(buttonCls.replace('ChoiceButtons-', ''))
      }
    }
  }

  static attachPlayEvent () {
    document.querySelector('.PlayButton').onclick = function () {
      PageManager.startBattle()
    }
  }

  static gameSelection (gameMode) {
    PageManager.setChoiceTitle(gameMode)
  }

  static setChoiceTitle (gameMode) {
    const selectorCls = 'Game-choice'
    const choiceTitleElem = document.querySelector(`.${selectorCls}`)
    choiceTitleElem.innerText = gameMode
    choiceTitleElem.className = `${selectorCls} ChoiceTitle-${gameMode}`
  }

  static startBattle () {
    // display Battle block
    PageManager.resetBattle()
    document.querySelector('.Battle').style.display = 'block'
    PageManager.launchCounter()
  }

  static resetBattle () {
    document.querySelector('.Battle').style.display = 'none'
    document.querySelector('.Battle-result').style.display = 'none'
    document.querySelector('.Score').style.display = 'none'
  }

  static launchCounter () {
    let counter = 3
    const elem = document.querySelector('.Battle-counter')

    elem.innerText = counter

    const id = setInterval(() => {
      counter--
      elem.innerText = counter
      if (counter === 0) {
        clearInterval(id)
        PageManager.launchMatch()
      }
    }, 1000)
  }

  static launchMatch () {
    document.querySelector('.Battle-result').style.display = 'block'
    document.querySelector('.Score').style.display = 'block'
  }

  static togglePlayButton () {

  }

}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'

export default PageManager
