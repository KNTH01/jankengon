class PageManager {
  static init () {
    PageManager.attachGameSelectionEvent()
  }

  static attachGameSelectionEvent () {
    const buttonClasses = ['ChoiceButtons-watch', 'ChoiceButtons-play']
    for (let buttonCls of buttonClasses) {
      document.querySelector(`.${buttonCls}`).onclick = function () {
        PageManager.gameSelection(buttonCls.replace('ChoiceButtons-', ''))
      }
    }
  }

  static gameSelection (game) {
    console.log(game + ' game is selected')
  }
}
PageManager.GAME_WATCH = 'watch'
PageManager.GAME_PLAY = 'play'

export default PageManager
