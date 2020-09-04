import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import MultiDelete from "../../partials/MultiDelete";
import AddCity from "./AddCity.vue";
import CommonServices from '../../common_services/common.js';
import {mapState} from "vuex";
import Import from "../../partials/Import";

export default CustomTable.extend({
    name: "City",
    data: function () {
        var self = this;
        return {
            tab: null,
            files: [],
            modalOpen: false,
            addCityModal: false,
            urlApi: 'cityStore/getAll',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'City', value: 'name'},
                { text: 'State', value: 'state.name'},
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
            importProps:{
                store: 'cityStore',
                modelName: 'city',
            },
            state_id:'',
            filterMenu: false,
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        AddCity,
        ExportBtn,
        MultiDelete,
        Import
    },
    computed: {
        ...mapState({
            setStateList: state => state.stateStore.stateList,
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
            this.exportProps.store = 'cityStore';
            this.exportProps.fileName = 'City';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
        * Add City Modal method
        * */
        addCity(){
            this.addCityModal = true;
        },
        /*
        * Edit city Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('cityStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('cityStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('cityStore/setList', response.data);
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
            this.paramProps.storeProps = 'cityStore';
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
            this.deleteProps.store = 'cityStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /**
         * Filter
         */
        changeFilter(){
            let filter = {};
            if(this.state_id != ''){
                filter.state_id = [this.state_id];
            }
            this.filterModel =filter;
            this.refresh();
            this.filterMenu= false;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.state_id = '';
            this.changeFilter();
        },
        /**
         *Refresh data on tab Click
         */
        refreshData(){
            this.refresh();
        },
        /**
        *To refresh import table
        */
        importDataTable(){
            this.$refs.importdata.refreshImport();
        },
    },
    mounted(){
        this.$store.dispatch("stateStore/getAll",{page:1,limit:5000}).then((response) => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            } else {
                this.$store.commit('stateStore/setStateList', response.data.data);
            }

        }, error => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
        });
    }
});
