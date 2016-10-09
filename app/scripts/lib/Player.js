import BattleRPS from './BattleRPS'

class Player {
  constructor (playerType = Player.COMPUTER, playerMode = Player.COMPUTER_MODE_RANDOM) {
    this.playerType = playerType
    this.playerMode = playerMode
  }

  play (hit = null, rivalScore = null) {
    if (this.playerType === Player.COMPUTER) {
      return this.randomHit()
    }
  }

  randomHit () {
    const RPS = [BattleRPS.ROCK, BattleRPS.PAPER, BattleRPS.SCISSORS]
    const hitNumber = Math.floor(Math.random() * 2)

    return RPS[hitNumber]
  }
}

Player.PLAYER = 'Player'
Player.COMPUTER = 'Computer'
Player.COMPUTER_MODE_RANDOM = 'mode_random'
Player.COMPUTER_MODE_GON = 'mode_Gon'

export default Player
