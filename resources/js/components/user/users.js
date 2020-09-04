import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import UserModal from "./UserModal.vue";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
import ErrorModal from "../../partials/ErrorModal";
import MultiDelete from "../../partials/MultiDelete";
import Import from "../../partials/Import";
import lightGallery from 'lightgallery-vue';
import CustomDialog from "../../partials/CustomDialog";
import 'lg-zoom.js';
import 'lg-fullscreen.js';
import 'lg-thumbnail.js';

export default CustomTable.extend({
    name: "Users",
    data: function () {
        var self = this;
        return {
            tab: null,
            files: [],
            modalOpen: false,
            urlApi: 'userStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Name', value: 'name'},
                { text: 'DOB', value: 'dob'},
                { text: 'Gender', value: 'gender_text'},
                { text: 'Address', value: 'address'},
                { text: 'Country', value: 'country.name'},
                { text: 'State', value: 'state.name'},
                { text: 'City', value: 'city.name'},
                { text: 'Mobile', value: 'mobile_no' },
                { text: 'Email', value: 'email' },
                { text: 'Role', value: 'role.name' },
                { text: 'Status', value: 'status_text' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            confirmation: {
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            deleteProps:{
                ids: '',
                store: '',
            },
            importProps:{
                store: 'userStore',
                modelName: 'user',
            },
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            paramProps: {
                idProps: '',
                storeProps: '',
            },
            userDialogue: false,
            errorArr: [],
            errorDialog: false,
            role_id:'',
            filterMenu: false,
            images: [],
            customDialog: false,
            customMessage: '',
            customDialogTitle: '',
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        UserModal,
        ErrorModal,
        ExportBtn,
        MultiDelete,
        Import,
        lightGallery,
        CustomDialog
    },
    computed: {
        ...mapState({
            setCountryList: state => state.countryStore.countryList,
            setStateList: state => state.stateStore.stateList,
            setCityList: state => state.cityStore.cityList,
            setRoleList: state => state.roleStore.roledropdownlist,
            pagination : state => state.roleStore.pagination,
        }),
    },
    watch: {
    },
    created () {
    },
    methods:{
        /**
         *
         */
        setExport(){
            let rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.exportProps.ids = rowIds;
            this.exportProps.store = 'userStore';
            this.exportProps.fileName = 'User';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /**
         * delete user
         * @param id
         */
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'userStore';
            this.confirmation.title = this.$getConst('DELETE_TITLE');
            this.confirmation.description = this.$getConst('WARNING');
            this.modalOpen = true;
        },
        /**
         * Multiple Delete
         */
        multipleDelete(){
            let rowIds = [];
            this.selected.forEach((element, index) => {
                rowIds[index] = element.id;
            });

            this.deleteProps.ids = rowIds;
            this.deleteProps.store = 'userStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },

        /*
        * Edit User
        * @param id
        *  */
        onEdit(id) {
            this.$store.commit('userStore/setEditId', id);
            this.$store.dispatch('userStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    // Open edit user modal
                    this.userDialogue = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        /**
         * Filter
         */
        changeFilter(){
            let filter = {};
            if(this.role_id != ''){
                filter.role_id = [this.role_id];
            }
            this.filterModel =filter;
            this.refresh();
            this.filterMenu= false;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.role_id = '';
            this.changeFilter();
        },
        refreshData(){
            this.refresh();
        },
        importDataTable(){
            this.$refs.importdata.refreshImport();
        },

        /*
        * Open Gallery
        * @param row
        *  */
        openGallery(row) {
            this.images = [];
            var index = this.tableData.findIndex(item => item.id === row.id);
            if(index && index > 0) {
                for (var i = 0; i < row.gallery.length; i++) {
                    let obj = {
                        thumb: row.gallery[i].filename,
                        src: row.gallery[i].filename
                    };
                    this.images.push(obj);
                    this.$forceUpdate();
                }
                if(this.images.length>0) {
                    var self = this;
                    setTimeout(function () {
                        self.$refs.lightGallery.showImage(index);
                    }, 2000);
                } else {
                    this.customDialog = true;
                    this.customDialogTitle = '';
                    this.customMessage = this.$getConst('NOIMAGE');
                }
            } else {
                this.customDialog = true;
                this.customDialogTitle = '';
                this.customMessage = this.$getConst('NOIMAGE');
            }
        },
    },

    mounted(){
        this.$store.dispatch("roleStore/getAll",{page:1,limit:5000}).then(response => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            } else {
                this.$store.commit('roleStore/setRoleList', response.data.data);
            }
        }, error => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
        });

        /* For lightgallery */
        var self = this;
        var lg = document.getElementById('lightgallery');
        lg.addEventListener('onAfterOpen', function(e){
            window.lightGallery(lg, {
                dynamic: true,
                dynamicEl: self.images
            });
        }, true);
        lg.addEventListener('onBeforeClose', function(e){
            window.lgData[lg.getAttribute('lg-uid')].destroy(true);
        }, true);

    },

    beforeDestroy() {
        this.$store.commit('userStore/clearStore');
    }
});
