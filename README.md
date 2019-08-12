[![Build Status](https://travis-ci.org/dolegi/rapid-crc.svg?branch=master)](https://travis-ci.org/dolegi/rapid-crc)
# Rapid CRC
The fastest crc32 and crc32c implemenations on npm

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

### Performance
#### crc32
```bash
$ node --version
v10.16.1
$ node performance/benchmark-crc32.js
rapid-crc x 1,593,095 ops/sec ±0.86% (89 runs sampled)
turbo x 608,301 ops/sec ±2.11% (86 runs sampled)
sheetjs x 283,236 ops/sec ±0.92% (90 runs sampled)
Fastest is rapid-crc
```

#### crc32c
```bash
$ node --version
v10.16.1
$ node performance/benchmark-crc32c.js
rapid-crc x 2,677,754 ops/sec ±0.53% (89 runs sampled)
turbo x 617,280 ops/sec ±0.45% (86 runs sampled)
sse4_crc32 x 2,353,431 ops/sec ±0.57% (90 runs sampled)
Fastest is rapid-crc
```

### References
- https://github.com/madler/zlib/blob/master/crc32.c
- https://create.stephan-brumme.com/crc32/
- https://www.npmjs.com/package/sse4_crc32

