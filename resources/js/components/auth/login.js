import CommonServices from '../../common_services/common.js';
import ErrorBlockServer from "../../partials/ErrorBlockServer";
import ErrorModal from "../../partials/ErrorModal";
import BootstrapVue from "../../plugins/bootstrap-vue";
import ForgotPasswordModal from "./ForgotPasswordModal.vue";
import Snackbar from "../../partials/Snackbar.vue"
import {mapState} from "vuex";

export default {
    name: "login",
    data() {
        return {
            errorArr: [],
            errorDialog: false,
            errorMessage: '',
            //Validation Message
            validationMessages: {
                "email": [{key: 'required', value: 'Email required'}, {
                    key: 'email',
                    value: 'Please enter valid email'
                }],
                "password": [{key: 'required', value: 'Password required'}, {
                    key: 'min',
                    value: 'Password length should be at least 6'
                }],
            },
            //login info
            loginDetail: {
                email: '',
                password: '',
            },
            fpdialog : false
        };
    },
    components:{ForgotPasswordModal, Snackbar, ErrorBlockServer, ErrorModal},
    mixins:[BootstrapVue, CommonServices],
    methods: {
        /**
         * Login Submit Method
         */
        onSubmit() {
            // set spinner to submit button
           /* var submitButton = this.$refs["kt_login_signin_submit"];
            submitButton.classList.add("spinner", "spinner-light", "spinner-right");*/
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.$store.dispatch("userStore/login",
                        {
                            loginDetail: this.loginDetail
                        }).then(response => {
                        this.errorMessage = '';
                        // Set Data of Current user in store
                        this.$store.commit('userStore/setCurrentUserData', response.data.data);
                        // go to which page after successfully login
                        this.$router.push("/users");
                    })
                    // If Login has Error
                        .catch(err => {
                            // Remove spinner to submit button
                            /*submitButton.classList.remove(
                                "spinner",
                                "spinner-light",
                                "spinner-right"
                            );*/
                            this.errorMessage = err.response.data.error;
                        });
                }
            });





        },

        /**
         * Forgot Password Emit Method
         */
        forgotPassword(payload){
            this.$store.dispatch("forgotPasswordStore/sendForgotPasswordEmail",
                {
                    email: payload,
                }).then(response => {
                if (response.error) {
                    this.errorMessage = response.data.error;
                } else {
                    // this.$store.commit("snackbarStore/setMsg", response.success);
                    this.$store.commit("snackbarStore/setMsg", this.$getConst('EMAIL_SEND_MESSAGE'));
                }
            }, error => {
                this.errorMessage = this.getAPIErrorMessage(error.response);
            });
        }
    },
    computed: {
        ...mapState({
            snackbar: state => state.snackbarStore.snackbar,
        }),
    },
};
