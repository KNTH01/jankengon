const expect = require('chai').expect
import BattleManager from '../app/scripts/lib/BattleManager'
import Player from '../app/scripts/lib/Player'

describe('Battle Manager', function () {
  describe('The game', function () {
    it('should finish with a winner', () => {
      const comp1 = new Player(Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
      const comp2 = new Player(Player.COMPUTER)

      const bm = new BattleManager(comp1, comp2)
      while (bm.done()) {
        bm.battle()
      }

      expect(bm.done()).to.be.true()
    })
  })
})
