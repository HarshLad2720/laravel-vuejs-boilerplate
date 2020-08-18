<template>
    <v-dialog :value="value" @click:outside="onCancel()" @keydown.esc="onCancel()" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{isEditMode ? 'Update' : 'Add'}} Role
            </v-card-title>

            <v-card-text>
                <form method="POST" name="" role="form">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <p>Role Name</p>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Role" type="text"
                                name="role"
                                v-model="model.name"
                                :error-messages="getErrorValue('role')"
                                v-validate="'required'"
                                solo
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn color="secondary" class="btn btn-grey m-b-10 m-t-10" @click.native="onCancel">
                                {{ $getConst('BTN_CANCEL') }}
                            </v-btn>
                            <v-btn color="success" class="btn btn-black m-b-10 m-t-10" @click.native="addAction">
                                {{isEditMode ?  $getConst('BTN_UPDATE') : $getConst('BTN_SUBMIT') }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>

            </v-card-text>

        </v-card>


    </v-dialog>
</template>

<script>
    import CommonServices from '../../common_services/common.js';
    import ErrorBlock from "../../partials/ErrorBlock.vue"
    import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                errorMessage: '',
                validationMessages: {
                    "role": [{key: 'required', value: 'Enter role name'}]
                }
            }
        },
        components: {
            CommonServices,
            ErrorBlock,
            ErrorBlockServer,
        },
        props: ['value'],
        mixins: [CommonServices],
        computed: {
            ...mapState({
                model: state => state.roleStore.model,
                isEditMode: state => state.roleStore.editId > 0
            }),
        },
        methods: {
            addAction() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        var apiName = "add";
                        var editId = '';
                        var msgType=this.$getConst('CREATE_ACTION');
                        if (this.$store.state.roleStore.editId > 0) {
                            apiName = "edit";
                            editId = this.$store.state.roleStore.editId;
                            msgType=this.$getConst('UPDATE_ACTION');
                        }
                        let sendData = {
                            name: this.model.name,
                        };

                        this.$store.dispatch('roleStore/'+apiName, {model: sendData, editId: editId}).then(response => {
                            if (response.error) {
                                this.errorMessage = response.error;
                            } else {
                                this.$store.commit("snackbarStore/setMsg",msgType);
                                this.onCancel();
                                this.$parent.getData()
                            }
                        }, error => {
                            this.errorMessage = this.getAPIErrorMessage(error.response);
                        });

                    }
                })
            },
            onCancel() {
                this.onModalClear('roleStore', 'clearStore');
            },
        },
        mounted() {
            this.errorMessage = '';
        }
    }
</script>
