const Benchmark = require('benchmark')

const { crc32c } = require('../src')
const sheetjs = require('crc-32') 
const turbo = require('turbo-crc32/crc32c')
const sse4_crc32 = require('sse4_crc32')

const input = generateInput(100)

const suite = new Benchmark.Suite
suite
.add('rapid-crc', () => crc32c(input))
.add('turbo', () => turbo(input))
.add('sse4_crc32', () => sse4_crc32.calculate(input))
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
