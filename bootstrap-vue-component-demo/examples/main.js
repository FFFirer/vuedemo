import {
    createApp
} from 'vue'
import App from './App.vue'
import {
    datePicker
} from '../packages/index'

createApp(App).use(datePicker).mount('#app')