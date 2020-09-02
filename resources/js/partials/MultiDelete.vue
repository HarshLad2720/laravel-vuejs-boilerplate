<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" class="mb-2 mr-2" v-on="on"><v-icon small>{{ icons.mdiDelete }}</v-icon> </v-btn>
            </template>
            <span>Multiple Delete</span>
        </v-tooltip>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
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
                this.$store.dispatch(this.deleteProps.store+'/multiDelete', { id: this.deleteProps.ids}).then(response => {
                    if (response.error) {
                        this.errorArr = response.data.error;
                        this.errorDialog = true;
                    } else {
                        // if no error this code wiil execute
                        this.$store.commit("snackbarStore/setMsg",this.$getConst('DELETE_TITLE'));
                        this.onCancel();
                        this.$parent.getData();
                        this.loading =false;
                    }
                }, error => {
                    this.errorArr = this.getModalAPIerrorMessage(error);
                    this.errorDialog = true;
                });
            },
        },
        mounted() {
            this.errorMessage = '';
        }
    }
</script>
