import BattleRPS from './BattleRPS'
import {PlayerScore} from './Score'

/**
 * Player instance
 */
class Player {
  constructor (playerName = 'Nobody', playerType = Player.COMPUTER, playerMode = Player.COMPUTER_MODE_RANDOM) {
    this.playerName = playerName
    this.playerType = playerType
    this.playerMode = playerMode
    this.winner = false
  }

  /**
   * Play method and should return a hit
   */
  play (hit = null, rivalScores = null) {
    if (!hit && this.playerType === Player.COMPUTER & this.playerMode === Player.COMPUTER_MODE_RANDOM) {
      return this.randomHit()
    } else if (!hit && this.playerType === Player.COMPUTER & this.playerMode === Player.COMPUTER_MODE_GON) {
      return this.playGon(rivalScores)
    } else if (hit) {
      return hit
    } else {
      throw 'Illegal player move !'
    }
  }

  /**
   * Play as Gon
   */
  playGon (rivalScores) {
    /**
     * Strategy random50
     * the rival player should not play 3 times the same hit
     * by removing the next hit possibilities of 1, Gon has 50% success rate
     */
    let playRandom50 = (rivalScores) => {
      if (rivalScores && rivalScores.length >= 2) {
        let scores = rivalScores
        if (rivalScores.length > 2) {
          scores = rivalScores.slice(rivalScores.length - 2)
        }

        let hits = []

        switch (scores[0].hit + scores[1].hit) {
          case 'RR':
            hits = [BattleRPS.ROCK, BattleRPS.SCISSORS]
            break
          case 'PP':
            hits = [BattleRPS.ROCK, BattleRPS.PAPER]
            break
          case 'SS':
            hits = [BattleRPS.PAPER, BattleRPS.SCISSORS]
            break
          default:
            return null
        }

        // random between 2 hits
        return hits[Math.floor(Math.random() * 2)]
      }

      return null
    }

    /**
     * Strategy circularWon
     * the rival player should repeat the last hit if he won
     * Gon responses with the specific hit
     */
    let playCircularWon = (rivalScores) => {
      if (!rivalScores) {
        return null
      }

      const score = rivalScores.length === 1 ? rivalScores[0] : [rivalScores.length - 1]
      if (score.status === PlayerScore.STATUS_WON) {
        switch (score.hit) {
          case BattleRPS.ROCK:
            return BattleRPS.PAPER
          case BattleRPS.PAPER:
            return BattleRPS.SCISSORS
          case BattleRPS.SCISSORS:
            return BattleRPS.ROCK
        }
      }
      return null
    }

    /**
     * Strategy CircularLost
     * the rival player should put his next hit with the next R>P>S chain if he lost
     * Gon responses with the specific hit
     */
    let playCircularLost = (rivalScores) => {
      if (!rivalScores) {
        return null
      }

      const score = rivalScores.length === 1 ? rivalScores[0] : [rivalScores.length - 1]
      if (score.status === PlayerScore.STATUS_LOST) {
        switch (score.hit) {
          case BattleRPS.ROCK:
            return BattleRPS.SCISSORS
          case BattleRPS.PAPER:
            return BattleRPS.ROCK
          case BattleRPS.SCISSORS:
            return BattleRPS.PAPER
        }
      }
      return null
    }

    // strategies are stored in the array and ordered by priority
    const strategies = [playRandom50, playCircularWon, playCircularLost]

    for (let strategy of strategies) {
      const res = strategy(rivalScores)
      if (res) {
        // if strategy match, then for for it, else check the next one
        return res
      }
    }

    // default move: random
    return this.randomHit()
  }

  /**
   * Just a random hit
   */
  randomHit () {
    const RPS = [BattleRPS.ROCK, BattleRPS.PAPER, BattleRPS.SCISSORS]
    const hitNumber = Math.floor(Math.random() * 3)

    return RPS[hitNumber]
  }
}

Player.PLAYER = 'Player'
Player.COMPUTER = 'Computer'
Player.COMPUTER_MODE_RANDOM = 'mode_random'
Player.COMPUTER_MODE_GON = 'mode_Gon'

export default Player
