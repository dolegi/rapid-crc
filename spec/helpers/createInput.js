module.exports = function (size = 100) {
  let input = ''
  for (let i = 0; i < size; i++) {
    input += Math.random().toString(16).substr(2)
  }
  return Buffer.from(input)
}
