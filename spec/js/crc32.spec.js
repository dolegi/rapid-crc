const {
  crc32,
  crc32c
} = require('../../src/js/crc32')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

describe('crc32', () => {
  it('creates the expected output', () => {
    const expected = 3056077038
    const actual = crc32(input)
    expect(actual).toEqual(expected)
  })
})

describe('crc32c', () => {
  it('creates the expected output', () => {
    const expected = 3044550804
    const actual = crc32c(input)
    expect(actual).toEqual(expected)
  })
})

