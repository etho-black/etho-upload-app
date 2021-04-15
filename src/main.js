import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue';
import VueProgressBar from 'vue-progressbar';

// css and scss files include
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/font-awesome.min.css';
import './assets/index.scss';

Vue.config.productionTip = false
const options = {
  color: '#7DEADF',
  failedColor: '#7DEADF',
  thickness: '4px',
  transition: {
    speed: '0.5s',
    opacity: '0.10s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
};
Vue.use(VueProgressBar, options);
Vue.use(BootstrapVue);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

