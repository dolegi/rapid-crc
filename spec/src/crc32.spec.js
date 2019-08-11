const Benchmark = require('benchmark')

const { zlib } = require('../../build/Release/rapid_crc.node')
const { crc32 } = require('../../src')
const { crc32js }  = require('../../src/js/crc32')
const createInput = require('../helpers/createInput')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

describe('crc32', () => {
  it('creates the expected output', () => {
    const expected = 3404960013
    const actual = crc32(input)
    expect(actual).toEqual(expected)
  })

  it('matches the js output', () => {
    expect(crc32(input)).toEqual(crc32js(input))
  })

  describe('matching zlib output', () => {
    it('matches small input', () => {
      const input = createInput(10)

      expect(crc32(input)).toEqual(zlib(input, -1))
    })

    it('matches large input', () => {
      const input = createInput(1000000)

      expect(crc32(input)).toEqual(zlib(input, -1))
    })

    it('matches with starting crc value', () => {
      const input = createInput(10000)
      const crc = 0xfe561729

      expect(crc32(input, crc)).toEqual(zlib(input, crc))
    })
  })
})

