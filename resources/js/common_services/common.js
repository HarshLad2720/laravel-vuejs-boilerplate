import {mapGetters, mapState} from 'vuex';

import moment from 'moment-timezone';
var timeConst = 'hh:mm A';
var dateConst = 'DD-MM-YYYY';
var datePickerFormatConst = 'YYYY-MM-DD';
var monthConst = 'MM-YYYY';
var monthStringConst = 'MMMM YYYY';
var yearConst = 'YYYY';
var monthSlashConst = 'MM/YYYY';
var monthSlashShortYearConst = 'MM/YY';
var humanReadableDateConst = "MMMM Do, YYYY";
var humanReadableDayAndDateConst = "dddd MMMM Do YYYY";
var humanReadableFullDateConst = "dddd DD MMMM YYYY";
var dayConst = "dddd";
var dateSlashConst = 'DD/MM/YYYY';
var dateStringConst = 'DD MMM YYYY';
var dateLongStringConst = 'LLLL';
var dateTimeConst = dateConst + ' ' + timeConst;
var dateTimeSlashConst = dateSlashConst + ' ' + timeConst;
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
        }
    },
    computed: {
        ...mapState({
            UserData: state => state.userStore.currentUser,
        }),
        ...mapGetters({
            /*userFullName: 'userStore/userFullName',
            userProfilePicture: 'userStore/userProfilePicture',*/
        }),
    },
    methods: {
        clearObject(object) {
            Object.keys(object).forEach(function (key) {
                delete object[key];
            });
        },
        /*logout() {
            this.$store.commit('userStore/clearUserData'); //Remove user data to logout.
            this.$router.push('/login');
            localStorage.clear();
        },*/
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
        /**
         * This is used to get timestamp in EPOCH of UTC i.e. removing the timezone offset
         * @param date
         * @returns {number}
         */
        getUTCDateEpoch(date) {
            if (date) {
                return parseInt(moment.utc(date).valueOf() / 1000);
            }
            return '';
        },
        /**
         * Calculate Age when you have time in epoch format
         * @param time - Epoch timestamp in seconds
         * @returns {number}
         */
        calculateAgeUnix(time) {
            if (time) {
                var ageDate = new Date(Date.now() - moment.unix(time)); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
            return 'N/A';
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
        currentDateStartOfDay() {
            return moment().startOf('day').toString();
        },
        currentDateSlashFormat() {
            var current = parseInt(moment.utc().valueOf() / 1000);
            return moment.unix(current).format(dateSlashConst);
        },
        dateToTimestamp(date) {
            return parseInt(moment.utc(date).valueOf() / 1000);
        },
        computedDateFormattedMomentjs(date) {
            return date ? moment(date).format(dateConst) : ''
        },
        computedUnixDateFormattedMomentjs(date) {
            return date ? moment.unix(date).format(datePickerFormatConst) : ''
        },
        computedUnixTimestampToDate(date) {
            return date ? moment.unix(parseInt(date)).format(datePickerFormatConst) : ''
        },
        computedSlashDateFormattedMomentjs(date) {
            return date ? moment(date).format(dateSlashConst) : ''
        },
        computedMonthFormattedMomentjs(date) {
            return date ? moment(date).format(monthConst) : ''
        },
        computedMonthtringFormattedMomentjs(date) {
            return date ? moment(date).format(monthStringConst) : ''
        },
        computedMonthUnixFormattedMomentjs(date) {
            return date ? moment.unix(date).format(monthConst) : ''
        },
        computedMonthUnixSlashShortYearFormat(date) {
            return date ? moment(date).format(monthSlashShortYearConst) : ''
        },
        computedYearFormat(date) {
            return date ? moment(date).format(yearConst) : ''
        },
        computedYearUnixYearFormat(date) {
            return date ? moment.unix(date).format(yearConst) : ''
        },
        convertTimeTo24Hrs(time) {
            return time ? moment(time, ["hh:mm A"]).format("HH:mm") : '';
        },
        convertTimeTo24HrsInChunks(time) {
            return time ? {
                hour: moment(time, ["hh:mm A"]).format("HH"),
                minute: moment(time, ["hh:mm A"]).format("mm"),
                time_type: moment(time, ["hh:mm A"]).format("A"),
            } : '';
        },
        convertTimeTo12Hrs(time, inChunks) {
            if (time && inChunks) {
                return {
                    hour: moment(time, ["HH:mm"]).format("hh"),
                    minute: moment(time, ["HH:mm"]).format("mm"),
                    time_type: moment(time, ["HH:mm"]).format("A"),
                }
            }
            if (time && !inChunks) {
                return moment(time, ["HH:mm"]).format("hh:mm A");
            }
            return '';
        },
        convertTimestampWithTimezoneIntoDate(timeStamp) {
            return timeStamp ? moment.tz(parseInt(timeStamp) * 1000, this.currentClinicTimezone).format(dateTimeSlashConst) : '';
        },
        convertTimestampWithTimezoneIntoDynamicFormat(timeStamp, formatConst) {
            return timeStamp ? moment.tz(parseInt(timeStamp) * 1000, this.currentClinicTimezone).format(formatConst) : '';
        },
        compareTimes(startTime, endTime, timeFormat) {
            startTime = moment(startTime, timeFormat); //time format -> h:mma
            endTime = moment(endTime, timeFormat);
            return startTime.isBefore(endTime);
        },
        compareMultipleTimes(comparableTime, startTime, endTime, timeFormat) {
            comparableTime = moment(comparableTime, timeFormat);
            startTime = moment(startTime, timeFormat); //time format -> h:mma
            endTime = moment(endTime, timeFormat);
            return comparableTime.isBetween(startTime, endTime);
        },
        isDeletable(object) {
            if (this.isSuperAdmin) {
                return true;
            } else {
                var endDate = moment.unix(object.created_at).add(1, 'day');
                return moment(moment.now()).isSameOrBefore(endDate);
            }
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
         * @response API resopnse for print
         * convert arraybuffer streamed data to pdf file and open print window
         * @returns {number}
         */
        printResponse(response) {
            //Create a Blob from the PDF Stream
            let file = new Blob(
                [response],
                {type: 'application/pdf'});
            //Build a URL from the file
            let fileURL = window.URL.createObjectURL(file);
            //Open the URL on new Window
            let tab = window.open(fileURL);
            tab.print();
        },
        /**
         * @param Object which we need to covert in json
         * @returns {json data}
         */
        objToJson(param) {
            let filter = JSON.stringify(param);
            filter = filter.replace(/\\/g, '');
            return filter;
        },
        convertToCSV(filename, data, type = 'text/csv;charset=utf-8;', extension = '.csv') {
            var exportedFilename = filename + new Date() + extension;
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
        refreshInfiniteList(refName) {
            this.resetParams();
            if (this.$refs[refName]) {
                this.$refs[refName].stateChanger.reset();
            }
        },
    },
    beforeCreate() {
        this.$store.commit('snackbarStore/clearStore');
    },
    created() { },
    filters: {
        getHumanReadableDate(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(value).format(humanReadableDateConst);
            }
            return date;
        },
        getHumanReadableDayAndDateConst(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(value).format(humanReadableDayAndDateConst);
            }
            return date;
        },
        getHumanReadableFullDate(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(value).format(humanReadableFullDateConst);
            }
            return date;
        },
        getDayName(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment(value).format(dayConst);
            }
            return date;
        },
        getDateUnixFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(value).format(dateConst);
            }
            return date;
        },
        getDateFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(dateConst);
            }
            return date;
        },
        getTimeFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(timeConst);
            }
            return date;
        },
        getDatetimeFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(dateTimeConst);
            }
            return date;
        },
        getDateSlashFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(dateSlashConst);
            }
            return date;
        },
        getMonthSlashFormat(value) {
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(dateSlashConst);
            }
            return date;
        },
        getDateFormatString(value) {
            //e.x. 01 JUN 2019
            let date = "";
            if (value != "" && value != null) {
                date = moment.unix(parseInt(value)).format(dateStringConst);
            }
            return date;
        },

        /**
         * Format number
         * @param value
         */
        formatNumber(value) {
            if (value || value == '0') {
                return parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }else {
                return '0.00';
            }
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
