import {mapGetters, mapState} from 'vuex';
import constantPlugin from './constantPlugin';
import moment from 'moment-timezone';


import {
    mdiPencil,
    mdiDelete,
    mdiFilter,
    mdiPaperclip,
    mdiExport,
    mdiClose,
    mdiPlus,
    mdiEye,
    mdiDownload,
    mdiUpload,
    mdiImage
} from '@mdi/js'


export default {
    data() {
        return {
            rules: [
                value => !value || value.size < 4000000 || 'File size should be less than 4 MB!',
            ],
            multipleFileRules: [
                value => !value.length || value.reduce((size, file) => size + file.size, 0) < 4000000 || 'File size should be less than 4 MB!',
            ],
            emailRules: [
                value => !!value || 'E-mail is required',
                value => /.+@.+\..+/.test(value.email) || /.+@.+\..+/.test(value) || 'E-mail must be valid',
            ],
            icons: {
                mdiPencil,
                mdiDelete,
                mdiFilter,
                mdiPaperclip,
                mdiExport,
                mdiClose,
                mdiPlus,
                mdiEye,
                mdiDownload,
                mdiUpload,
                mdiImage
            },
        }
    },
    mixins: [constantPlugin],
    computed: {
        ...mapState({
            UserData: state => state.userStore.currentUserData,
        }),
        ...mapGetters({

        }),
    },
    methods: {
        /**
         * clear object Method
         * @param object
         */
        clearObject(object) {
            Object.keys(object).forEach(function (key) {
                delete object[key];
            });
        },

        /**
         * Modal clear functionality
         * @param storeName
         * @param stateName
         * @param isOpen - want to open modal or not (true, false)
         */
        onModalClear(storeName, stateName, isOpen) {
            if(!stateName){
                stateName = 'clearStore';
            }
            if(!isOpen) {
                this.$emit('input'); //Close Pop-up
            }
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$store.commit(storeName + '/' + stateName);
        },

        /* Logout */
        logout() {
            localStorage.clear();
            this.$store.commit("userStore/clearUserData");
            this.$router.push("/");
        },

        /**
         * Used error rule check
         * @param field - name of the field
         */
        getErrorRule(field) {
            var error = this.errors.items.find(function (item) {
                if (item.scope) {
                    return item.scope + "." + item.field == field;
                } else {
                    return item.field == field;
                }
            });
            if (error) {
                return error.rule;
            }
        },

        /**
         * Used for displaying error message
         * @param field - name of the field
         * @param indexVal - if in v-for send index
         * @returns Message
         */
        getErrorValue(field, indexVal) {
            let rule = '';
            if (indexVal != null && indexVal != 'undefined') {
                rule = this.getErrorRule(field + "_" + indexVal);
            } else {
                rule = this.getErrorRule(field);
            }
            if (rule) {
                var arr = field.split("."); //with scopes
                if (arr.length == 1) {
                    field = arr[0];
                } else {
                    field = arr[1];
                }
                let index = this.validationMessages[field].findIndex(p => p.key == rule);
                return this.validationMessages[field][index].value;
            } else {
                return;
            }
        },

        /**
         * Used for changing :error property where only color needs to change and no message needs to be shown e.g; checkbox
         * @param field - name of the field
         * @param indexVal - if in v-for send index
         * @returns {boolean}
         */
        getErrorCount(field, indexVal) {
            let rule = '';
            if (indexVal != null && indexVal != 'undefined') {
                rule = this.getErrorRule(field + "_" + indexVal);
            } else {
                rule = this.getErrorRule(field);
            }
            if (rule) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * Used for get API error messsage
         * @param response - response of error
         * @returns error
         */
        getAPIErrorMessage(response) {
            var error = "Something went wrong. Please try again later.";
            if (!response)
                return error;
            if (response.status == 422) {
                error = response.data.errors;
                var error_string = '';
                for (var key in error) {
                    error_string += error[key] + "<br>";
                }
                error = error_string;
                if (response.data.error) {
                    if (response.data.error.errors) {
                        error = this.getErrosFromResponse(response.data.error.errors)
                    } else {
                        error = response.data.error;
                    }
                }
            }
            if (response.status == 401) {
                this.logout();
            }
            return error;
        },

        /**
         * Used for get error code
         * @param response - response of error
         * @returns error
         */
        getErrorCode(response) {
            var error = "Something went wrong. Please try again later.";
            if (response.status == 422) {
                error = response.data.errors;
                var error_string = '';
                for (var key in error) {
                    error_string += error[key] + "<br>";
                }
                error = error_string;
                if (response.data.error) {
                    error = response.data.error;
                }
            } else if (response.status == 401) {
                this.logout();
            }
            return error;
        },

        /**
         * Used for get errors from response
         * @param response - response of error
         * @returns error
         */
        getErrosFromResponse(response) {
            var err = "";
            Object.keys(response).forEach(function (key) {
                response[key].map(item => err = err + item + "<br/>");
            });
            return err;
        },

        /**
         * Used for get modal API error message
         * @param response - response of error
         * @returns error
         */
        getModalAPIerrorMessage(response) {
            var err = [];
            var self = this;
            Object.keys(response).forEach(function (key) {
                var val = response[key];
                if (!val.hasOwnProperty('data')) {
                    err.push({name: key, message: self.getErrorCode(response[key])})
                }
            });
            return err;
        },

        /**
         *Page reset scrolling
         */
        pageReset(storeName, variableName) {
            this.$store.commit(storeName + '' + variableName, 2);
        },

        /* Current Time */
        currentTime() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(this.$getConst('TIME_CONST'));
        },

        /* Current Date */
        currentDate() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(this.$getConst('DATE_CONST'));
        },

        /* Current Date Time */
        currentDateTime() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(this.$getConst('DATE_TIME_CONST'));
        },

        /* Format Date */
        getDateFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(String(value)).format(this.$getConst('DATE_CONST'));
            }
            return date;
        },

        /* Format Time */
        getTimeFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(String(value)).format(this.$getConst('TIME_CONST'));
            }
            return date;
        },

        /* Format Date Time */
        getDateTimeFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(String(value)).format(this.$getConst('DATE_TIME_CONST'));
            }
            return date;
        },


        /**
         * @objectData Object of data from which we need to filter
         * @param Object of filter condition {key : value}
         * @returns {Array list of filtered items}
         */
        filter(objectData, param) {
            let filterData = [];
            Object.keys(param).forEach(function (key) {
                objectData.filter(function (item) {
                    if (item[key] == param[key]) {
                        filterData.push(item);
                    }
                });
            });
            return filterData;
        },

        /**
         * Used for converting object to json format
         * @param param - param that we want to convert
         */
        objToJson(param) {
            let filter = encodeURIComponent(JSON.stringify(param));
            filter = filter.replace(/\\/g, '');
            return filter;
        },

        /**
         * Used for convert to CSV format
         * @param filename - name of file
         * @param data - response data
         * @param type - type of CSV
         * @param extension - extension of CSV
         */
        convertToCSV(filename, data, type = 'text/csv;charset=utf-8;', extension = '.csv') {
            var exportedFilename = filename + '' + new Date() + extension;
            var blob = new Blob([data], {type: type});
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, exportedFilename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        },
    },
    beforeCreate() {
        // reset snackbar
        this.$store.commit('snackbarStore/clearStore');
    },
    created() { },
    filters: {

        /**
         * Truncate no of character from the text
         * @param value - text
         * @param limit - no of chars which need to remove
         * @returns {string} - Truncated text
         */
        truncateText(value, limit) {
            if (value.length > limit) {
                value = value.substring(0, (limit - 3)) + '...'; // Here subrtracting 3 from text becoz we added 3 dots
            }
            return value
        }
    }
}
