<template>
    <div>
        <v-btn class="btn btn-grey m-l-10 m-t-0 float-right">Export</v-btn>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
    </div>
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
        props: ['value', 'exportProps'],
        mixins: [CommonServices],
        methods: {
            exportToCSV() {
                this.$store.dispatch(this.exportProps.store+'/export',this.exportProps.pagination).then(response => {
                    if (response.error) {
                        this.errorArr = response.data.error;
                        this.errorDialog = true;
                    } else {
                        this.convertToCSV(this.exportProps.fileName, response.data)
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
