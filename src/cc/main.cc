#include <napi.h>
#include <zlib.h>
#include <x86intrin.h>

Napi::Number crcZlib(const Napi::CallbackInfo& info) {
	Napi::Buffer<char> buf = info[0].As<Napi::Buffer<char>>(); 
	uint32_t crc = 0;
	if (info.Length() > 1) {
		crc = info[1].As<Napi::Number>();
	}
	return Napi::Number::New(info.Env(), crc32(crc, (Bytef *)buf.Data(), buf.Length()));
}

Napi::Number crc32c(const Napi::CallbackInfo& info) {
	Napi::Buffer<unsigned char> buf = info[0].As<Napi::Buffer<unsigned char>>();
	uint32_t crc = -1;
	if (info.Length() > 1) {
		crc = ~(uint32_t) info[1].As<Napi::Number>();
	}
	unsigned char* data = buf.Data();
	size_t length = buf.Length();

	uint64_t* data64 = (uint64_t *) data;
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

Napi::Object init(Napi::Env env, Napi::Object exports) {
	exports.Set("crc32c", Napi::Function::New(env, crc32c));
	exports.Set("zlib", Napi::Function::New(env, crcZlib));
	return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, init);
