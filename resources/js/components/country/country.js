import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import AddCountry from "./AddCountry";
import {
    mdiPencil,
    mdiDelete,
} from '@mdi/js'

export default CustomTable.extend({
    name: "Country",
    data: function () {
        var self = this;
        return {


            modalOpen: false,
            addRoleModal: false,
            statename:'countryStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Role', value: 'name'},
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
        AddCountry
    },
    computed: {},
    watch: {
    },
    created () {
    },
    methods:{
        /*
        * Add Role Modal method
        * */
        addrole(){
            this.addRoleModal = true;
        },
        /*
        * Edit Role Modal
        * */
        editItem(id){
            // set the edit id in store
            this.$store.commit('roleStore/setEditId', id);
            //get by id to open and edit the role of particular id
            this.$store.dispatch('roleStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                } else {
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
    },
    mounted(){}
});
