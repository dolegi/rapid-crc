[![Build Status](https://travis-ci.org/dolegi/rapid-crc.svg?branch=master)](https://travis-ci.org/dolegi/rapid-crc)
# Rapid CRC
Aims to be the fastest crc32 and crc32c implemenations on npm

### Install
```bash
npm install rapid-crc
```

### Usage
```javascript
const rapidCrc = require('rapid-crc')

const crc1 = rapidCrc.crc32(Buffer.from('123'))
// -> 2297840959
const crc2 = rapidCrc.crc32c(Buffer.from('123'))
// -> 2413851447
```

### Details

### crc32 
Uses slice-by-32 (based on slice-by-8 by intel and slice-by-16 by stehpan brumme). Increasing the size of the lookup to 32 gave the best performance on my machine (2015 macbook pro, i5, 8GB), by 64 > was slower. I think this is due to the amount of data being loaded per cache-line.

#### crc32c (Castagnoli)
Uses [SSE4.2](https://en.wikipedia.org/wiki/SSE4#SSE4.2) if supported or falls back to slice-by-32.

### References
- https://github.com/madler/zlib/blob/master/crc32.c
- https://create.stephan-brumme.com/crc32/
- https://www.npmjs.com/package/sse4_crc32

