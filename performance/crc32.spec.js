const Benchmark = require('benchmark')

const { zlib } = require('../build/Release/rapid_crc.node')
const { crc32 } = require('../src')
const { crc32js }  = require('../src/js/crc32')
const createInput = require('../spec/helpers/createInput')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

describe('crc32', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  })

  it('is faster than zlib', done => {
    const input = createInput(100);
    (new Benchmark.Suite)
      .add('zlib', () => {
        zlib(input, -1)
      })
      .add('rapid', () => {
        crc32(input)
      })
      .add('rapidjs', () => {
        crc32js(input)
      })
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

