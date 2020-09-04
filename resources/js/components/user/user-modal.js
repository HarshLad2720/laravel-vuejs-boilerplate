import RegisterForm from "../auth/Register.vue"
import CommonServices from "../../common_services/common";
import {mapActions, mapState} from 'vuex';

export default {
    name: "UserModal",
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
    mixins: [CommonServices],
    methods: {
        /* Emit method from update user */
        registerForm(payload){
            this.$parent.getData();
            this.onCancel();
        },

        /* Cancel */
        onCancel(){
            // this.$parent.onModalClear('userStore', 'clearStore');
            this.$store.commit('userStore/clearStore');
            this.errorMessage = '';
            this.isSubmitting = false;
            this.$validator.reset();
            this.$emit('input'); //Close Pop-up
        }
    },
};
