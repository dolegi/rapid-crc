const {
  crc32Table,
  crc32cTable
} = require('../../src/js/tables')

const crc32TableFixture = require('../fixtures/crc32Table')
const crc32cTableFixture = require('../fixtures/crc32cTable')

describe('crc32 table', () => {
  it('creates the expected tabled', () => {
    expect(crc32Table).toEqual(crc32TableFixture)
  })
})

describe('crc32c table', () => {
  it('creates the expected tabled', () => {
    expect(crc32cTable).toEqual(crc32cTableFixture)
  })
})

