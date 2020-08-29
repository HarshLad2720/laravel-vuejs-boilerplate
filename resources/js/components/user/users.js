import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import Vue from 'vue';
import UserModal from "./UserModal.vue";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
import ErrorModal from "../../partials/ErrorModal";
import MultiDelete from "../../partials/MultiDelete";

export default CustomTable.extend({
    name: "Users",
    data: function () {
        var self = this;
        return {
            tab: null,
            files: [],
            modalOpen: false,
            statename:'userStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
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
            options:{
                filter:{},
            },
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
            country_id:'',
            city_id:'',
            state_id:'',
            role_id:'',
            filtermenu: false,
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        UserModal,
        ErrorModal,
        ExportBtn,
        MultiDelete
    },
    computed: {
        ...mapState({
            setCountryList: state => state.countryStore.countryList,
            setStateList: state => state.stateStore.stateList,
            setCityList: state => state.cityStore.cityList,
            setRoleList: state => state.roleStore.roledropdownlist,
            pagination : state => state.roleStore.pagination,
        })
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
            this.deleteProps.store = 'roleStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /* Edit User */
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
            //this.options.filter = {};
            let filter = {};
            if(this.role_id != ''){
                filter.role_id = [this.role_id];
            }
            this.options.filter =filter;
            this.filtermenu= false;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.role_id = ''
            this.options.filter = {}
        }

    },
    mounted(){
        this.$store.dispatch("roleStore/getRoleList").then((result) => {
            this.$store.commit('roleStore/setRoleList', result.data.data);
        });
    }
});
