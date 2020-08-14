import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import AddRole from "./AddRole";
import {
    mdiPencil,
    mdiDelete,
} from '@mdi/js'

export default CustomTable.extend({
    name: "Users",
    data: function () {
        var self = this;
        return {
            modalOpen: false,
            addRoleModal: false,
            statename:'roleStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
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
        AddRole
    },
    computed: {
        /*...mapState({
            roleList: state => state.userStore.roleList,
        }),*/
    },
    watch: {
    },
    created () {
    },
    methods:{
        addrole(){
            this.paramRole.storeProps = 'roleStore';
            this.paramRole.title = this.$getConst('DELETE_TITLE');
            this.paramRole.description = this.$getConst('WARNING');
            this.addRoleModal = true;
        },
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'roleStore';
            this.paramProps.title = this.$getConst('DELETE_TITLE');
            this.paramProps.description = this.$getConst('WARNING');
            this.modalOpen = true;
        },
        /*setFilter(){
            this.options.filter = { role_id : [this.roleId] };
        }*/
    },
    mounted(){
        /*this.$store.dispatch('userStore/getRoles').then(response => {
            //set data by calling mutation
            this.$store.commit('userStore/setRoleList', response.data.data);
        }, error => {
            //add error handling code here
        });*/
    }
});
