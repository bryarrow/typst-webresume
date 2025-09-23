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

import {$typst} from '@myriaddreamin/typst.ts'

$typst.setCompilerInitOptions({
  beforeBuild: [],
  getModule: () =>
    'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
})
