import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import ExportBtn from "../../partials/ExportBtn";
import AddState from "./AddState";
import {
    mdiPencil,
    mdiDelete,
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
                { text: 'Country', value: 'country.name'},
                { text: 'State', value: 'name'},
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
            exportProps:{
                id: '',
                store: '',
                fileName: '',
                pagination: '',
            },
            confirmation:{
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
        }
    },
    components: {
        DeleteModal,
        AddState,
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
    },
    mounted(){}
});
