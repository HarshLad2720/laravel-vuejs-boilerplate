<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" class="mb-2 mr-2" v-on="on"><v-icon small>{{ icons.mdiDelete }}</v-icon> </v-btn>
            </template>
            <span>Multiple Delete</span>
        </v-tooltip>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>

    <v-dialog :value="deleteModal" @input="onCancel" content-class="modal-dialog">
        <v-card>
            <v-card-title
                    class="headline black-bg"
                    primary-title>{{this.$getConst('DELETE_TITLE')}}
            </v-card-title>

            <v-card-text>
                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                            <p>{{this.$getConst('WARNING')}}</p>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap class="display-block m-0 ">
                        <v-flex xs12>
                            <v-btn class="btn btn-black m-b-10 m-t-10" @click.native="deleteAction">{{this.$getConst('BTN_OK')}}</v-btn>
                            <v-btn class="btn btn-grey m-b-10 m-t-10" @click.native="onCancel">{{this.$getConst('BTN_CANCEL')}}</v-btn>
                        </v-flex>
                    </v-layout>
            </v-card-text>
        </v-card>

    </v-dialog>
        </span>
</template>

<script>
    import CommonServices from '../common_services/common.js';
    import ErrorModal from '../partials/ErrorModal';

    export default {
        data() {
            return {
                errorArr: [],
                errorDialog: false,
                deleteModal: false,
            }
        },
        components: {
            CommonServices,
            ErrorModal
        },
        props: ['value', 'deleteProps'],
        mixins: [CommonServices],
        methods: {
            deleteMulti() {
                this.deleteModal = true;
            },
            deleteAction() {
                this.$store.dispatch(this.deleteProps.store+'/multiDelete', { id: this.deleteProps.ids}).then(response => {
                    if (response.error) {
                        this.errorArr = response.data.error;
                        this.errorDialog = true;
                    } else {
                        // if no error this code wiil execute
                        this.$store.commit("snackbarStore/setMsg",this.$getConst('DELETE_TITLE'));
                        this.$emit('multiDelete');
                        this.loading =false;
                        this.onCancel();
                    }
                }, error => {
                    this.errorArr = this.getModalAPIerrorMessage(error);
                    this.errorDialog = true;
                });
            },
            onCancel(){
                this.deleteModal = false;
                this.$emit('input');
            }
        },
        mounted() {
            this.errorMessage = '';
        }
    }
</script>
