// style Sheets and libs
import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// other libs
import { createApp } from 'vue'
import router from './router'
import setTypst from '@/utils/typst-compiler/set-init-options'

// the App component
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')

setTypst()
