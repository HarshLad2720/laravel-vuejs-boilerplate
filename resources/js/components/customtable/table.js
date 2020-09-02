import Vue from 'vue';
import _debounce from "lodash.debounce";

export default Vue.extend({
    name:'CustomTable',
    data() {
        return {
            loading: false,
            singleSelect: false,
            selected: [],
            stateName:"",
            urlApi:"",
            searchModel:"",
            filterModel: {},
            headers:[],
            options: {},
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
            var urlArray = this.urlApi != '' ? this.urlApi.split('/') : '';
            this.stateName = urlArray[0];
            return this.$store.state[this.stateName];
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
        onUpdateOptions() {
            return _debounce(this.updateTable, 100);
        },
        onSearch() {
            return _debounce(this.updateTable, 500);
        }
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
            var tableOptions = this.$refs.table.options;
            this.$store.commit(this.stateName+'/setPagination', {
                query: this.searchModel,
                page: tableOptions.page,
                limit: tableOptions.itemsPerPage,
                orderBy: tableOptions.sortBy.length> 0 ? tableOptions.sortBy[0] : '',
                ascending: tableOptions.sortDesc.length> 0 ? tableOptions.sortDesc[0] : '',
                filter: this.filterModel != '' && this.filterModel != undefined ? encodeURIComponent(JSON.stringify(this.filterModel)) : '',
            });
            this.getData();
        },
        /**
         * reset pagination data but except filter
         */
        resetPagination(){
            this.$store.commit(this.stateName+'/setPagination', {
                query: this.searchModel,
                page: 1,
                limit: this.state.pagination.limit,
                orderBy: this.state.pagination.orderBy,
                ascending: this.state.pagination.ascending,
                filter: this.filterModel != '' && this.filterModel != undefined ? encodeURIComponent(JSON.stringify(this.filterModel)) : '',
            });
        },
        /**
         * call api to get data
         */
        getData(){
            if(this.$refs.table && this.urlApi && this.urlApi != '') {
                this.$store.dispatch(this.urlApi, this.state.pagination).then(response => {
                    this.$store.commit(this.stateName + '/setTableData', response.data);
                }, error => {
                    this.$store.commit(this.stateName + '/setTableData', []);
                    console.log(error);
                });
            }
        },
        /**
         * reset pagination data but except filter and get data
         */
        refresh(){
            if(this.$refs.table && this.urlApi && this.urlApi != '') {
                this.resetPagination();
                this.getData();
            }
        },
    }
});
