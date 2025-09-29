import { $typst, loadFonts } from '@myriaddreamin/typst.ts'
import pako from 'pako'

export default function () {
  $typst.setCompilerInitOptions({
    beforeBuild: [
      loadFonts([], {
        assets: ['text', 'cjk'],
        assetUrlPrefix: {
          text: 'https://cdn.jsdmirror.com/gh/typst/typst-assets@v0.13.1/files/fonts/',
          _: 'https://cdn.jsdmirror.com/gh/typst/typst-dev-assets@v0.13.1/files/fonts/',
        },
      }),
    ],
    getModule: async () => {
      const buffer = await (
        await fetch(
          'https://cdn.jsdmirror.com/gh/bryarrow/typst-webresume@main/public/wasm/typst_ts_web_compiler_bg.wasm.gz',
        )
      ).arrayBuffer()
      return pako.inflate(new Uint8Array(buffer)).buffer
    },
  })
}
