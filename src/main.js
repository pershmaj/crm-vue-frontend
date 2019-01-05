import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueSession from 'vue-session'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFuse from 'vue-fuse'
import AsyncComputed from 'vue-async-computed'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
//
// Vue.use(Vuetify)
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://crmback.na4u.ru',
    vuex: {
        store,
        actionPrefix: 'socket_',
    }
}))
Vue.use(AsyncComputed)
Vue.use(VueFuse)
Vue.use(VueSession)
Vue.use(ElementUI, {locale})
// Vue.use(CRUD)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
