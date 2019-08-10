const {
  crc32,
  crc32c
} = require('../../src/js/tables')

const crc32Table = require('../fixtures/crc32Table')
const crc32cTable = require('../fixtures/crc32cTable')

describe('crc32 table', () => {
  it('creates the expected tabled', () => {
    expect(crc32).toEqual(crc32Table)
  })
})

describe('crc32c table', () => {
  it('creates the expected tabled', () => {
    expect(crc32c).toEqual(crc32cTable)
  })
})

