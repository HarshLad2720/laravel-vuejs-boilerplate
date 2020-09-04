import {mapGetters, mapState} from 'vuex';
import constantPlugin from './constantPlugin';
import commonDateMethods from './common-date-methods';
import commonErrorMethods from './common-error-methods';

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
    mixins: [constantPlugin,commonDateMethods,commonErrorMethods],
    computed: {
        ...mapState({
            UserData: state => state.userStore.currentUserData,
        }),
        ...mapGetters({}),
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
            this.$validator.reset();
            this.isSubmitting = false;
            this.errorMessage = '';
            this.$store.commit(storeName + '/' + stateName);
            if(!isOpen) {
                this.$emit('input'); //Close Pop-up
            }
        },
        /**
         *  Logout
         */
        logout() {
            localStorage.clear();
            this.$store.commit("userStore/clearUserData");
            this.$router.push("/");
        },
        /**
         * Page reset scrolling
         */
        pageReset(storeName, variableName) {
            this.$store.commit(storeName + '' + variableName, 2);
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
        /**
         * Use for download a file from its url
         * @param url - url of file which needs to be downloaded
         * @param msg - msg to be displayed in toast
         */
        downloadFile(url,msg){
            var link = document.createElement("a");
            var filename = url.substring(url.lastIndexOf('/'+1));
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.$store.commit("snackbarStore/setMsg", this.$getConst(msg));
        }
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
