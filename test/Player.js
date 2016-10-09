const expect = require('chai').expect
import Player from '../app/scripts/lib/Player'
import BattleRPS from '../app/scripts/lib/BattleRPS'

describe('Player', function () {
  describe('Player Computer in Random mode', function () {
    it('should play randomly', () => {
      const RPS = [BattleRPS.ROCK, BattleRPS.PAPER, BattleRPS.SCISSORS]
      const computerPlayer = new Player(Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
      const hit = computerPlayer.play()

      expect(RPS).to.include(hit)
    })
  })
})
