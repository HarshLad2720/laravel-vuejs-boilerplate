/*//https://stackoverflow.com/questions/42662144/how-could-i-use-const-in-vue-template
//https://dev.to/nkoik/writing-a-very-simple-plugin-in-vuejs---example-8g8
import {PERMISSION_CONSTANTS} from './permission/permission-constants'*/
const YOUR_CONSTS = {
    CREATE_ACTION: 'Inserted Successfully',
    UPDATE_ACTION: 'Edited Successfully',
    DELETE_ACTION: "Deleted Successfully",

    REGISTER_SUCCESS: "Sucessfully registered. Please check your email for Verification",
    BTN_CANCEL: 'Cancel',
    BTN_OK: 'Ok',
    DELETE_TITLE: 'Delete Confirmation',
    WARNING: 'Are you sure you want to delete this record',
};

export default {
    install(Vue, options) {
        Vue.prototype.$getConst = (key) => {
            return YOUR_CONSTS[key]
        }
    }
}
