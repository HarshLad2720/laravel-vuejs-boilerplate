import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
import {mapState} from "vuex";
import CommonServices from "../../common_services/common";
import ErrorModal from '../../partials/ErrorModal.vue';

export default {
    components: { ErrorBlockServer, ErrorModal},
    mixins: [CommonServices],
    data() {
        return {
            errorDialog: false,
            errorArr: [],
            role_id: '',
        }
    },
    computed: {
        ...mapState({
            permissions: state => state.permissionStore.permissions,
            roleList: state => state.roleStore.roledropdownlist,
        }),
    },
    mounted() {
        this.$store.commit('permissionStore/clearPermissions');
        this.$store.dispatch('roleStore/getRoleList').then(response => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            }
        }, error => {
            this.errorArr = getAPIErrorMessage(error.response);
            this.errorDialog = true;
        });
    },
    methods: {
        getPermissions() {
            this.$store.dispatch("permissionStore/getById", this.role_id).then(response => {
                if (response.error) {
                    this.errorDialog = false;
                    this.errorArr = response.data.error;
                }
            }, error => {
                this.errorArr = this.getAPIErrorMessage(error.response);
                this.errorDialog = true;
            });
        },
        editPermission(permission) {
            let sendParams = {
                role_id: this.role_id,
                permission_id: permission.id,
                is_permission: permission.is_permission
            };
            this.$store.dispatch("permissionStore/edit", sendParams).then(response => {
                if (response.error) {
                    this.errorDialog = false;
                    this.errorArr = response.data.error;
                } else {
                    this.$store.commit("snackbarStore/setMsg", this.$getConst('UPDATE_ACTION'));
                }
            }, error => {
                this.errorArr = this.getAPIErrorMessage(error.response);
                this.errorDialog = true;
            });
        }
    }
}
