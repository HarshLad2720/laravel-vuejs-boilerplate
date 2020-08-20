<template>
  <div>
    <!--begin::Content header-->
    <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10" v-if="!isEditMode"
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
      <div class="text-center mb-10 mb-lg-20" v-if="!isEditMode">
        <h3 class="font-size-h1">Sign Up</h3>
        <p class="text-muted font-weight-semi-bold">
          Enter your details to create your account
        </p>
      </div>

      <!--begin::Form-->
      <v-form class="form" @submit.prevent="onSubmit"  method="POST" role="form" enctype="multipart/form-data" autocomplete="off">
          <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
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
                      v-validate="'required|email'" autocomplete="email"
                      solo
                      :readonly="isEditMode?'readonly':''"
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Password" type="password"
                      name="password"
                      v-model="model.password"
                      :error-messages="getErrorValue('password')"
                      v-validate="isEditMode ? '' :'required|min:6'" autocomplete="new-password"
                      solo v-if="!isEditMode"
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Mobile No" type="text"
                      name="mobile_no"
                      v-model="model.mobile_no"
                      :error-messages="getErrorValue('mobile_no')"
                      v-validate="'required|min:10|max:10'"
                      solo
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-file-input label="Profile" name="profile" v-model="model.profile" solo :error-messages="getErrorValue('profile')"
                                v-validate="isEditMode ? '' :'required'"></v-file-input>
              </v-flex>
              <v-flex xs12>
                  <v-radio-group row v-model="model.gender"
                                 name="gender"
                                 :error-messages="getErrorValue('gender')"
                                 v-validate="'required'">
                      <v-radio label="Male" value="1"></v-radio>
                      <v-radio label="Female" value="0"></v-radio>
                  </v-radio-group>
              </v-flex>
              <v-flex xs12>
                  <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      class="display-inline-blc"
                  >
                      <template v-slot:activator="{ on }">
                          <v-text-field
                              label="DOB"
                              readonly
                              v-on="on"
                              single-line
                              solo
                              v-model="computedDateFormatted"
                              :error-messages="getErrorValue('dob')"
                              v-validate="'required'" name="dob"
                          ></v-text-field>
                      </template>
                      <v-date-picker v-model="model.dob" :min="todayDate"
                                     @input="menu = false"></v-date-picker>
                  </v-menu>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Address" type="text"
                      name="address"
                      v-model="model.address"
                      :error-messages="getErrorValue('address')"
                      v-validate="'required'"
                      solo
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-select
                      name="country_id"
                      v-model="model.country_id"
                      :items="countryList"
                      label="Country"
                      item-text="name"
                      item-value="id"
                      :error-messages="getErrorValue('country_id')"
                      v-validate="'required'"
                      solo
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                  <v-select
                      name="state_id"
                      v-model="model.state_id"
                      :items="stateList"
                      label="State"
                      item-text="name"
                      item-value="id"
                      :error-messages="getErrorValue('state_id')"
                      v-validate="'required'"
                      solo
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                  <v-select
                      name="city_id"
                      v-model="model.city_id"
                      :items="cityList"
                      label="City"
                      item-text="name"
                      item-value="id"
                      :error-messages="getErrorValue('city_id')"
                      v-validate="'required'"
                      solo
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                  <v-file-input multiple name="gallery" label="Gallery" v-model="model.gallery" solo :error-messages="getErrorValue('gallery')"
                                v-validate="isEditMode ? '' :'required'"></v-file-input>
              </v-flex>
              <v-flex xs12>
                  <v-row justify="space-around">
                      <template v-for="(hList,index) in hobbyList">
                      <v-checkbox :id="'hobby'+hList.id"
                                  :label="hList.name"
                                  :name="'hobby'+hList.id"
                                  :value="hList.id"
                                  v-model="model.hobby"
                                  v-validate="isEditMode ? '' :'required'" :error="getErrorCount('hobby1' +hList.id)"></v-checkbox>
                      </template>
                  </v-row>
              </v-flex>
          </v-layout>

        <!--begin::Action-->
        <div class="form-group d-flex flex-wrap flex-center">
            <v-btn class="btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3 mx-4" type="submit"
                   :loading="isSubmitting" ref="submitBtn">Submit</v-btn>
          <button v-if="isEditMode"
            v-on:click="onCancel()"
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

<script src="./register.js"></script>
