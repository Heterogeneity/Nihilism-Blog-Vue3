import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {pinia} from "@/stores";
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import './assets/base.css'
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {websiteTitle} from "@/api/website.ts";

websiteTitle().then((res: any) => {
    if (res.title !== '') {
        document.title = res.title
    }
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(pinia).use(router).mount('#app')
