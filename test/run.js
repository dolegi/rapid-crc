const fs = require('fs')
const path = require('path')

let testCount = 0

fs.readdirSync(path.join(__dirname, 'js')).forEach(file => {
  const testFile = require(`./js/${file}`)
  Object.keys(testFile).forEach(name => {
    testFile[name]()
    testCount++
  })
})

console.log(`${testCount} passed`)
