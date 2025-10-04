import pako from 'pako'
import { loadFonts } from '@myriaddreamin/typst.ts'
import { typst } from '@/utils/typst-compiler/typst.ts'
import { sourceHanSansSC, sourceHanSerifSC, kpSans, kpSerif } from '@/utils/typst-compiler/fonts.ts'

let isSet = false

export default function setTypst() {
  if (!isSet) {
    const fonts = sourceHanSansSC.concat(sourceHanSerifSC).concat(kpSans).concat(kpSerif)
    typst.setCompilerInitOptions({
      beforeBuild: [
        loadFonts(fonts, {
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
    isSet = true
  }
}
