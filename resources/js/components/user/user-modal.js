import RegisterForm from "../auth/Register.vue"
// import CommonServices from "../../common_services/common";
import {mapActions, mapState} from 'vuex';

export default {
    name: "usermodal",
    components: {
        RegisterForm
    },
    props: ['value'],
    data() {
        return {

        };
    },
    computed: {
        ...mapState({
            isEditMode: state => state.userStore.editId > 0,
        }),
    },
    // mixins: [CommonServices],
    methods: {
        /* Emit method from update user */
        registerForm(payload){
            this.$parent.$parent.$parent.getData();
            this.$emit('input');
        },

        /* Cancel */
        onCancel(){
            this.onModalClear('userStore', 'clearStore');
        }
    },
};
