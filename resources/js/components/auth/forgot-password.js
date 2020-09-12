import {mapGetters, mapState} from 'vuex';
import CommonServices from "../../common_services/common";
import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
export default {
    name: "ForgotPassword",
    components: {
        ErrorBlockServer,
    },
    props: ['value'],
    computed: { },
    mixins: [CommonServices],
    data: function () {
        return {
            email: '',
            errorMessage: '',
            validationMessages: {
                "email": [{key: 'email', value: 'Please enter valid email'}, {key: 'required', value: 'Please enter email'}],
            },
            isSubmitting: false,
        }
    },
    methods: {
        /**
         * Cancel Method
         */
        onCancel(){
            this.onModalClear('forgotPasswordStore','clearStore');
        },

        /**
         * Submit of Forgot Password Modal
         */
        onSubmit() {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.$emit('forget-password-email', this.email);
                    this.onCancel();
                }
            });
        }
    }
}
