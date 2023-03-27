import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import { saveAs } from 'file-saver'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import './assets/css/icon.css'
import './components/common/directives'

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
axios.defaults.baseURL="http://core.azw.net.cn:28080/";
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('username');
    console.log("role",role);
    if (!role && to.path !== '/login') {
        next('/login');
    } else if(to.path === '/login'){
        next();
    } else{
        const token = localStorage.getItem('token');
        console.log("token",token);
        if(token === 'null' || token === '' || token === undefined) {
            next('/login');
        }
        else{
            next();
        }
    }
    // else if (to.meta.authRequired) {
    //     console.log(5);
    //     role === 'admin' ? next() : next('/403');
    // } 
    // else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
})



//添加请求拦截器
axios.interceptors.request.use(config => {
        let Authorization = localStorage.getItem('token');
        if(Authorization){
            Authorization = "Bearer" + " " + Authorization;
            // console.log("Authorization",Authorization);
            config.headers.common['Authorization'] = Authorization;
        }
        return config;
    },
    error => {
      //请求错误
      return Promise.reject(error);
    }
);
//添加响应拦截器
axios.interceptors.response.use(response => {
    console.log("response",response);
    return response;
},
error => {
    if(error.response){
    switch(error.response.status){ //token过期
        case 401:
            var url = 'admin/refresh_token';
            this.$axios.post(url).then((res) => {
                console.log("reload res",res);
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('expire',res.data.expire);
                this.$router.push('/');
            })
            .catch(error=>{
                console.log("error",error);
                localStorage.clear();
                router.replace({
                    path: '/login',
                    query: {
                    redirect: router.currentRoute.fullPath //登录成功后跳入浏览的当前页
                    }
                })
            })
        

    }
    }
}
)

new Vue({
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')