<template>
    <div>
        <!--begin::Content header-->
        <!--end::Content header-->

        <!--begin::Signin-->
        <div class="login-form login-signin">
            <div class="text-center mb-10 mb-lg-20">
                <h3 class="font-size-h1">LogIn</h3>
                <p class="text-muted font-weight-semi-bold">
                    You have been logged off. Please enter your password to get Login again.
                </p>
            </div>


            <!--begin::Form-->
            <v-form class="form" @submit.prevent="onSubmit" novalidate autocomplete="off">
                <div role="alert" v-bind:class="{ show: errorMessage.length }" class="alert fade alert-danger">
                    <div class="alert-text">
                        {{ errorMessage }}
                    </div>
                </div>
                <!--                <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>-->
                <v-layout row wrap class="display-block">
                    <div class="text-center">
                        <img :src="userProfilePicture" class="img-responsive rounded-circle logoff-user">
                        <h3 class="logoff-user-name">{{userFullName}}</h3>
                        <v-text-field
                                label="Password*" type="password"
                                name="password"
                                v-model="loginDetail.password"
                                :error-messages="getErrorValue('password')"
                                v-validate="'required|min:6'"
                        ></v-text-field>
                    </div>
                </v-layout>

                <!--begin::Action-->
                <div class="form-group d-flex flex-wrap flex-center">
                    <v-btn ref="kt_login_signin_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4" type="submit">
                        Submit
                    </v-btn>
                    <!--                    <v-btn class="btn btn-primary" type="submit" :loading="isSubmitting">{{// $getConst('BTN_SUBMIT')}}</v-btn>-->
                </div>
                <!--end::Action-->
            </v-form>
            <!--end::Form-->
        </div>
        <!--end::Signin-->
        <snackbar v-model="snackbar"></snackbar>
    </div>
</template>

<style lang="scss" scoped>
    .spinner.spinner-right {
        padding-right: 3.5rem !important;
    }
</style>


<script src="./logoff.js"></script>
