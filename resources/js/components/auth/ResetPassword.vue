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

<script src="./reset-password.js"></script>
