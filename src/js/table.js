function generateTable(poly) {
  const crc_table = new Int32Array(256)

  for (let n = 0; n < 256; n += 2) {
    let c = n >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    crc_table[n] = c & 1 ? poly ^ (c >>> 1) : c >>> 1
  }

  for (let n = 1; n < 256; n += 2) {
    let c = poly ^ (n >>> 1)
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    c = c & 1 ? poly ^ (c >>> 1) : c >>> 1
    crc_table[n] = c & 1 ? poly ^ (c >>> 1) : c >>> 1
  }
  return crc_table
}

module.exports = {
  crc32: generateTable(0xEDB88320),
  crc32c: generateTable(0x82F63B78)
}
