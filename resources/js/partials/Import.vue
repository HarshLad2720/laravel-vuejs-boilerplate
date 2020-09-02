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
                                            placeholder="Upload your file"
                                            accept="csv"
                                            label="File input"
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
                                    <v-btn large color="primary"><v-icon small>{{icons.mdiDownload}}</v-icon>Download Sample CSV</v-btn>
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
                        @click="onEdit(item.id)"
                        v-update = "$getConst('USER')"
                >
                    {{ icons.mdiEye }}
                </v-icon>
            </template>

        </v-data-table>
        <error-modal :errorArr="errorArr" v-model="errorDialog"></error-modal>
    </div>
</template>

<script>
    import CommonServices from '../common_services/common.js';
    import ErrorModal from '../partials/ErrorModal';
    import CustomTable from '../components/customtable/table'

    export default CustomTable.extend( {
        data() {
            return {
                file: null,
                urlApi: 'userStore/getAllImport',// set store name here to set/get pagination data and for access of actions/mutation via custom table
                headers: [
                    { text: 'Error File', value: 'filename'},
                    { text: 'Date', value: 'created_at'},
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                errorArr: [],
                errorDialog: false,
                validationMessages: {
                    "import_file": [
                        {key: 'required', value: 'File required'},
                        {key: 'size', value: 'File size should be less than 4 MB!'},
                        {key: 'ext', value: 'Only CSV Files'}
                        ],
                }
            }
        },
        components: {
            CommonServices,
            ErrorModal
        },
        props: ['value', 'deleteProps'],
        mixins: [CommonServices],
        methods: {
            uploadCsv(){
                this.$validator.validate().then(valid => {
                    if (valid) {
                        var formData = new FormData();
                        if (this.file != null && this.file instanceof File) {
                            formData.append('file', this.file);
                        }
                        this.$store.dispatch(this.statename + '/import', formData).then(response => {
                            if (response.error) {
                                this.errorArr = response.data.error;
                                this.errorDialog = true;
                            } else {
                                // if no error this code wiil execute
                                this.$store.commit("snackbarStore/setMsg", this.$getConst('UPLOAD_CSV'));
                                this.onCancel();
                                this.$parent.getData();
                                this.loading = false;
                                this.file = null;
                            }
                        }, error => {
                            this.errorArr = this.getAPIErrorMessage(error);
                            this.errorDialog = true;
                        });
                    }
                });
            }
        },
        mounted() {
            this.errorMessage = '';
        }
    })
</script>
