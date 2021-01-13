import {
    createApp
} from 'vue'
import App from './App.vue'
import {
    datePicker
} from '../packages/index'

var app = createApp(App).use(datePicker)
app.config.productionTip = false
app.mount('#app')