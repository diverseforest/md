import { initializeMermaid } from '@md/core/utils'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import { setupComponents } from './utils/setup-components'

import 'vue-sonner/style.css'

/* 每个页面公共css */
import '@/assets/index.css'
import '@/assets/less/theme.less'

// 引入自定义配置注入
import { injectCustomConfig } from './inject-config'

// 异步初始化 mermaid，避免初始化顺序问题
initializeMermaid().catch(console.error)

setupComponents()

// 在应用启动前注入配置
injectCustomConfig()

const app = createApp(App)

app.use(createPinia())

app.mount(`#app`)
