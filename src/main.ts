// style Sheets and libs
import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// other libs
import { createApp } from 'vue'
import router from './router'

// the App component
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')

import { $typst, loadFonts } from '@myriaddreamin/typst.ts'

$typst.setCompilerInitOptions({
  beforeBuild: [loadFonts([], { assets: ['text', 'cjk'], assetUrlPrefix: {
      text: 'https://cdn.jsdmirror.com/gh/typst/typst-assets@v0.13.1/files/fonts/',
      _: 'https://cdn.jsdmirror.com/gh/typst/typst-dev-assets@v0.13.1/files/fonts/',
    }})],
  getModule: () =>
    '/wasm/typst_ts_web_compiler_bg.wasm',
})
