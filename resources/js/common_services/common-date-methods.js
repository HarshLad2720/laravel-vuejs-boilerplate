import constantPlugin from './constantPlugin';
import moment from 'moment-timezone';
export default {
    data() {
        return {}
    },
    mixins: [constantPlugin],
    methods: {
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
    },
    beforeCreate() {
        // reset snackbar
        this.$store.commit('snackbarStore/clearStore');
    },
    created() {},
    filters: {}
}
