const {
  testCrc32Table,
  testCrc32cTable
} = require('./js/table.test')

let testCount = 0

testCrc32Table()
testCount++
testCrc32cTable()
testCount++

console.log(`${testCount} passed`)
