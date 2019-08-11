{
	"conditions":[
		['target_arch in "ia32 x32 x64 x86 x86_64"', {
			"targets":  [
				{
					"target_name":    "rapid_crc",
					"sources":        [
						"src/cc/main.cc"
					],
					'include_dirs': [
						"<!@(node -p \"require('node-addon-api').include\")"
					],
					"xcode_settings": {
						"GCC_ENABLE_SSE42_EXTENSIONS": "YES"
					},
					'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
				}
			]
		}]
	]
}
