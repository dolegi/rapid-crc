const Benchmark = require('benchmark')

const { crc32 } = require('../../src/js/crc32')
const { zlib } = require('../../build/Release/rapid_crc.node')
const createInput = require('../helpers/createInput')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

describe('crc32', () => {
  it('creates the expected output', () => {
    const expected = 3056077038
    const actual = crc32(input)
    expect(actual).toEqual(expected)
  })

  describe('matching zlib output', () => {
    it('matches small input', () => {
      const input = createInput(10)

      expect(crc32(input)).toEqual(zlib(input))
    })

    it('matches large input', () => {
      const input = createInput(1000000)

      expect(crc32(input)).toEqual(zlib(input))
    })

    it('matches with starting crc value', () => {
      const input = createInput(10000)
      const crc = 0xfe561729

      expect(crc32(input, crc)).toEqual(zlib(input, crc))
    })
  })

  describe('performance', () => {
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    })

    it('is faster than zlib', done => {
      const input = createInput(100);
      (new Benchmark.Suite)
        .add('zlib', () => {
          zlib(input)
        })
        .add('rapid', () => {
          crc32(input)
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
})

