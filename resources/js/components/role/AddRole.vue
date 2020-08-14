<template>
    <v-dialog :value="value" @input="$emit('input')" content-class="modal-dialog">
        <v-card>
            <v-card-title
                class="headline black-bg"
                primary-title
            >
                {{paramRole.title}}
            </v-card-title>

            <v-card-text>
                <form method="POST" name="" role="form">
                    <ErrorBlockServer :errorMessage="errorMessage"></ErrorBlockServer>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal first name*" required></v-text-field>
                    </v-col>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <p>{{paramRole.description}}</p>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn color="secondary" class="btn btn-grey m-b-10 m-t-10" @click.native="onCancel">
                                {{paramRole.btnCancelText}}
                            </v-btn>
                            <v-btn color="success" class="btn btn-black m-b-10 m-t-10" @click.native="deleteAction">{{paramRole.btnConfirmationText}}
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
        props: ['value', 'paramRole'],
        mixins: [CommonServices],
        methods: {
            deleteAction() {
                this.$store.dispatch(this.paramRole.storeProps + '/delete', this.paramRole.idProps).then(response => {
                    if (response.error) {
                        this.errorMessage = response.error;
                    } else {
                        this.$store.commit("snackbarStore/setMsg",this.$getConst('DELETE_ACTION'));
                        this.$emit('delete-success');
                        this.onCancel();
                        this.$parent.getData()
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

<!--<template>

</template>

<script>
    export default {
        name: "AddRole"
    }
</script>

<style scoped>

</style>-->
