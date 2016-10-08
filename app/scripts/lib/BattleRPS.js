/**
 * Battle Rock Paper Scissors
 */
class BattleRPS {

  /**
   * Battle between player#1 and player#2
   * return 1 if player#1 win
   * return 2 if player#2 win
   * return 0 if equals
   */
  static battle (h1, h2) {
    switch (h1 + h2) {
      case 'PP':
      case 'RR':
      case 'SS':
        return 0
      case 'RS':
      case 'SP':
      case 'PR':
        return 1
      case 'SR':
      case 'PS':
      case 'RP':
        return 2
      default:
        throw 'Error, battle not found'
    }
  }
}

BattleRPS.ROCK = 'R'
BattleRPS.PAPER = 'P'
BattleRPS.SCISSORS = 'S'

export default BattleRPS
