import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import AddHobby from "./AddHobby.vue";
import MultiDelete from "../../partials/MultiDelete";
import CommonServices from '../../common_services/common.js';
import {mapState} from "vuex";
import Import from "../../partials/Import";

export default CustomTable.extend({
    name: "Hobby",
    data: function () {
        var self = this;
        return {
            tab: 'tab1',
            files: [],
            modalOpen: false,
            addCityModal: false,
            isImportLoaded: false,
            urlApi: 'hobbyStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Hobby', value: 'name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            paramProps:{
                idProps: '',
                storeProps: '',
            },
            confirmation:{
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            importProps:{
                store: 'hobbyStore',
                modelName: 'hobby',
            },
            deleteProps:{
                ids: '',
                store: '',
            },
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        AddHobby,
        ExportBtn,
        MultiDelete,
        Import
    },
    computed: {
        ...mapState({
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
            this.exportProps.store = 'hobbyStore';
            this.exportProps.fileName = 'Hobby';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
        * Add hobby Modal method
        * */
        addhobby(){
            this.addCityModal = true;
        },
        /*
        * Edit Role Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('hobbyStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('hobbyStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('hobbyStore/setModel', {model: response.data});
                    this.addCityModal = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        /**
         * Delete Data from row
         * @param id
         */
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'hobbyStore';
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
            this.deleteProps.store = 'hobbyStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /**
         *Refresh data on tab Click
         */
        refreshData(){
            var self = this;
            setTimeout(function () {
                if(self.tab == 'tab1') {
                    self.refresh();
                } else if(self.tab == 'tab2' && self.$refs.importdata) {
                    if(this.isImportLoaded) {
                        self.$refs.importdata.refreshImport();
                    }
                    this.isImportLoaded = true;
                }
            }, 100);
        },
    },
    mounted(){
        this.isImportLoaded = false;
    }
});
