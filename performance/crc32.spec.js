const Benchmark = require('benchmark')

const { crc32 } = require('../src')
const { crc32js }  = require('../src/js/crc32')
const createInput = require('../spec/helpers/createInput')

const { zlib } = require('../build/Release/rapid_crc.node')
const sheetjs = require('crc-32') 
const crc = require('crc')
const turbo = require('turbo-crc32/crc32c')

describe('crc32', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  })

  it('is the fastest', done => {
    const input = createInput(100);
    (new Benchmark.Suite)
      .add('zlib', () => zlib(input, -1))
      .add('rapid', () => crc32(input))
      .add('rapidjs', () => crc32js(input))
      .add('node-crc', () => crc.crc32(input))
      .add('sheetjs', () => sheetjs.buf(input))
      .add('turbo', () => turbo(input))
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

