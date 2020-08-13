//https://stackoverflow.com/questions/42662144/how-could-i-use-const-in-vue-template
//https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
import {PERMISSION_CONSTANTS} from './permission/permission-constants'
const YOUR_CONSTS = {
    CREATE_ACTION: 1,
    UPDATE_ACTION: 2,
    DELETE_ACTION: 3,

    REGISTER_SUCCESS: "Sucessfully registered. Please check your email for Verification",
    ...PERMISSION_CONSTANTS,
};

export default {
    install(Vue, options) {
        Vue.prototype.$getConst = (key) => {
            return YOUR_CONSTS[key]
        }
    }
}
