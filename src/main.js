import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/icon/iconfont.css'

import axios from 'axios'

import TreeTable from 'vue-table-with-tree-grid'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import echarts from 'echarts'


//配置请求的根路径
axios.defaults.baseURL = 'http://vueshop.pixiv.download/api/private/v1/'

// axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'

axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
        //在最后必须 return config
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.use(VueQuillEditor)

// Vue.use(echarts)

Vue.filter('dataFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
        //加空字符变为字符串，padStart 格式为俩位数，不够补零
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')