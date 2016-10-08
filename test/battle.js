const expect = require('chai').expect
const BattleRPS = require('../app/scripts/lib/BattleRPS')

describe('Battle RPS / JanKenPon', function () {
  it('Rock vs Scissors sould return 1', () => {
    expect(BattleRPS.battle('R', 'S')).to.equal(1)
  })
  it('Scissors vs Paper sould return 1', () => {
    expect(BattleRPS.battle('S', 'P')).to.equal(1)
  })
  it('Paper vs Rock sould return 1', () => {
    expect(BattleRPS.battle('P', 'R')).to.equal(1)
  })

  it('Scissors vs Rock sould return 2', () => {
    expect(BattleRPS.battle('S', 'R')).to.equal(2)
  })
  it('Paper vs Scissors sould return 2', () => {
    expect(BattleRPS.battle('P', 'S')).to.equal(2)
  })
  it('Rock vs Paper sould return 2', () => {
    expect(BattleRPS.battle('R', 'P')).to.equal(2)
  })

  it('Rock vs Rock sould return 0', () => {
    expect(BattleRPS.battle('R', 'R')).to.equal(0)
  })

  it('Paper vs Paper sould return 0', () => {
    expect(BattleRPS.battle('P', 'P')).to.equal(0)
  })

  it('Scissors vs Scissors sould return 0', () => {
    expect(BattleRPS.battle('S', 'S')).to.equal(0)
  })
})
