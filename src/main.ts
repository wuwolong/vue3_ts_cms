import { createApp } from 'vue'
//全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
//按需引用
// import { ElButton } from 'element-plus'
import globalRegister from './global'
import App from './App.vue'
import router from './router/router'
import store, { geLocalCache } from './store'
import 'normalize.css'
import '@/assets/css/index.less'
// wlRequest
//   .post({
//     url: '/login',
//     data: {
//       name: 'coderwhy',
//       password: '123456'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
// wlRequest
//   .request({
//     url: 'home/multidata',
//     headers: {},
//     interceptors: {
//       requestInterceptor: (config) => {
//         // console.log('单独请求的config')
//         // 非空断言一下 我也不知道为什么取不出这个config.headers
//         config.headers!['token'] = '123'
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         return res
//       }
//     }
//   })
//   .then((res) => console.log(res))
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// wlRequest
//   .get<DataType>({
//     url: '/home/multidata'
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
const app = createApp(App)
app.use(store)
geLocalCache()
app.use(router)
//按需引入element-plus
globalRegister(app)
app.mount('#app')
