const expect = require('chai').expect
import BattleManager from '../app/scripts/lib/BattleManager'
import Player from '../app/scripts/lib/Player'

describe('Battle Manager', function () {
  describe('The game', function () {
    it('should finish with a winner', () => {
      const comp1 = new Player('Comp1', Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
      const comp2 = new Player('Comp2', Player.COMPUTER)

      const bm = new BattleManager(comp1, comp2)

      // the game has not been started
      expect(bm.done).to.be.false

      while (!bm.done) {
        bm.battle()
      }

      expect(bm.done).to.be.true
    })

    describe('The Score', function () {
      it('should have a history score', () => {
        const comp1 = new Player('Comp1', Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
        const comp2 = new Player('Comp2', Player.COMPUTER)

        const bm = new BattleManager(comp1, comp2)

        bm.gameScore.registerNewScores({ status: 'W', hit: 'R' }, { status: 'L', hit: 'S' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'R' }, { status: 'L', hit: 'S' })

        // the match is not finished yet, just 2 rounds have been played
        bm.checkGameState()
        expect(bm.done).to.be.false
        expect(bm.winner).to.be.null

        bm.gameScore.registerNewScores({ status: 'W', hit: 'P' }, { status: 'L', hit: 'R' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'S' }, { status: 'L', hit: 'P' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'R' }, { status: 'L', hit: 'S' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'S' }, { status: 'L', hit: 'P' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'R' }, { status: 'L', hit: 'S' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'S' }, { status: 'L', hit: 'P' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'P' }, { status: 'L', hit: 'R' })
        bm.gameScore.registerNewScores({ status: 'L', hit: 'P' }, { status: 'W', hit: 'R' })
        bm.gameScore.registerNewScores({ status: 'E', hit: 'P' }, { status: 'E', hit: 'P' })
        bm.gameScore.registerNewScores({ status: 'W', hit: 'S' }, { status: 'L', hit: 'P' })

        bm.checkGameState()
        expect(bm.gameScore.getMaxWonRounds()).to.be.equal(10)
        expect(bm.gameScore.getMaxLostRounds()).to.be.equal(10)
        expect(bm.gameScore.getMaxEqualityRounds()).to.be.equal(1)
        expect(bm.winner).to.be.equal(comp1)
      })
    })
  })
})
