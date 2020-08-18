<template>
    <v-dialog :value="value" @input="onCancel" @keydown.esc="onCancel" @click:outside="onCancel" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                Change Password
            </v-card-title>

            <v-card-text>
                <form method="POST" name="changePassword" role="form" @submit.prevent="onSubmit">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap>
                        <v-flex lg10>
                            <v-text-field solo
                                :type="show_old_password ? 'text' : 'password'"
                                @click:append="show_old_password = !show_old_password"
                                :append-icon="show_old_password ? 'visibility' : 'visibility_off'"
                                label="Current Password"
                                id='old_password'
                                class=""
                                name="old_password"
                                maxlength="50"
                                v-model="model.old_password"
                                :error-messages="getErrorValue('old_password')"
                                v-validate="'required'"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg10>
                            <v-text-field solo
                                :type="show_new_password ? 'text' : 'password'"
                                @click:append="show_new_password = !show_new_password"
                                :append-icon="show_new_password ? 'visibility' : 'visibility_off'"
                                label="New Password"
                                id='new_password'
                                class=""
                                name="new_password"
                                maxlength="50"
                                v-model="model.new_password"
                                :error-messages="getErrorValue('new_password')"
                                v-validate="'required|min:6'"
                                ref="password"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex lg10>
                            <v-text-field solo
                                :type="show_new_confirmation_password ? 'text' : 'password'"
                                @click:append="show_new_confirmation_password = !show_new_confirmation_password"
                                :append-icon="show_new_confirmation_password ? 'visibility' : 'visibility_off'"
                                label="Confirm New Password"
                                id='confirm_password'
                                class="" autocomplete="off"
                                name="confirm_password"
                                maxlength="50"
                                v-model="model.confirm_password"
                                :error-messages="getErrorValue('confirm_password')"
                                v-validate="'required|min:6|confirmed:password'"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn class="btn btn-theme m-b-10 m-t-10" type="submit" :loading="isSubmitting">Submit</v-btn>
                            <v-btn color="secondary" class="btn btn-grey m-b-10 m-t-10" @click="onCancel">Cancel</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import CommonServices from "../../common_services/common";
    import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
    export default {
        name: "ChangePassword",
        props: ['value'],
        components: {
            ErrorBlockServer
        },
        data() {
            return {
                errorMessage: '',
                isSubmitting: false,
                show_old_password: false,
                show_new_password: false,
                show_new_confirmation_password: false,
                validationMessages: {
                    "old_password": [{key: 'required', value: 'Current password required'}],
                    "new_password": [{key: 'required', value: 'New password required'},{key: 'min', value: 'Password length should be at least 6'}, ],
                    "confirm_password": [{key: 'required', value: 'New password confirmation required'}, {key: 'min', value: 'Password length should be at least 6'},{key: 'confirmed', value: 'New password confirmation does not match'},],
                },
            }
        },
        mixins: [CommonServices],
        computed: {
            ...mapState({
                model: state => state.changePasswordStore.model,
            }),
        },
        methods: {
            /**
             * Submit of Change Password Modal
             */
            onSubmit() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.isSubmitting = true;
                        this.$store.dispatch("changePasswordStore/changePassword", this.model).then(response => {
                            if (response.error) {
                                this.isSubmitting = false;
                                this.errorMessage = response.data.error;
                            } else {
                                this.$store.commit("snackbarStore/setMsg", this.$getConst('CHANGED_PASSWORD'));
                                this.onCancel();
                            }
                        }, error => {
                            this.isSubmitting = false;
                            this.errorMessage = this.getAPIErrorMessage(error.response);
                        });
                    }
                });
            },
            /**
             * Cancel Method
             */
            onCancel() {
                this.show_old_password= false;
                this.show_new_password= false;
                this.show_new_confirmation_password= false;
                this.onModalCancelPref('changePasswordStore');
                this.$emit('input');
            }
        }
    }
</script>

<style scoped>

</style>
