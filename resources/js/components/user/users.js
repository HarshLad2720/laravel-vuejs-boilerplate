import CustomTable from '../../components/customtable/table'
import DeleteModal from "../../partials/DeleteModal";
import Vue from 'vue';
import UserModal from "./UserModal.vue";
import {mapState} from "vuex";
import CommonServices from '../../common_services/common.js';
import ErrorModal from "../../partials/ErrorModal";

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
            statename:'userStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
            headers: [
                { text: 'Name', value: 'name'},
                { text: 'DOB', value: 'dob'},
                { text: 'Gender', value: 'gender_text'},
                { text: 'Address', value: 'address'},
                { text: 'Mobile', value: 'mobile_no' },
                { text: 'Email', value: 'email' },
                { text: 'Role', value: 'role_id' },
                { text: 'status', value: 'status_text' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            options:{
                filter:{},
            },
            icons: {
                mdiPencil,
                mdiDelete,
            },
            confirmation: {
                title: '',
                description: '',
                btnCancelText: self.$getConst('BTN_CANCEL'),
                btnConfirmationText: self.$getConst('BTN_OK'),
            },
            paramProps: {
                idProps: '',
                storeProps: '',
            },
            userDialogue: false,
            errorArr: [],
            errorDialog: false,
        }
    },
    mixins: [CommonServices],
    components: {
        DeleteModal,
        UserModal,
        ErrorModal,
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
        deleteItem (id) {
            this.paramProps.idProps = id;
            this.paramProps.storeProps = 'userStore';
            this.confirmation.title = this.$getConst('DELETE_TITLE');
            this.confirmation.description = this.$getConst('WARNING');
            this.modalOpen = true;
        },
        /*setFilter(){
            this.options.filter = { role_id : [this.roleId] };
        }*/

        /* Edit User */
        onEdit(id) {
            this.userDialogue = true;
            this.$store.commit('userStore/setEditId', id);
            this.$store.dispatch('userStore/getById', id).then(response => {
                if (response.error) {
                    this.errorArr = response.data.error;
                    this.errorDialog = true;
                    this.userDialogue = true;
                }
            }, error => {
                this.errorArr = this.getModalAPIerrorMessage(error);
                this.errorDialog = true;
            });
        },
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
