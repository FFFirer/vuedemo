import b4Dropdown from './src/b4Dropdown.vue'
import b4DropdownOption from './src/b4DropdownOption.vue'

b4Dropdown.install = function (Vue) {
    Vue.component(b4Dropdown.name, b4Dropdown)
}

b4DropdownOption.install = function (Vue) {
    Vue.component(b4DropdownOption.name, b4DropdownOption)
}

export {
    b4DropdownOption
}
export default b4Dropdown