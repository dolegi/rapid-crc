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

function generateLookup(poly, size = 8) {
  const lookup = new Array(size)
  lookup[0] = generateTable(poly)

  for (let i = 1; i < size; i++) { 
    lookup[i] = new Uint32Array(256)

    for (let j = 0; j < 256; j++) {
      lookup[i][j] = lookup[0][lookup[i - 1][j] & 0xff] ^ (lookup[i - 1][j] >>> 8)
    }
  }

  return lookup
}

module.exports = {
  crc32Table: generateTable(0xEDB88320),
  crc32cTable: generateTable(0x82F63B78),
  crc32Lookup: generateLookup(0xEDB88320),
  crc32cLookup: generateLookup(0x82F63B78)
}
