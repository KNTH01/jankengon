const expect = require('chai').expect
import BattleManager from '../app/scripts/lib/BattleManager'
import BattleRPS from '../app/scripts/lib/BattleRPS'
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

    describe('The Score', function () {
      it('should have a history score', () => {
        const comp1 = new Player(Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
        const comp2 = new Player(Player.COMPUTER)

        const bm = new BattleManager(comp1, comp2)

        // let score = bm.score()
        let scorePlayer1 = [ {
          won: true,
          hit: 'R'
        }, {
          won: true,
          hit: 'R'
        } ]

        let scorePlayer2 = [ {
          won: false,
          hit: 'S'
        }, {
          won: false,
          hit: 'S'
        } ]

        bm.score([scorePlayer1, scorePlayer2])

        // the match is not finished yet, just 2 rounds have been played
        expect(bm.done()).to.be.false()
        expect(bm.winner()).to.be.null()

        scorePlayer1.push({ won: true, hit: 'P' })
        scorePlayer1.push({ won: true, hit: 'S' })
        scorePlayer1.push({ won: true, hit: 'R' })
        scorePlayer1.push({ won: true, hit: 'S' })
        scorePlayer1.push({ won: true, hit: 'R' })
        scorePlayer1.push({ won: true, hit: 'S' })
        scorePlayer1.push({ won: true, hit: 'P' })
        scorePlayer1.push({ won: false, hit: 'P' })
        scorePlayer1.push({ won: true, hit: 'S' })

        scorePlayer2.push({ won: false, hit: 'R' })
        scorePlayer2.push({ won: false, hit: 'P' })
        scorePlayer2.push({ won: false, hit: 'S' })
        scorePlayer2.push({ won: false, hit: 'P' })
        scorePlayer2.push({ won: false, hit: 'S' })
        scorePlayer2.push({ won: false, hit: 'P' })
        scorePlayer2.push({ won: false, hit: 'R' })
        scorePlayer2.push({ won: true, hit: 'R' })
        scorePlayer2.push({ won: false, hit: 'P' })

        bm.score([scorePlayer1, scorePlayer2])

        expect(bm.done()).to.be.true()
        expect(bm.winner()).to.be.equal(comp1)
        expect(bm.nbRounds()).to.be.equal(11)
      })
    })
  })
})
