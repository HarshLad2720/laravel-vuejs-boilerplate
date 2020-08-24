import CommonServices from '../../common_services/common.js';
import ErrorBlockServer from "../../partials/ErrorBlockServer";
import ErrorModal from "../../partials/ErrorModal";
import {mapActions, mapState} from 'vuex'
import Snackbar from "../../partials/Snackbar.vue"
import gallaryImageModal from "../user/gallaryImageModal"

export default {
    name: "register",
    components: {
        ErrorModal,
        ErrorBlockServer,
        Snackbar,
        gallaryImageModal
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
                "mobile_no": [{key: 'required', value: 'Mobile Number required'}, {key: 'min', value: 'Mobile Number must be 10 digits'}, {key: 'max', value: 'Mobile Number must be 10 digits'}],
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
            menu: false,
            todayDate: new Date().toISOString().slice(0,10),
            imageModal: false,
            /*"hobbyList": [
                {
                    "id": "1",
                    "name": "Cooking",
                },
                {
                    "id": "2",
                    "name": "hobby1",
                }
            ],*/
        };
    },
    computed: {
        ...mapState({
            model: state => state.userStore.model,
            isEditMode: state => state.userStore.editId > 0,
            snackbar: state => state.snackbarStore.snackbar,
            countryList: state => state.countryStore.countryList,
            cityList: state => state.cityStore.cityList,
            stateList: state => state.stateStore.stateList,
            hobbyList: state => state.hobbyStore.hobbyList,
        }),
        computedDateFormatted () {
            return this.formatDate(this.model.dob)
        },
    },
    mixins: [CommonServices],
    methods: {
        /**
         * Register Submit Method
         */
        onSubmit() {
            // debugger;
            console.log(self.model);
            this.$validator.validate().then(valid => {
                var self = this;
                if (valid) {
                    self.isSubmitting = true;
                    let formData = '';
                    var apiName = "register";
                    var editId = '';
                    var msgType= self.$getConst('REGISTER_SUCCESS');

                    // For Edit User
                    if (this.$store.state.userStore.editId > 0) {
                        // debugger;
                        apiName = "edit";
                        editId = this.$store.state.userStore.editId;
                        msgType= self.$getConst('UPDATE_ACTION');

                        console.log(self.model);


                        /*let formData = new FormData();
                        formData.name = self.model.name;
                        formData.email = self.model.email;
                        formData.mobile_no = self.model.mobile_no;
                        if (self.model.profile_upload && self.model.profile_upload != null && self.model.profile instanceof File) {
                            formData.profile = self.model.profile;
                        }
                        formData.gender = self.model.gender;
                        formData.dob = self.model.dob;
                        formData.address = self.model.address;
                        formData.country_id = self.model.country_id;
                        formData.state_id = self.model.state_id;
                        formData.city_id = self.model.city_id;*/
                        /*formData.hobby = [];
                        for (var index in self.model.hobby) {
                            formData.hobby[parseInt(index)] = self.model.hobby[index];
                        }
                        formData.gallery = [];
                        for (var index1 in self.model.gallery) {
                            formData.gallery[parseInt(index1)] = self.model.gallery[index1];
                        }*/

                        // debugger;
                        formData = new FormData();
                        for (var key in self.model) {
                            formData.append(key, self.model[key]);
                        }

                        // for profile Image
                        formData.delete('profile');
                        if (self.model.profile_upload && self.model.profile_upload != null && self.model.profile instanceof File) {
                            formData.append('profile', self.model.profile);
                        }

                        // debugger;
                        for (var index in self.model.hobby) {
                            formData.append('hobby[' + parseInt(index) + ']', self.model.hobby[index]);
                        }

                        for (var index2 in self.model.gallery) {
                            if (self.model.gallery[index2] instanceof File) {
                                formData.append('gallery[' + parseInt(index2) + ']', self.model.gallery[index2]);
                            }
                        }

                    } else {
                        // Register
                        formData = new FormData();
                        for (var key in self.model) {
                            formData.append(key, self.model[key]);
                        }

                        // for profile Image
                        formData.delete('profile');
                        if (self.model.profile_upload && self.model.profile_upload != null && self.model.profile instanceof File) {
                            formData.append('profile', self.model.profile);
                        }

                        // Multiple Gallery array
                        formData.delete('gallery');
                        if (self.model.gallery.length > 0) {
                            self.model.gallery.map(function (g) {
                                formData.append('gallery[]', g);
                            });
                        }

                        // Multiple Hobby array
                        formData.delete('hobby');
                        if (self.model.hobby.length > 0) {
                            self.model.hobby.map(function (h) {
                                formData.append('hobby[]', h);
                            });
                        }
                    }
                    self.$store.dispatch("userStore/" + apiName, {model: formData, editId: editId},
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                        if (response.error) {
                            self.isSubmitting = false;
                            self.errorMessage = response.data.error;
                        } else {
                            self.isSubmitting = false;
                            // Success message
                            self.$store.commit("snackbarStore/setMsg", msgType);
                            // Reset data
                            self.onModalDataPost('userStore');
                        }
                    }, error => {
                        self.isSubmitting = false;
                        self.errorMessage = self.getAPIErrorMessage(error.response);
                    });
                }
            });
        },

        /**
         * Format DOB
         */
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },

        /**
         * For view and delete Gallery image
         */
        onImageModal(){
            this.imageModal = true;
        },

        /**
         * Cancel button
         */
        onCancel() {
            // this.onModalCancelPref('userStore');
            this.$emit('input');
        }
    },
    mounted() {
        // this.$store.commit('userStore/clearModel');
        this.$store.dispatch('countryStore/getCountryList');
        this.$store.dispatch('cityStore/getCityList');
        this.$store.dispatch('stateStore/getStateList');
        this.$store.dispatch('hobbyStore/getHobbyList');
    },
};
