<template>
    <v-dialog :value="value" @input="$emit('input')" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{Confirmation.title}}
            </v-card-title>

            <v-card-text>
                <form method="POST" name="" role="form">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <p>{{Confirmation.description}}</p>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn color="secondary" class="btn btn-grey m-b-10 m-t-10" @click.native="onCancel">
                                {{Confirmation.btnCancelText}}
                            </v-btn>
                            <v-btn color="success" class="btn btn-black m-b-10 m-t-10" @click="deleteAction">{{Confirmation.btnConfirmationText}}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>

            </v-card-text>

        </v-card>


    </v-dialog>
</template>

<script>
    import CommonServices from '../common_services/common.js';
    import ErrorBlock from "../partials/ErrorBlock.vue"
    import ErrorBlockServer from "../partials/ErrorBlockServer.vue"

    export default {
        data() {
            return {
                errorMessage: '',
                mainOrigin: this.mainorigin
            }
        },
        components: {
            CommonServices,
            ErrorBlock,
            ErrorBlockServer,
        },
        props: ['value', 'paramProps' ,'Confirmation'],
        mixins: [CommonServices],
        methods: {
            deleteAction() {
                this.$store.dispatch(this.paramProps.storeProps + '/delete', this.paramProps.idProps).then(response => {
                    if (response.error) {
                        this.errorMessage = response.error;
                    } else {
                        this.$store.commit("snackbarStore/setMsg",this.$getConst('DELETE_ACTION'));

                        this.$emit('delete-success');

                        if (this.mainorigin == 'pictureXray') {
                            this.$store.dispatch(this.paramProps.storeProps+'/getAll',this.$store.state.patientXrayStore.attributePageData);
                            this.onCancel();
                            this.onModalCancelPref(this.paramProps.storeProps);
                        } else {
                            this.onCancel();
                            if(this.$parent.$refs.table) {
                                this.$parent.$refs.table.getData();
                            }
                            this.$store.dispatch('clinicStore/getClinicList');
                            if (this.mainorigin == 'clinic') {
                                this.$parent.getUserClinics();
                            }
                        }
                    }
                }, error => {
                    this.errorMessage = this.getAPIErrorMessage(error.response);
                });

            },
            onCancel() {
                this.$emit('input');
                this.errorMessage = '';
            }
        },
        mounted() {
            this.errorMessage = '';
        }
    }
</script>
