import Vue from 'vue';

export default Vue.extend({
    name:'CustomTable',
    data() {
        return {
            loading: false,
            singleSelect: false,
            selected: [],
            statename:"",
            headers:[],
            options: {
                search:"",
            },
            footerProps: {
                'items-per-page-options': [10, 20, 30, 50, 100]
            },
        }
    },
    computed: {
        /**
         * return current statename/storename
         * need to be pass from js
         * @returns {*}
         */
        state: function state() {
            return this.$store.state[this.statename];
        },
        /**
         * return array of objects for table data
         * @returns {*}
         */
        tableData: function tableData() {
            return this.state.tableData.data;
        },
        /**
         * return number of current page
         * @returns {*}
         */
        currentPage: function currentPage() {
            return this.state.tableData.current_page;
        },
        /**
         * return limit/per page value for data table
         * @returns {*}
         */
        limit: function currentPage() {
            return this.state.pagination.limit;
        },
        /**
         * return total number of items on server for table pagination
         * @returns {number}
         */
        pageCount: function pageCount() {
            return this.state.tableData.total ? this.state.tableData.total : 0;
        },
    },
    methods: {
        onSelectColumnAll(checked) {
            let list = this.$refs.tableData.data;
            let rowIds = [];
            if (checked) {
                list.forEach((element, index) => {
                    rowIds[index] = element.id;
                });
                this.selected = rowIds;
            } else {
                this.selected = [];
            }
        },
        resetMarkedRows() {
            this.selected = [];
        },
        /**
         * set table's current options to store and call api to get data
         * @param options - table's current options
         */
        updateTable(options) {
            this.$store.commit(this.statename+'/setPagination', {
                query: options.search,
                page: options.page,
                limit: options.itemsPerPage,
                orderBy: options.sortBy[0],
                ascending: options.sortDesc[0],
                filter: options.filter != '' && options.filter != undefined ? JSON.stringify(options.filter) : '',
            });
            this.getData();
        },
        /**
         * reset pagination data but except filter
         */
        resetPagination(){
            this.$store.commit(this.statename+'/setPagination', {
                query: '',
                page: 1,
                limit: this.state.pagination.limit,
                orderBy: this.state.pagination.orderBy,
                ascending: this.state.pagination.ascending,
                filter: this.state.pagination.filter,
            });
        },
        /**
         * call api to get data
         */
        getData(){
            this.$store.dispatch(this.statename+'/getAll',this.state.pagination).then(response => {
                this.$store.commit(this.statename+'/setTableData', response.data);
                }, error => {
                this.$store.commit(this.statename+'/setTableData', []);
                console.log(error);
            });
        },
        /**
         * reset pagination data but except filter and get data
         */
        refresh(){
            this.resetPagination();
            this.getData();
        },
    }
});
