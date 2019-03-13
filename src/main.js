import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFuse from 'vue-fuse'
import AsyncComputed from 'vue-async-computed'
import {http} from '@/api/common'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
//
// Vue.use(Vuetify)

Vue.use(AsyncComputed)
Vue.use(VueFuse)
Vue.use(VueSession)
Vue.use(VueCookies)
Vue.use(ElementUI, {locale})
Vue.use(BootstrapVue)
// Vue.use(CRUD)
Vue.use(VueAxios, axios)
Vue.use(new VueSocketIO({
    debug: false,
    connection: http.defaults.baseURL,
    // connection: 'https://crmback.na4u.ru',
    vuex: {
        store,
        actionPrefix: 'socket_',
    }
}))

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
