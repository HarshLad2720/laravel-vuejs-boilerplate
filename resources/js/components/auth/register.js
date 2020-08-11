import BootstrapVue from "../../plugins/bootstrap-vue";
import CommonServices from '../../common_services/common.js';
import ErrorBlockServer from "../../partials/ErrorBlockServer";
import ErrorModal from "../../partials/ErrorModal";
import {mapActions, mapState} from 'vuex';

export default {
    name: "register",
    components: {
        ErrorModal,
        ErrorBlockServer
    },
    data() {
        return {
            errorArr: [],
            errorDialog: false,
            errorMessage: '',
            show_password: false,
            validationMessages: {
                "name": [{key: 'required', value: 'Name required'}],
                "email": [{key: 'required', value: 'Email required'}, {
                    key: 'email',
                    value: 'Please enter valid email'
                }],
                "password": [{key: 'required', value: 'Password required'}, {
                    key: 'min',
                    value: 'Password length should be at least 6'
                }],
                "mobile_no": [{key: 'required', value: 'Mobile Number required'}],
                "profile": [{key: 'required', value: 'Profile Image required'}, {
                    key: 'size',
                    value: 'File size should be less than 4 MB!'
                }, {
                    key: 'ext',
                    value: 'Invalid image'
                }],
                "gender": [{key: 'required', value: 'Gender required'}],
                "dob": [{key: 'required', value: 'Date of Birth required'}],
                "address": [{key: 'required', value: ['Address required']}],
                "country_id": [{key: 'required', value: 'Country required'}],
                "state_id": [{key: 'required', value: 'State required'}],
                "city_id": [{key: 'required', value: 'City required'}],
                "gallery": [{key: 'required', value: 'Gallery required'}, {
                    key: 'size',
                    value: 'File size should be less than 4 MB!'
                }, {
                    key: 'ext',
                    value: 'Invalid image'
                }],
                "hobby": [{key: 'url', value: 'Hobby required'}]
            },
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState({
            model: state => state.userStore.createModel,
        }),
        expireMonth(){
            return this.computedMonthUnixSlashShortYearFormat(this.model.exp_month);
        }
    },
    mixins: [CommonServices],
    methods: {
        onSubmit() {
            var self = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    console.log("Valid");
                    /*self.isSubmitting = true;
                    let formData = new FormData();
                    for (var key in self.model) {
                        formData.append(key, self.model[key]);
                    }
                    formData.delete('logo');
                    if (self.model.logo && self.model.logo != null && self.model.logo instanceof File) {
                        formData.append('logo', self.model.logo);
                    }
                    self.$store.dispatch("subscriptionStore/add", {model: formData},
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                        if (response.error) {
                            self.isSubmitting = false;
                            self.errorMessage = response.data.error;
                        } else {
                            self.$store.commit("snackbarStore/setMsg", self.$getConst('CREATE_SUBSRIPTION'));
                            console.log("SUccess");
                            self.onCancel();
                        }
                    }, error => {
                        self.isSubmitting = false;
                        self.errorMessage = self.getAPIErrorMessage(error.response);
                    });*/
                }
            });
        },
    },
};
