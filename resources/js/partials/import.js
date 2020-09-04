import CommonServices from '../common_services/common.js';
import ErrorModal from '../partials/ErrorModal';
import ImportErrorModal from '../partials/ImportErrorModal';
import CustomTable from '../components/customtable/table'
import {mapState} from "vuex";

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
    computed: {
        ...mapState({
            sampleExcels: state => state.userStore.currentUserData.samples_excels,
        }),
    },
    methods: {
        /**
         *Download Sample File
         */
        downloadSampleFile(){
            if(this.sampleExcels.length>0) {
                let file_url = this.sampleExcels[0]['sample_' + this.importProps.modelName];
                if (file_url) {
                    this.downloadFile(file_url, 'DOWNLOAD_SAMPLE_CSV');
                }
            }
        },
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
                            this.loading = false;
                            this.errorArr = response.data.error;
                            this.errorDialog = true;
                            this.getData();
                        } else {
                            // if no error this code will execute
                            this.loading = false;
                            this.$store.commit("snackbarStore/setMsg", this.$getConst('UPLOAD_CSV'));
                            this.getData();
                            this.file = null;
                        }
                    }, error => {
                        this.loading = false;
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
