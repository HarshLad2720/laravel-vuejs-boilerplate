import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import MultiDelete from "../../partials/MultiDelete";
import AddCity from "./AddCity";
import {
    mdiPencil,
    mdiDelete,
    mdiFilter
} from '@mdi/js'
import {mapState} from "vuex";

export default CustomTable.extend({
    name: "City",
    data: function () {
        var self = this;
        return {


            modalOpen: false,
            addCityModal: false,
            statename:'cityStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'City', value: 'name'},
                { text: 'State', value: 'state.name'},
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
            paramRole: {
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
                idProps: '',
                storeProps: '',
            },
            state_id:'',
        }
    },
    components: {
        DeleteModal,
        AddCity,
        ExportBtn,
        MultiDelete
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
            this.deleteProps.store = 'roleStore';
            this.$refs.multipleDeleteBtn.deleteMulti();
        },
        /**
         * Filter
         */
        changeFilter(){
            //this.options.filter = {};
            let filter = {};
            if(this.city_id != ''){
                filter.city_id = [this.city_id];
            }
            this.options.filter =filter;
        },
        /**
         * Reset Filter
         */
        resetFilter(){
            this.city_id = ''
            this.options.filter = {}
        }
    },
    mounted(){
        this.$store.dispatch("stateStore/getStateList").then((result) => {
            this.$store.commit('stateStore/setStateList', result.data.data);
        });
    }
});
