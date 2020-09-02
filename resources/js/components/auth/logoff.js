import CommonServices from '../../common_services/common.js';
import ErrorBlockServer from "../../partials/ErrorBlockServer";
import ErrorModal from "../../partials/ErrorModal";
import BootstrapVue from "../../plugins/bootstrap-vue";
import Snackbar from "../../partials/Snackbar.vue"
import {mapGetters, mapState} from "vuex";

export default {
    name: "Logoff",
    data() {
        return {
            errorArr: [],
            errorDialog: false,
            errorMessage: '',
            //Validation Message
            validationMessages: {
                "password": [{key: 'required', value: 'Password required'}, {
                    key: 'min',
                    value: 'Password length should be at least 6'
                }],
            },
            //login info
            loginDetail: {
                email: this.$store.state.userStore.currentUserData.email,
                password: '',
            },
            fpdialog : false,
            isSubmitting: false,
        };
    },
    components:{Snackbar, ErrorBlockServer, ErrorModal},
    mixins:[BootstrapVue, CommonServices],
    methods: {
        /**
         * Login Submit Method
         *
         */
        onSubmit() {
            // set spinner to submit button
            /* var submitButton = this.$refs["kt_login_signin_submit"];
             submitButton.classList.add("spinner", "spinner-light", "spinner-right");*/
            this.$validator.validate().then(valid => {
                if (valid) {
                    // this.isSubmitting = true;
                    this.$store.dispatch("userStore/login",
                        {
                            loginDetail: this.loginDetail
                        }).then(response => {
                        this.errorMessage = '';

                        // Set Data of Current user in store
                        this.$store.commit('userStore/setCurrentUserData', response.data.data);

                        // go to which page after successfully login
                        this.$router.push("/users");

                        // this.isSubmitting = false;
                    })
                    // If Login has Error
                        .catch(err => {
                            this.errorMessage = err.response.data.error;
                        });
                }
            });





        },
    },
    computed: {
        ...mapState({
            currentUserData: state => state.userStore.currentUserData,
            snackbar: state => state.snackbarStore.snackbar,
        }),
        ...mapGetters({
            userFullName: 'userStore/userFullName',
            userProfilePicture: 'userStore/userProfilePicture',
        }),
    },
};
