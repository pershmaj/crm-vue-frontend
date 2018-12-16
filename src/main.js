import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'
// import CRUD from 'vue-element-crud's
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(ElementUI, {locale})
// Vue.use(CRUD)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
