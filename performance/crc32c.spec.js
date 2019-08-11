const Benchmark = require('benchmark')

const { crc32c } = require('../src')
const { crc32cjs }  = require('../src/js/crc32')
const createInput = require('../spec/helpers/createInput')

const turbo = require('turbo-crc32/crc32c')
const sse4 = require('sse4_crc32')

describe('crc32c', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  })

  it('is the fastest', done => {
    const input = createInput(100);
    (new Benchmark.Suite)
      .add('rapid', () => crc32c(input))
      .add('rapidjs', () => crc32cjs(input))
      .add('turbo', () => turbo(input))
      .add('sse4', () => sse4.calculate(input))
      .on('cycle', event => {
        console.log(String(event.target))
      })
      .on('complete', function () {
        expect(this.filter('fastest').map('name')[0]).toEqual('rapid')
        done()
      })
      .run({ 'async': true })
  })
})

