import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import AddCity from "./AddCity";
import {
    mdiPencil,
    mdiDelete,
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
                { text: 'State', value: 'state.name'},
                { text: 'City', value: 'name'},
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            options:{
                filter:{},
            },
            icons: {
                mdiPencil,
                mdiDelete,
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
        }
    },
    components: {
        DeleteModal,
        AddCity,
        ExportBtn
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
    },
    mounted(){}
});
