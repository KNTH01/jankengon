import Player from './Player'
import BattleRPS from './BattleRPS'
import {PlayerScore, GameScore} from './Score'

class BattleManager {

  constructor (p1, p2) {
    if (!(p1 instanceof Player) || !(p2 instanceof Player)) {
      throw 'BattleManager constructor bad parameters'
    }

    this.p1 = p1
    this.p2 = p2
    this.gameScore = new GameScore()
    this.nbRound = 0
    this.done = false
  }

  battle () {
    const hit1 = this.p1.play()
    const hit2 = this.p2.play()
    const res = BattleRPS.battle(hit1, hit2)
    let status1 = 'E'
    let status2 = 'E'

    if (res === 1) {
      status1 = 'W'
      status2 = 'L'
    } else if (res === 2) {
      status1 = 'L'
      status2 = 'W'
    }

    this.gameScore.registerNewScores({
      hit: hit1,
      status: status1
    }, {
      hit: hit2,
      status: status2
    })

    this.nbRound++

    this.checkGameState()
  }

  checkGameState () {
    const maxWonRounds = this.gameScore.getMaxWonRounds()
    if (maxWonRounds > BattleManager.ROUNDS_NUMBER) {
      throw 'BattleManager should already stop the game and setup a winner'
    } else if (maxWonRounds === BattleManager.ROUNDS_NUMBER) {
      if (this.gameScore.playerScores[0].countWonRounds() === BattleManager.ROUNDS_NUMBER) {
        this.p1.winner = true
      } else {
        this.p2.winner = true
      }
      this.done = true
    }
  }
}

BattleManager.ROUNDS_NUMBER = 10

export default BattleManager
