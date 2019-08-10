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
      const input = createInput(100000)
      const crc = 0xfe561729

      expect(crc32(input, crc)).toEqual(zlib(input, crc))
    })
  })
})

