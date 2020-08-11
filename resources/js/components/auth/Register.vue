<template>
  <div>
    <!--begin::Content header-->
    <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
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

    <!--begin::Signup-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Sign Up</h3>
        <p class="text-muted font-weight-semi-bold">
          Enter your details to create your account
        </p>
      </div>

      <!--begin::Form-->
      <v-form class="form" @submit.prevent="onSubmit"  method="POST" role="form" enctype="multipart/form-data" novalidate autocomplete="off">
<!--          <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>-->
          <v-layout row wrap class="display-block">
              <v-flex xs12>
                  <v-text-field
                      label="Username" type="text"
                      name="name"
                      v-model="model.name"
                      :error-messages="getErrorValue('name')"
                      v-validate="'required'"
                      solo
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Email" type="text"
                      name="email"
                      v-model="model.email"
                      :error-messages="getErrorValue('email')"
                      v-validate="'required|email'"
                      solo
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Password" type="password"
                      name="password"
                      v-model="model.password"
                      :error-messages="getErrorValue('password')"
                      v-validate="'required|min:6'"
                      solo
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Mobile No" type="text"
                      name="mobile_no"
                      v-model="model.mobile_no"
                      :error-messages="getErrorValue('mobile_no')"
                      v-validate="'required'"
                      solo
                  ></v-text-field>
              </v-flex>
              <!--gender: '',
              dob:'',
              address: '',
              country_id: '',
              state_id: '',
              city_id: '',
              gallery: [],
              hobby: [],-->
              <v-flex xs12>
                  <v-file-input label="Profile" solo></v-file-input>
              </v-flex>
              <v-flex xs12>
              </v-flex>
              <v-flex xs12>
              </v-flex>
          </v-layout>

        <!--begin::Action-->
        <div class="form-group d-flex flex-wrap flex-center">
          <!--<button
            type="submit"
            ref="kt_login_signup_submit"
            class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4"
          >
            Submit
          </button>-->

            <v-btn class="btn" type="submit"
                   :loading="isSubmitting" ref="submitBtn">Submit</v-btn>
          <button
            v-on:click="$router.push('login')"
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
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script src="./register.js"></script>
