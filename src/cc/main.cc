#include <napi.h>
#include <zlib.h>
#include <x86intrin.h>

uint32_t lookup32[32][256];

void createLookup(uint32_t polynomial, uint32_t lookup[32][256]) {
  for (uint16_t i = 0; i <= 0xff; i++) {
    uint32_t crc = i;
    for (uint16_t j = 0; j < 8; j++)
      crc = (crc >> 1) ^ ((crc & 1) * polynomial);
    lookup[0][i] = crc;
  }

  for (uint16_t i = 0; i <= 0xff; i++) {
      lookup[1][i] = (lookup[0][i] >> 8) ^ lookup[0][lookup[0][i] & 0xff];
    lookup[2][i] = (lookup[1][i] >> 8) ^ lookup[0][lookup[1][i] & 0xff];
    lookup[3][i] = (lookup[2][i] >> 8) ^ lookup[0][lookup[2][i] & 0xff];
    lookup[4][i] = (lookup[3][i] >> 8) ^ lookup[0][lookup[3][i] & 0xff];
    lookup[5][i] = (lookup[4][i] >> 8) ^ lookup[0][lookup[4][i] & 0xff];
    lookup[6][i] = (lookup[5][i] >> 8) ^ lookup[0][lookup[5][i] & 0xff];
    lookup[7][i] = (lookup[6][i] >> 8) ^ lookup[0][lookup[6][i] & 0xff];
    lookup[8][i] = (lookup[7][i] >> 8) ^ lookup[0][lookup[7][i] & 0xff];
    lookup[9][i] = (lookup[8][i] >> 8) ^ lookup[0][lookup[8][i] & 0xff];
    lookup[10][i] = (lookup[9][i] >> 8) ^ lookup[0][lookup[9][i] & 0xff];
    lookup[11][i] = (lookup[10][i] >> 8) ^ lookup[0][lookup[10][i] & 0xff];
    lookup[12][i] = (lookup[11][i] >> 8) ^ lookup[0][lookup[11][i] & 0xff];
    lookup[13][i] = (lookup[12][i] >> 8) ^ lookup[0][lookup[12][i] & 0xff];
    lookup[14][i] = (lookup[13][i] >> 8) ^ lookup[0][lookup[13][i] & 0xff];
    lookup[15][i] = (lookup[14][i] >> 8) ^ lookup[0][lookup[14][i] & 0xff];
    lookup[16][i] = (lookup[15][i] >> 8) ^ lookup[0][lookup[15][i] & 0xff];
    lookup[17][i] = (lookup[16][i] >> 8) ^ lookup[0][lookup[16][i] & 0xff];
    lookup[18][i] = (lookup[17][i] >> 8) ^ lookup[0][lookup[17][i] & 0xff];
    lookup[19][i] = (lookup[18][i] >> 8) ^ lookup[0][lookup[18][i] & 0xff];
    lookup[20][i] = (lookup[19][i] >> 8) ^ lookup[0][lookup[19][i] & 0xff];
    lookup[21][i] = (lookup[20][i] >> 8) ^ lookup[0][lookup[20][i] & 0xff];
    lookup[22][i] = (lookup[21][i] >> 8) ^ lookup[0][lookup[21][i] & 0xff];
    lookup[23][i] = (lookup[22][i] >> 8) ^ lookup[0][lookup[22][i] & 0xff];
    lookup[24][i] = (lookup[23][i] >> 8) ^ lookup[0][lookup[23][i] & 0xff];
    lookup[25][i] = (lookup[24][i] >> 8) ^ lookup[0][lookup[24][i] & 0xff];
    lookup[26][i] = (lookup[25][i] >> 8) ^ lookup[0][lookup[25][i] & 0xff];
    lookup[27][i] = (lookup[26][i] >> 8) ^ lookup[0][lookup[26][i] & 0xff];
    lookup[28][i] = (lookup[27][i] >> 8) ^ lookup[0][lookup[27][i] & 0xff];
    lookup[29][i] = (lookup[28][i] >> 8) ^ lookup[0][lookup[28][i] & 0xff];
    lookup[30][i] = (lookup[29][i] >> 8) ^ lookup[0][lookup[29][i] & 0xff];
    lookup[31][i] = (lookup[30][i] >> 8) ^ lookup[0][lookup[30][i] & 0xff];
  }
}

Napi::Number crcZlib(const Napi::CallbackInfo& info) {
	Napi::Buffer<char> buf = info[0].As<Napi::Buffer<char>>(); 
	uint32_t crc = info[1].As<Napi::Number>();
	return Napi::Number::New(info.Env(), crc32(crc, (Bytef *)buf.Data(), buf.Length()));
}

Napi::Number crc32c(const Napi::CallbackInfo& info) {
	Napi::Buffer<unsigned char> buf = info[0].As<Napi::Buffer<unsigned char>>();
	uint32_t crc = ~(uint32_t) info[1].As<Napi::Number>();
	size_t length = buf.Length();

	uint64_t* data64 = (uint64_t *) buf.Data();
	while (length >= 8) {
		crc = _mm_crc32_u64(crc, *data64++);
		length -= 8;
	}
	uint32_t* data32 = (uint32_t *) data64;
	while (length >= 4) {
		crc = _mm_crc32_u32(crc, *data32++);
		length -= 4;
	}
	uint16_t* data16 = (uint16_t *) data32;
	while (length >= 2) {
		crc = _mm_crc32_u16(crc, *data16++);
		length -= 2;
	}
	uint8_t* data8 = (uint8_t *) data16;
	while (length--) {
		crc = _mm_crc32_u8(crc, *data8++);
	}

	return Napi::Number::New(info.Env(), ~crc);
}

Napi::Number crc32By32(const Napi::CallbackInfo& info) {
  Napi::Buffer<unsigned char> buf = info[0].As<Napi::Buffer<unsigned char>>();
	uint32_t crc = ~(uint32_t) info[1].As<Napi::Number>();

  size_t length = buf.Length();
  const uint32_t* current = (uint32_t*) buf.Data();
  while (length >= 32) {
    uint32_t one = *current++ ^ crc;
    uint32_t two = *current++;
    uint32_t three = *current++;
    uint32_t four = *current++;
    uint32_t five = *current++;
    uint32_t six = *current++;
    uint32_t seven = *current++;
    uint32_t eight = *current++;

    crc = lookup32[0][eight >> 24] ^
      lookup32[1][(eight >> 16) & 0xff] ^
      lookup32[2][(eight >>  8) & 0xff] ^
      lookup32[3][eight & 0xff] ^
      lookup32[4][seven >> 24] ^
      lookup32[5][(seven >> 16) & 0xff] ^
      lookup32[6][(seven >>  8) & 0xff] ^
      lookup32[7][seven & 0xff] ^
      lookup32[8][six >> 24] ^
      lookup32[9][(six >> 16) & 0xff] ^
      lookup32[10][(six >>  8) & 0xff] ^
      lookup32[11][six & 0xff] ^
      lookup32[12][five >> 24] ^
      lookup32[13][(five >> 16) & 0xff] ^
      lookup32[14][(five >>  8) & 0xff] ^
      lookup32[15][five & 0xff] ^
      lookup32[16][four >> 24] ^
      lookup32[17][(four >> 16) & 0xff] ^
      lookup32[18][(four >>  8) & 0xff] ^
      lookup32[19][four & 0xff] ^
      lookup32[20][three >> 24] ^
      lookup32[21][(three >> 16) & 0xff] ^
      lookup32[22][(three >>  8) & 0xff] ^
      lookup32[23][three & 0xff] ^
      lookup32[24][two >> 24] ^
      lookup32[25][(two >> 16) & 0xff] ^
      lookup32[26][(two >>  8) & 0xff] ^
      lookup32[27][two & 0xff] ^
      lookup32[28][one >> 24] ^
      lookup32[29][(one >> 16) & 0xff] ^
      lookup32[30][(one >>  8) & 0xff] ^
      lookup32[31][one & 0xff];
    length -= 32;
  }
  unsigned char* currentChar = (unsigned char*) current;
  while (length--)
    crc = lookup32[0][(crc & 0xff) ^ *currentChar++] ^ (crc >> 8);

	return Napi::Number::New(info.Env(), ~crc);
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
  createLookup(0xEDB88320, lookup32);
	exports.Set("crc32c", Napi::Function::New(env, crc32c));
	exports.Set("crc32", Napi::Function::New(env, crc32By32));
	exports.Set("zlib", Napi::Function::New(env, crcZlib));
	return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, init);
