#include <napi.h>

Napi::Object init(Napi::Env env, Napi::Object exports) {
  return exports;
}
NODE_API_MODULE(NODE_GYP_MODULE_NAME, init);
