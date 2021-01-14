import {
    createApp
} from 'vue'
import App from './App.vue'
import {
    datePicker,
    b4Dropdown,
    b4DropdownOption
} from '../packages/index'
import router from './store/router'

var app = createApp(App)

app.use(datePicker)
app.use(b4Dropdown)
app.use(b4DropdownOption)
app.use(router)
app.config.productionTip = false
app.mount('#app')