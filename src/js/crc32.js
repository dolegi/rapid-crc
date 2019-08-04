const tables = require('../../src/js/tables')

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

module.exports = {
  crc32: calc(tables.crc32),
  crc32c: calc(tables.crc32c)
}
