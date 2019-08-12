const { crc32Table, crc32Lookup, crc32cTable } = require('../../src/js/tables')

function calc (table) {
  return function (buf, crc = 0) {
    let i = 0, c = crc ^ -1;
    while (i < buf.length-8) {
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
    }

    while (i < buf.length) {
      c = table[(c ^ buf[i++]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ -1) >>> 0;
  }
}

function calc32 (lookup) {
  return function (buf, crc = 0) {
    crc = ~crc
    let i = 0
    for (; i < buf.length-8; i += 8) {
      const one = buf.readUInt32LE(i) ^ crc
      const two = buf.readUInt32LE(i + 4)

      crc = lookup[0][two >>> 24] ^
        lookup[1][(two >>> 16) & 0xff] ^
        lookup[2][(two >>> 8) & 0xff] ^
        lookup[3][two & 0xff] ^
				lookup[4][one >>> 24] ^
        lookup[5][(one >>> 16) & 0xff] ^
        lookup[6][(one >>> 8) & 0xff] ^
        lookup[7][one & 0xff]
    }

    for (let j = i; j < buf.length; j++) {
      crc = lookup[0][(crc ^ buf[j]) & 0xff] ^ (crc >>> 8)
    }

    return ~crc >>> 0
  }
}

module.exports = {
  crc32js: calc32(crc32Lookup),
  crc32cjs: calc(crc32cTable)
}
