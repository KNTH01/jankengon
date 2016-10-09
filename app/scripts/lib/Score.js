class PlayerScore {
  constructor () {
    this.score = []
  }

  registerNewScore (score) {
    if (score.status) {
      this.score.push(score)
    } else {
      throw 'Invalid score'
    }
  }

  countWonRounds () {
    const wonRounds = this.score.filter(elem => elem.status === PlayerScore.STATUS_WON)
    return wonRounds.length
  }

  countLostRounds () {
    const lostRounds = this.score.filter(elem => elem.status === PlayerScore.STATUS_LOST)
    return lostRounds.length
  }

  countEqualityRounds () {
    const equalityRounds = this.score.filter(elem => elem.status === PlayerScore.STATUS_EQUALITY)
    return equalityRounds.length
  }

  countRoundNumber () {
    return this.score.length
  }
}
PlayerScore.STATUS_WON = 'W'
PlayerScore.STATUS_LOST = 'L'
PlayerScore.STATUS_EQUALITY = 'E'

class GameScore {
  constructor (playerScore1 = new PlayerScore(), playerScore2 = new PlayerScore()) {
    this.playerScores = []
    this.playerScores.push(playerScore1)
    this.playerScores.push(playerScore2)
  }

  registerNewScores (score1, score2) {
    this.playerScores[0].registerNewScore(score1)
    this.playerScores[1].registerNewScore(score2)
  }

  getMaxWonRounds () {
    return Math.max(this.playerScores[0].countWonRounds(), this.playerScores[1].countWonRounds())
  }

  getMaxLostRounds () {
    return Math.max(this.playerScores[0].countLostRounds(), this.playerScores[1].countLostRounds())
  }

  getMaxEqualityRounds () {
    return Math.max(this.playerScores[0].countEqualityRounds(), this.playerScores[1].countEqualityRounds())
  }
}

export { PlayerScore, GameScore }

// TODO
export class ScoreManager {}
