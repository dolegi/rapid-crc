const { crc32c } = require('../../src')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

describe('crc32c', () => {
  it('creates the expected output', () => {
    const expected = 3044550804
    const actual = crc32c(input)
    expect(actual).toEqual(expected)
  })
})

