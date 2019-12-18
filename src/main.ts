import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import { startMirage } from './services/mirage'

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line: no-console
  console.log('staring with mirage mock server..');
  startMirage();
}

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
