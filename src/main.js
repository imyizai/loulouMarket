import Vue from 'vue'
import md5 from 'js-md5'
import App from './App.vue'
import router from './router'
import { Button,Form,Field,Toast,AddressList,Icon,Grid, GridItem ,AddressEdit,Swipe,SwipeItem, SwipeCell} from 'vant'
import 'lib-flexible/flexible'

Vue.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(GridItem).use(Grid)
.use(AddressEdit).use(AddressList).use(Swipe).use(SwipeItem).use(SwipeCell)
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
