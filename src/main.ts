import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(Buefy, {
  // @ts-ignore
  defaultIconPack: 'fas'
})
app.use(createPinia())
app.use(router)
app.use(VueCookies)

app.mount('#app')
