<template>
    <div>
        <v-card class=" mx-auto mb-5">
            <v-container>
                <v-row justify="space-between">
                    <v-container>
                        <v-row justify="space-between">
                            <v-layout>
                                <v-flex xs12 sm12 md4 lg4 class="p-4">
                                    <v-file-input
                                            v-model="file"
                                            name="import_file"
                                            accept="csv"
                                            label="File Upload"
                                            show-size
                                            counter
                                            :prepend-icon="icons.mdiPaperclip"
                                            v-validate="'required|size:4000|ext:csv'"
                                            :error-messages="getErrorValue('import_file')"
                                            @click:clear="file=null"
                                    >
                                        <template v-slot:selection="{ text }">
                                            {{ text }}
                                        </template>
                                    </v-file-input>
                                </v-flex>
                                <v-flex xs12 sm12 md6 lg6 class="p-4">
                                    <v-btn @click.native="uploadCsv()" large color="primary"><v-icon small>{{icons.mdiUpload}}</v-icon>Upload</v-btn>
                                    <v-btn large color="success"><v-icon small>{{icons.mdiDownload}}</v-icon>Download Sample CSV</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-row>
                    </v-container>
                </v-row>
            </v-container>
        </v-card>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="tableData"
                :loading="loading"
                :options.sync="options"
                :items-per-page="limit"
                :server-items-length="pageCount"
                :footer-props="footerProps"
                @update:options="onUpdateOptions"
                class="elevation-1"
                :show-select="true"
                v-index="$getConst('USER')"
                ref="table"
        >
            <template v-slot:top>
                <v-layout>
                    <v-flex xs12 sm12 md4 lg4>
                        <v-text-field v-model="searchModel" @input="onSearch" label="Search" class="mx-4 mt-4" prepend-inner-icon="search"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <template v-slot:item.dob="{ item }">
                <span>{{item.dob | getDateFormat(item.dob) }}</span>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="onView(item.id)"
                        v-update = "$getConst('USER')"
                >
                    {{ icons.mdiEye }}
                </v-icon>
            </template>

        </v-data-table>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
        <import-error-modal :importErrorArr="importErrorArr" v-model="importErrorDialog"></import-error-modal>
    </div>
</template>

<script>
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
</script>
