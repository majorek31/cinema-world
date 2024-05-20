import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';
const app = createApp(App);
const pinia = createPinia();
app.use(Buefy, {
  // @ts-ignore
  defaultIconPack: 'fas',
});
pinia.use((ctx) => {
  ctx.store.router = markRaw(router);
});
app.use(pinia)
app.use(router)
app.use(VueCookies)

app.mount('#app')
