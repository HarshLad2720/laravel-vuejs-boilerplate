import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import AddRole from "./AddRole.vue";
import ExportBtn from "../../partials/ExportBtn";
import MultiDelete from "../../partials/MultiDelete";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
// import Import from "../../partials/Import";

export default CustomTable.extend({
    name: "Role",
    data: function () {
        var self = this;
        return {
            tab: null,
            files: [],
            modalOpen: false,
            addRoleModal: false,
            urlApi: 'roleStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Role', value: 'name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            paramProps:{
                idProps: '',
                storeProps: ''
            },
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            deleteProps:{
                ids: '',
                store: '',
            },
            confirmation:{
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            paramRole: {
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
                idProps: '',
                storeProps: '',
            },
            role_id:'',
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        AddRole,
        ExportBtn,
        MultiDelete,
        // Import
    },
    computed: {
       ...mapState({
           pagination : state => state.roleStore.pagination,
           setRoleList: state => state.roleStore.roledropdownlist,
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
            this.exportProps.store = 'roleStore';
            this.exportProps.fileName = 'Role';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /**
         * Add Role Modal method
         */
        addrole(){
            this.addRoleModal = true;
        },
        /**
         * Edit Role Modal
         * @param id
         */
        editItem(id){
            // set the edit id in store
            this.$store.commit('roleStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('roleStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('roleStore/setModel', {model: response.data});
                    this.addRoleModal = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'roleStore';
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

            console.log(rowIds);

            this.deleteProps.ids = rowIds;
            this.deleteProps.store = 'roleStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
    },
    mounted(){}
});
