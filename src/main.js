import Vue from 'vue'
import App from './App'
// import './assets/css/theme.scss'
import { getProsime, postProsime, patchProsime, putProsime, deleteProsime } from '@/api/base'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$_get = getProsime
Vue.prototype.$_post = postProsime
Vue.prototype.$_patch = patchProsime
Vue.prototype.$_put = putProsime
Vue.prototype.$_delete = deleteProsime
