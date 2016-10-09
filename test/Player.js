const expect = require('chai').expect
import Player from '../app/scripts/lib/Player'
import BattleRPS from '../app/scripts/lib/BattleRPS'

describe('Player', function () {
  describe('Player Computer in Random mode', function () {
    it('should play randomly', () => {
      const RPS = [BattleRPS.ROCK, BattleRPS.PAPER, BattleRPS.SCISSORS]
      const computerPlayer = new Player('computer', Player.COMPUTER, Player.COMPUTER_MODE_RANDOM)
      const hit = computerPlayer.play()

      expect(RPS).to.include(hit)
    })
  })

  describe('Player Computer in Gon mode', function () {
    it('should play randomly 33% with no battle score', () => {
      const gonPlayer = new Player('Gon', Player.COMPUTER, Player.COMPUTER_MODE_GON)
      const RPS = [BattleRPS.ROCK, BattleRPS.PAPER, BattleRPS.SCISSORS]
      let hit = gonPlayer.play()

      // random hit
      expect(RPS).to.include(hit)

      // if equality, next rounds would be random
      hit = gonPlayer.play(null, [{hit: 'R', status: 'E'}])

      // random hit
      expect(RPS).to.include(hit)
    })

    it('should play randomly 50% with battle score twice same hits', () => {
      const gonPlayer = new Player('Gon', Player.COMPUTER, Player.COMPUTER_MODE_GON)
      let rivalScore = []
      let hit = null

      rivalScore = [{hit: 'S'}, {hit: 'S'}]
      hit = gonPlayer.play(null, rivalScore)

      // never play rock after twice scissors
      expect(hit).to.be.not.equal('R')
      expect(['P', 'S']).to.include(hit)

      rivalScore = [{hit: 'R'}, {hit: 'R'}]
      hit = gonPlayer.play(null, rivalScore)

      // never play paper after twice rocks
      expect(hit).to.be.not.equal('P')
      expect(['R', 'S']).to.include(hit)

      rivalScore = [{hit: 'P'}, {hit: 'P'}]
      hit = gonPlayer.play(null, rivalScore)

      // never play scissors after twice papers
      expect(hit).to.be.not.equal('S')
      expect(['R', 'P']).to.include(hit)
    })

    it('should play a specific hit when rival won', () => {
      const gonPlayer = new Player('Gon', Player.COMPUTER, Player.COMPUTER_MODE_GON)
      let rivalScore = []
      let hit = null

      rivalScore = [{hit: 'R', status: 'W'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('P')

      rivalScore = [{hit: 'P', status: 'W'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('S')

      rivalScore = [{hit: 'S', status: 'W'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('R')
    })

    it('should play a specific hit when rival lose', () => {
      const gonPlayer = new Player('Gon', Player.COMPUTER, Player.COMPUTER_MODE_GON)
      let rivalScore = []
      let hit = null

      rivalScore = [{hit: 'R', status: 'L'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('S')

      rivalScore = [{hit: 'P', status: 'L'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('R')

      rivalScore = [{hit: 'S', status: 'L'}]
      hit = gonPlayer.play(null, rivalScore)
      expect(hit).to.be.equal('P')
    })
  })
})
