const {
  crc32,
  crc32c
} = require('../../src/js/table')

const crc32Table = require('../fixtures/crc32Table')
const crc32cTable = require('../fixtures/crc32cTable')
const assert = require('assert')

function testCrc32Table() {
  assert(
    JSON.stringify(crc32) === JSON.stringify(crc32Table),
    'Expected generated crc32 table to equal fixture'
  )
}

function testCrc32cTable() {
  assert(
    JSON.stringify(crc32c) === JSON.stringify(crc32cTable),
    'Expected generated crc32c table to equal fixture'
  )
}

module.exports = {
  testCrc32Table,
  testCrc32cTable
}

