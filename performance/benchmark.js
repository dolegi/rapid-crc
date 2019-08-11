const Benchmark = require('benchmark')
const { crc32, crc32c } = require('../src')

const inp = Buffer.from('The quick brown fox jumps over the lazy dog ')
console.log(crc32c(inp).toString(16))

const input = generateInput(1000)

const suite = new Benchmark.Suite
suite
.add('crc32c', () => crc32c(input))
.add('crc32', () => crc32(input))
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({ 'async': true });

function generateInput(size) {
  let input = ''
  for (let i = 0; i < size; i++) {
    input += Math.random().toString(16).substr(2)
  }
  return Buffer.from(input)
}
