import CustomTable from '../../components/customtable/table'
import {
    mdiPencil,
    mdiDelete,
} from '@mdi/js'

export default CustomTable.extend({
    name: "Users",
    data: () => ({
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
        /*roleId:"",*/
    }),
    components: {},
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
