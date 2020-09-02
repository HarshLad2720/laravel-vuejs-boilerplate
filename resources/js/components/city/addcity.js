import CommonServices from '../../common_services/common.js';
import ErrorBlock from "../../partials/ErrorBlock.vue"
import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
import {mapState} from "vuex";

export default {
    data() {
        return {
            errorMessage: '',
            validationMessages: {
                "city": [{key: 'required', value: 'Enter city name'}],
                "state": [{key: 'required', value: 'Please select a state'},]
            },
            loading: false
        }
    },
    components: {
        CommonServices,
        ErrorBlock,
        ErrorBlockServer,
    },
    props: ['value'],
    mixins: [CommonServices],
    computed: {
        ...mapState({
            setStateList: state => state.stateStore.stateList,
            model: state => state.cityStore.model,
            isEditMode: state => state.cityStore.editId > 0
        }),
    },
    methods: {
        /*
        * Submit action of form*/
        addAction() {
            this.$validator.validate().then(valid => {
                if (valid) {
                    // loader enable
                    this.loading = true;
                    // apiName is method to call the from the store
                    var apiName = "add";
                    var editId = '';
                    var msgType=this.$getConst('CREATE_ACTION');
                    if (this.$store.state.cityStore.editId > 0) {
                        apiName = "edit";
                        editId = this.$store.state.cityStore.editId;
                        msgType=this.$getConst('UPDATE_ACTION');
                    }
                    let sendData = {
                        state_id: this.model.state_id,
                        name: this.model.name,
                    };
                    this.$store.dispatch('cityStore/'+apiName, {model: sendData, editId: editId}).then(response => {
                        if (response.error) {
                            // loader disable if any error and display the error
                            this.loading =false;
                            this.errorMessage = response.error;
                        } else {
                            // if no error this code wiil execute
                            this.$store.commit("snackbarStore/setMsg",msgType);
                            this.onCancel();
                            this.$parent.getData();
                            this.loading =false;
                        }
                    }, error => {
                        // loader disable if any error and display the error
                        this.loading =false;
                        this.errorMessage = this.getAPIErrorMessage(error.response);
                    });

                }
            })
        },
        onCancel() {
            // clear model
            this.onModalClear('cityStore', 'clearStore');
        },
    },
    mounted() {
        this.$store.dispatch("stateStore/getAll",{page:1,limit:5000}).then((response) => {
            if (response.error) {
                this.errorArr = response.data.error;
                this.errorDialog = true;
            } else {
                this.$store.commit('stateStore/setStateList', response.data.data);
            }
        }, error => {
            this.errorArr = this.getModalAPIerrorMessage(error);
            this.errorDialog = true;
        });
        // clear errorMessage
        this.errorMessage = '';
    }
}
