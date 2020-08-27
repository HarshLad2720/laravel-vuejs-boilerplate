import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import MultiDelete from "../../partials/MultiDelete";
import AddState from "./AddState";
import {
    mdiPencil,
    mdiDelete,
    mdiFilter
} from '@mdi/js'
import {mapState} from "vuex";

export default CustomTable.extend({
    name: "Country",
    data: function () {
        var self = this;
        return {


            modalOpen: false,
            addSateModal: false,
            statename:'stateStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'State', value: 'name'},
                { text: 'Country', value: 'country.name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            options:{
                filter:{},
            },
            icons: {
                mdiPencil,
                mdiDelete,
                mdiFilter
            },
            paramProps:{
                idProps: '',
                storeProps: '',
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
            country_id:'',
        }
    },
    components: {
        DeleteModal,
        AddState,
        ExportBtn,
        MultiDelete
    },
    computed: {
        ...mapState({
            setCountryList: state => state.countryStore.countryList,
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
            this.exportProps.store = 'stateStore';
            this.exportProps.fileName = 'State';
            this.exportProps.pagination = JSON.parse(JSON.stringify(this.pagination));
            this.$refs.exportbtn.exportToCSV();
        },
        /*
        * Add state Modal method
        * */
        addSate(){
            this.addSateModal = true;
        },
        /*
        * Edit state Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('stateStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('stateStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
                    this.$store.commit('stateStore/setModel', {model: response.data});
                    this.addSateModal = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'stateStore';
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
        /**
         * Filter
         */
        changeFilter(){
            //this.options.filter = {};
            let filter = {};
            if(this.country_id != ''){
                filter.country_id = [this.country_id];
            }
            this.options.filter =filter;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.country_id = ''
            this.options.filter = {}
        }
    },
    mounted(){
        this.$store.dispatch("countryStore/getCountryList").then((result) => {
            this.$store.commit('countryStore/setCountryList', result.data.data);
        });
    }
});
