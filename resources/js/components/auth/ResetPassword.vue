<template>
    <div>
        <!--begin::Content header-->
        <div class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
      <span class="font-weight-bold font-size-3 text-dark-60">
        Already have an account?
      </span>
            <router-link
                class="font-weight-bold font-size-3 ml-2"
                :to="{ name: 'login' }"
            >
                Sign In!
            </router-link>
        </div>
        <!--end::Content header-->

        <!--begin::Reset Password-->
        <div class="login-form login-signin">
            <div class="text-center mb-10 mb-lg-20">
                <h3 class="font-size-h1">Reset Password</h3>
            </div>

            <!--begin::Form-->
            <v-form class="form" @submit.prevent="onSubmit"  method="POST" role="form" enctype="multipart/form-data">
                <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-text-field solo
                            :type="show_new_password ? 'text' : 'password'"
                            @click:append="show_new_password = !show_new_password"
                            :append-icon="show_new_password ? 'visibility' : 'visibility_off'"
                            label="New Password"
                            id='password'
                            class=""
                            name="password"
                            maxlength="50"
                            v-model="model.password"
                            :error-messages="getErrorValue('password')"
                            v-validate="'required|min:6'"
                            ref="password"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex lg12>
                        <v-text-field solo
                            :type="show_new_confirmation_password ? 'text' : 'password'"
                            @click:append="show_new_confirmation_password = !show_new_confirmation_password"
                            :append-icon="show_new_confirmation_password ? 'visibility' : 'visibility_off'"
                            label="Confirm New Password"
                            id='password_confirmation'
                            class="" autocomplete="off"
                            name="password_confirmation"
                            maxlength="50"
                            v-model="model.password_confirmation"
                            :error-messages="getErrorValue('password_confirmation')"
                            v-validate="'required|min:6|confirmed:password'"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <!--begin::Action-->
                <div class="form-group d-flex flex-wrap flex-center">
                    <v-btn class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4" type="submit"
                           :loading="isSubmitting" ref="submitBtn">Submit</v-btn>
                    <button
                        class="btn btn-light-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4"
                    >
                        Cancel
                    </button>
                </div>
                <!--end::Action-->
            </v-form>
            <!--end::Form-->
        </div>
        <!--end::Signup-->
        <snackbar v-model="snackbar"></snackbar>
    </div>
</template>

<style lang="scss" scoped>
    .spinner.spinner-right {
        padding-right: 3.5rem !important;
    }
</style>

<script>
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
                        sendParams.token = this.$route.params.id;
                        this.isSubmitting = true;
                        this.$store.dispatch("forgotPasswordStore/resetPassword", sendParams).then(response => {
                            if (response.error) {
                                this.isSubmitting = false;
                                this.errorMessage = response.data.error;
                            } else {
                                this.onModalCancelPref('forgotPasswordStore');
                                this.$store.commit("snackbarStore/setMsg", this.$getConst('RESET_PASSWORD'));
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

</script>
