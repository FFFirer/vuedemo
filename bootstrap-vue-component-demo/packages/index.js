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

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window != 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    install,
    datePicker,
    b4Dropdown,
    b4DropdownOption
}