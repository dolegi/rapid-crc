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
					"cflags!": [ "-fno-exceptions" ],
					"cflags_cc!": [ "-fno-exceptions" ],
					'libraries': [],
					'dependencies': [
						"<!(node -p \"require('node-addon-api').gyp\")"
					],
					'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
				}
			]
		}]
	]
}
