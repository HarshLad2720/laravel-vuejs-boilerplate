import CommonServices from '../../common_services/common.js';
import ErrorBlockServer from "../../partials/ErrorBlockServer";
import ErrorModal from "../../partials/ErrorModal";
import Snackbar from "../../partials/Snackbar.vue"
import {mapActions, mapState} from 'vuex';

export default {
    name: "resetpassword",
    components: {
        ErrorModal,
        ErrorBlockServer,
        Snackbar
    },
    data() {
        return {
            errorArr: [],
            errorDialog: false,
            errorMessage: '',
            show_new_password: false,
            show_new_confirmation_password: false,
            validationMessages: {
                "password": [{key: 'required', value: 'New password required'},{key: 'min', value: 'Password length should be at least 6'}, ],
                "password_confirmation": [{key: 'required', value: 'New password confirmation required'}, {key: 'min', value: 'Password length should be at least 6'},{key: 'confirmed', value: 'New password confirmation does not match'},],
            },
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState({
            model: state => state.forgotPasswordStore.model,
            snackbar: state => state.snackbarStore.snackbar,
        }),
    },
    mixins: [CommonServices],
    methods: {
        /**
         * Submit of Reset Password
         */
        onSubmit() {
            this.$validator.validate().then(valid => {
                if (valid) {
                    let sendParams = JSON.parse(JSON.stringify(this.model));
                    //token
                    // debugger;
                    sendParams.token = this.$route.params.id;
                    this.isSubmitting = true;
                    this.$store.dispatch("forgotPasswordStore/resetPassword", sendParams).then(response => {
                        if (response.error) {
                            this.isSubmitting = false;
                            this.errorMessage = response.data.error;
                        } else {
                            this.$store.commit("snackbarStore/setMsg", this.$getConst('RESET_PASSWORD'));
                            this.onModalCancelPref('forgotPasswordStore');
                            setTimeout(() => {
                                this.$router.push({path: '/'});
                            }, 1000)
                        }
                    }, error => {
                        this.isSubmitting = false;
                        this.errorMessage = this.getAPIErrorMessage(error.response);
                    });
                }
            });
        },
    },
};
