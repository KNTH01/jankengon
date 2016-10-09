const expect = require('chai').expect
import BattleManager from '../app/scripts/lib/BattleManager'
import Player from '../app/scripts/lib/Player'

describe('Battle Manager', function () {
  describe('The game', function () {
    it('should finish with a winner', () => {
      const comp1 = new Player(Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
      const comp2 = new Player(Player.COMPUTER)

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
        const comp1 = new Player(Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
        const comp2 = new Player(Player.COMPUTER)

        const bm = new BattleManager(comp1, comp2)

        // let score = bm.score()
        let scorePlayer1 = [ {
          status: 'W',
          hit: 'R'
        }, {
          status: 'W',
          hit: 'R'
        } ]

        let scorePlayer2 = [ {
          status: 'L',
          hit: 'S'
        }, {
          status: 'L',
          hit: 'S'
        } ]

        bm.score([scorePlayer1, scorePlayer2])

        // the match is not finished yet, just 2 rounds have been played
        expect(bm.done()).to.be.false()
        expect(bm.winner()).to.be.null()

        scorePlayer1.push({ status: 'W', hit: 'P' })
        scorePlayer1.push({ status: 'W', hit: 'S' })
        scorePlayer1.push({ status: 'W', hit: 'R' })
        scorePlayer1.push({ status: 'W', hit: 'S' })
        scorePlayer1.push({ status: 'W', hit: 'R' })
        scorePlayer1.push({ status: 'W', hit: 'S' })
        scorePlayer1.push({ status: 'W', hit: 'P' })
        scorePlayer1.push({ status: 'L', hit: 'P' })
        scorePlayer1.push({ status: 'E', hit: 'P' })
        scorePlayer1.push({ status: 'W', hit: 'S' })

        scorePlayer2.push({ status: 'L', hit: 'R' })
        scorePlayer2.push({ status: 'L', hit: 'P' })
        scorePlayer2.push({ status: 'L', hit: 'S' })
        scorePlayer2.push({ status: 'L', hit: 'P' })
        scorePlayer2.push({ status: 'L', hit: 'S' })
        scorePlayer2.push({ status: 'L', hit: 'P' })
        scorePlayer2.push({ status: 'L', hit: 'R' })
        scorePlayer2.push({ status: 'W', hit: 'R' })
        scorePlayer2.push({ status: 'E', hit: 'P' })
        scorePlayer2.push({ status: 'L', hit: 'P' })

        bm.score([scorePlayer1, scorePlayer2])

        expect(bm.done()).to.be.true()
        expect(bm.winner()).to.be.equal(comp1)
        expect(scorePlayer1.length).to.be.equal(scorePlayer2.length)
        expect(bm.nbRounds()).to.be.equal(12)
      })
    })
  })
})
