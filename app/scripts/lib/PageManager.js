class PageManager {
  static init () {
    PageManager.attachGameSelectionEvent()
  }

  static attachGameSelectionEvent () {
    const buttonClasses = ['ChoiceButtons-watcher', 'ChoiceButtons-player']
    for (let buttonCls of buttonClasses) {
      document.querySelector(`.${buttonCls}`).onclick = function () {
        PageManager.gameSelection(buttonCls.replace('ChoiceButtons-', ''))
      }
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
}
PageManager.GAME_WATCHER = 'watcher'
PageManager.GAME_PLAYER = 'player'

export default PageManager
