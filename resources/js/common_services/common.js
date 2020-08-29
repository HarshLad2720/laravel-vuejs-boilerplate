import {mapGetters, mapState} from 'vuex';

import moment from 'moment-timezone';
import {
    mdiPencil,
    mdiDelete,
    mdiFilter,
    mdiPaperclip,
    mdiExport,
    mdiClose,
    mdiPlus
} from '@mdi/js'
var timeConst = 'hh:mm A';
var dateConst = 'DD-MM-YYYY';

export default {
    data() {
        return {
            datenow: '',
            yesnoArr: [{value: '0', text: 'No'}, {value: '1', text: 'Yes'}],
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
            },
        }
    },
    computed: {
        ...mapState({
            UserData: state => state.userStore.currentUserData,
        }),
        ...mapGetters({

        }),
    },
    methods: {
        clearObject(object) {
            Object.keys(object).forEach(function (key) {
                delete object[key];
            });
        },
        onModalCancelPref(storeName) {
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$store.commit(storeName + '/clearStore');
            this.$emit('input'); //Close Pop-up
        },
        onModalClear(storeName, stateName) {
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$emit('input'); //Close Pop-up
            this.$store.commit(storeName + '/' + stateName);
        },
        onModalDataPost(storeName) {
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$store.commit(storeName + '/clearStore');
        },

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
        getErrosFromResponse(response) {
            var err = "";
            Object.keys(response).forEach(function (key) {
                response[key].map(item => err = err + item + "<br/>");
            });
            return err;
        },
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
        currentTime() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(timeConst);
        },
        currentDate() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(dateConst);
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
        objToJson(param) {
            let filter = JSON.stringify(param);
            filter = filter.replace(/\\/g, '');
            return filter;
        },
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
        this.$store.commit('snackbarStore/clearStore');
    },
    created() { },
    filters: {
        /* Format Date */
        getDateFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(String(value)).format(dateConst);
            }
            return date;
        },
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
