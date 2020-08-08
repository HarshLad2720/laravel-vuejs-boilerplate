<template>
  <div>
    <!--begin::Content header-->
    <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
        Don't have an account yet?
      </span>
      <router-link
        class="font-weight-bold font-size-3 ml-2"
        :to="{ name: 'register' }"
      >
        Sign Up!
      </router-link>
    </div>
    <!--end::Content header-->

    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Sign In</h3>
        <p class="text-muted font-weight-semi-bold">
          Enter your username and password
        </p>
      </div>

      <!--begin::Form-->
      <b-form class="form" @submit.stop.prevent="onSubmit">
        <!--<div role="alert" class="alert alert-info">
          <div class="alert-text">
            Use account <strong>admin@demo.com</strong> and password
            <strong>demo</strong> to continue.
          </div>
        </div>-->

        <div
          role="alert"
          v-bind:class="{ show: errorMessage.length }"
          class="alert fade alert-danger"
        >
          <div class="alert-text">
            {{ errorMessage }}
          </div>
        </div>

        <b-form-group
          id="example-input-group-1"
          label=""
          label-for="example-input-1"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            id="example-input-1"
            name="example-input-1"
            v-model="loginParam.email"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback">
            Email is required and a valid email address.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="example-input-group-2"
          label=""
          label-for="example-input-2"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            type="password"
            id="example-input-2"
            name="example-input-2"
            v-model="loginParam.password"
            aria-describedby="input-2-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-2-live-feedback">
            Password is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <!--begin::Action-->
        <div
          class="form-group d-flex flex-wrap justify-content-between align-items-center"
        >
          <a
            href="#"
            class="text-dark-60 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forgot Password ?
          </a>
          <button
            ref="kt_login_signin_submit"
            class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3"
          >
            Sign In
          </button>
        </div>
        <!--end::Action-->
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
    import BootstrapVue from "../../plugins/bootstrap-vue";
export default {
  name: "login",
  data() {
    return {
      // Remove this dummy login info
        loginParam: {
            email: '',
            password: '',
        },
        errorMessage: '',
    };
  },
  methods: {
      onSubmit() {
          var submitButton = this.$refs["kt_login_signin_submit"];
          submitButton.classList.add("spinner", "spinner-light", "spinner-right");
          this.$store.dispatch("userStore/login",
              {
                  loginParam: this.loginParam,
              }).then(response => {
                  this.errorMessage = '';
                  this.$router.push("/users");
                  this.$store.commit('userStore/setCurrentUserData', response.data.data);
          })
          .catch(err => {
            submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
            );
            this.errorMessage = err.response.data.error;
          });
      }
  },
  computed: {}
};
</script>
