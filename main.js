import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import ElementUI from 'element-ui';

Vue.use(uView);
import sundehengCustom from './components/sundeheng-custom/sundeheng-custom.vue'
Vue.component('sundeheng-custom',sundehengCustom)
import websocket from '@/store/websocketStore.js'
import websocket1 from '@/store/websocketStoreGroup.js'
Vue.prototype.$websocket = websocket;
Vue.prototype.$websocket1 = websocket;
Vue.config.productionTip = false
Vue.prototype.$baseUrl="http://121.196.99.253:8081/"   //线下接口  
Vue.use(ElementUI);
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';

// Vue.use(iView);
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
