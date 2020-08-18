<template>
    <v-dialog :value="value" content-class="modal-dialog" @click:outside="onCancel()" @keydown.esc="onCancel">

        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                Forgot Password
            </v-card-title>

            <v-card-text>
                <form method="POST" name="forgotPassword" role="form" @submit.prevent="onSubmit">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                label="Enter Your Registered Email ID" v-model="email"
                                :error-messages="getErrorValue('email')"
                                name="email"
                                type="email"
                                maxlength="50"
                                solo
                                v-validate="'required|email'"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn color="success" class="btn btn-theme" :loading="isSubmitting" type="submit">Submit</v-btn>
                            <v-btn color="secondary" class="btn btn-grey m-l-10" @click="onCancel()">Cancel</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-card-text>
        </v-card>

    </v-dialog>
</template>


<script>
    import {mapGetters, mapState} from 'vuex';
    import CommonServices from "../../common_services/common";
    import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
    export default {
        name: "forgotPassword",
        components: {
            ErrorBlockServer,
        },
        props: ['value'],
        computed: { },
        mixins: [CommonServices],
        data: function () {
            return {
                email: '',
                errorMessage: '',
                validationMessages: {
                    "email": [{key: 'email', value: 'Please enter valid email'}, {key: 'required', value: 'Please enter email'}],
                },
                isSubmitting: false,
            }
        },
        methods: {
            /**
             * Cancel Method
             */
            onCancel(){
                this.email = '';
                this.$validator.reset();
                this.isSubmitting = false;
                this.errorMessage = '';
                this.$emit('input');
            },

            /**
             * Submit of Forgot Password Modal
             */
            onSubmit() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.$emit('forget-password-email', this.email);
                        this.isSubmitting = false;
                        this.onCancel();
                    }
                });
            }
        }
    }
</script>
