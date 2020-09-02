import {mapGetters, mapState} from 'vuex';
import CommonServices from "../../common_services/common";
import ErrorBlockServer from "../../partials/ErrorBlockServer.vue"
import {mdiDelete, mdiPencil} from "@mdi/js";
import DeleteConfirm from "../../partials/DeleteConfirm.vue"
import ErrorModal from '../../partials/ErrorModal.vue';
import CustomDialog from "../../partials/CustomDialog";

export default {
    name: "galleryImageModal",
    components: {
        ErrorBlockServer,DeleteConfirm,ErrorModal,CustomDialog
    },
    props: ['value'],
    mixins: [CommonServices],
    data: function () {
        var self = this;
        return {
            email: '',
            errorMessage: '',
            errorArr: [],
            errorDialog: false,
            customDialog: false,
            customMessage: '',
            customDialogTitle: '',
            icons: {
                mdiPencil,
                mdiDelete,
            },
            deleteConfirm: false,
            paramProps: {
                idProps: '',
                indexProps: '',
            },
        }
    },
    computed: {
        ...mapState({
            galleryList: state => state.userStore.galleryList,
        }),
    },
    methods: {
        /**
         * Cancel Method
         */
        onCancel(){
            this.errorMessage = '';
            this.$emit('input');
        },

        /* Delete Modal  */
        confirmDelete(id, index){
            this.paramProps.idProps = id;
            this.paramProps.indexProps = index;
            this.deleteConfirm = true;
        },

        /* Delete Image */
        deleteImage(payload){
            this.deleteConfirm = false;
            var apiName = 'deleteImage';
            var msg='DELETE_ACTION';
            this.$store.dispatch('userStore/'+apiName,payload.idProps).then(response => {
                this.deleting = false;
                if (response.error) {
                    this.customDialog = true;
                    this.customDialogTitle = this.$getConst('ERROR');
                    this.customMessage = response.data.error;
                } else {
                    // remove the image that we want to delete
                    this.galleryList.splice(payload.indexProps, 1);
                    this.$store.commit("userStore/setGalleryImageList", this.galleryList);
                    this.$store.commit("snackbarStore/setMsg", this.$getConst(msg));
                }
            }, error => {
                this.errorArr = this.getAPIErrorMessage(error.response);
                this.errorDialog = true;
            });
        },
    }
}
