import {mapState} from 'vuex';
import CustomTable from '../../components/customtable/table'

export default CustomTable.extend({
    name: "Users",
    data: () => ({
        statename:'userStore',// set store name here to set/get pagination data and for access of actions/mutation via custom table
        headers: [{ text: 'ID', value: 'id' },
            { text: 'Name', value: 'first_name'},
            { text: 'Mobile', value: 'contact_number' },
            { text: 'Email', value: 'email' },
            { text: 'Role', value: 'role_id' }],
        options:{
            filter:{},
        },
        roleId:"",
    }),
    computed: {
        ...mapState({
            roleList: state => state.userStore.roleList,
        }),
    },
    watch: {
    },
    created () {
    },
    methods:{
        setFilter(){
            this.options.filter = { role_id : [this.roleId] };
        }
    },
    mounted(){
        this.$store.dispatch('userStore/getRoles').then(response => {
            //set data by calling mutation
            this.$store.commit('userStore/setRoleList', response.data.data);
        }, error => {
            //add error handling code here
        });
    }
});
