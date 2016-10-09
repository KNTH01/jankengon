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

  battle (uiHit1 = null, uiHit2 = null) {
    const hit1 = this.p1.play(uiHit1)
    const hit2 = this.p2.play(uiHit2, this.gameScore.playerScores[1].score)
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

    const scores = [ {
      hit: hit1,
      status: status1
    }, {
      hit: hit2,
      status: status2
    } ]

    this.gameScore.registerNewScores(scores[0], scores[1])

    this.nbRound++

    this.checkGameState()
    return scores
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

  get winner () {
    if (this.p1.winner) {
      return this.p1
    } else if (this.p2.winner) {
      return this.p2
    } else {
      return null
    }
  }
}

BattleManager.ROUNDS_NUMBER = 10

export default BattleManager
