import CommonServices from '../common_services/common.js';
import ErrorModal from '../partials/ErrorModal';
import ImportErrorModal from '../partials/ImportErrorModal';
import CustomTable from '../components/customtable/table'

export default CustomTable.extend( {
    data() {
        let self = this;
        return {
            file: null,
            urlApi: self.importProps.store +'/getAllImport',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            filterModel:{
                model_name:[self.importProps.modelName],
            },
            headers: [
                { text: 'Error File', value: 'filename'},
                { text: 'Date', value: 'created_at'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            errorArr: [],
            importErrorArr: [],
            errorDialog: false,
            importErrorDialog: false,
            validationMessages: {
                "import_file": [
                    {key: 'required', value: 'File required'},
                    {key: 'size', value: 'File size should be less than 4 MB!'},
                    {key: 'ext', value: 'Only CSV File'}
                ],
            }
        }
    },
    components: {
        CommonServices,
        ErrorModal,
        ImportErrorModal
    },
    props: ['value', 'importProps'],
    mixins: [CommonServices],
    methods: {
        uploadCsv(){
            this.$validator.validate().then(valid => {
                if (valid) {
                    var formData = new FormData();
                    if (this.file != null && this.file instanceof File) {
                        formData.append('file', this.file);
                    }
                    this.$store.dispatch(this.importProps.store + '/import', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                        if (response.error) {
                            this.errorArr = response.data.error;
                            this.getData();
                            this.errorDialog = true;
                        } else {
                            // if no error this code wiil execute
                            this.$store.commit("snackbarStore/setMsg", this.$getConst('UPLOAD_CSV'));
                            this.getData();
                            this.loading = false;
                            this.file = null;
                        }
                    }, error => {
                        this.errorArr = this.getAPIErrorMessage(error.response);
                        this.errorDialog = true;
                        this.getData();
                    });
                }
            });
        },
        refreshImport(){
            this.refresh();
        },
        /**
         *
         *View error detail
         * @param id
         */
        onView(id) {
            this.$store.commit(this.importProps.store +'/setEditId', id);
            this.$store.dispatch(this.importProps.store +'/getByImportId', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    // Open edit user modal
                    this.importErrorArr = response.errors;
                    this.importErrorDialog = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error.response);
                this.errorDialog = true;
            });
        },
    },
    mounted() {
        this.errorMessage = '';
    }
})