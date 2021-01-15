import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.js'
import datePicker from './datePicker/index'
import b4Dropdown, {
    b4DropdownOption
} from './b4Dropdown/index'

const components = [

    datePicker,
    b4Dropdown,
    b4DropdownOption
]

// Vue2
// const install = function (Vue) {
//     components.forEach(component => {
//         Vue.component(component.name, component);
//     });
// }

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

// Vue2
// if (typeof window != 'undefined' && window.Vue) {
//     console.log('install component');
//     install(window.Vue);
// }

// Vue3
if (typeof window != 'undefined' && window.Vue) {
    window.b4Components = {
        install,
        datePicker,
        b4Dropdown,
        b4DropdownOption
    }
}



export {
    install,
    datePicker,
    b4Dropdown,
    b4DropdownOption
}