const assert = require('assert')

const {
  crc32,
  crc32c
} = require('../../src/js/crc32')

const input = Buffer.from('The quick brown fox jumps over the lazy dog ')

function testCrc32() {
  const expected = 3056077038
  const actual = crc32(input)
  assert(
    actual === expected,
    `Expected generated crc32 to equal to the expected
    actual: ${actual}
    expected: ${expected}`
  )
}

function testCrc32c() {
  const expected = 3044550804
  const actual = crc32c(input)
  assert(
    actual === expected,
    `Expected generated crc32 to equal to the expected
    actual: ${actual}
    expected: ${expected}`
  )
}

module.exports = {
  testCrc32,
  testCrc32c
}
