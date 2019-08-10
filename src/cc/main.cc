#include <napi.h>
#include <zlib.h>

Napi::Number crcZlib(const Napi::CallbackInfo& info) {
  Napi::Buffer<char> buf = info[0].As<Napi::Buffer<char>>(); 
  uint32_t crc = 0;
  if (info.Length() > 1) {
    crc = info[1].As<Napi::Number>();
  }
	return Napi::Number::New(info.Env(), crc32(crc, (Bytef *)buf.Data(), buf.Length()));
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
  exports.Set("zlib", Napi::Function::New(env, crcZlib));
  return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, init);
