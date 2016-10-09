import BattleRPS from './BattleRPS'

class Player {
  constructor (playerName = 'Nobody', playerType = Player.COMPUTER, playerMode = Player.COMPUTER_MODE_RANDOM) {
    this.playerName = playerName
    this.playerType = playerType
    this.playerMode = playerMode
    this.winner = false
  }

  play (hit = null, rivalScore = null) {
    if (this.playerType === Player.COMPUTER) {
      return this.randomHit()
    }
  }

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
