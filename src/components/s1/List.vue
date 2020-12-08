<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize"> {{ refs }}
                        <router-link
                            :to="{ name: 'create-'+refs }" 
                            class="btn btn-primary btn-sm btn-pill ui-mt-10 ui-mb-2">
                            <span>Add New</span>
                        </router-link>

                        <!-- Role -->
                        <div class="pull-rights ui-mt-15 pull-right">
                            <span class="badge badge-md badge-pill badge-success-soft text-lowercase">
                                root
                            </span>
                        </div>
                        <!-- End Role -->
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize active" aria-current="page">
                                {{ refs }}
                            </li>
                        </ol>
                    
                        <!-- Bulk Action -->
                        <div class="pull-rights ui-mt-50 pull-right">
                            <div class="dropdown display-flex-inline">
                                <div class="dropdown ui-mr5">
                                    <button type="button" 
                                        class="btn btn-danger btn-sm dropdown-toggle" 
                                        data-toggle="dropdown"
                                        aria-haspopup="true" 
                                        aria-expanded="false" 
                                        :disabled="bulkLoading">
                                        <span v-if="!bulkLoading">Bulk Actions</span>
                                        <span v-if="bulkLoading">
                                            <span class="spinner-grow spinner-grow-sm mr-1" 
                                                role="status" aria-hidden="true"></span>Loading...
                                        </span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a @click="multiDeletePermanently()"
                                            class="dropdown-item" href="javascript:;">Delete Permanently
                                        </a>
                                    </div>
                                </div>

                                <div class="dropdown">
                                    <button type="button" 
                                        class="btn btn-secondary btn-sm dropdown-toggle" 
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false" 
                                        :disabled="exportLoading">
                                        <span v-if="!exportLoading">Export</span>
                                        <span v-if="exportLoading">
                                            <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true"></span>Loading...
                                        </span>
                                    </button>
                                    <div class="dropdown-menu" 
                                        aria-labelledby="dropdownMenuButton">
                                        <download-excel
                                            class = "dropdown-item cursor-pointer"
                                            :fetch = "fetchExport"
                                            :fields = "exp.json_fields"
                                            :before-generate = "startDownload"
                                            :before-finish = "finishDownload"
                                            :worksheet = "refs"
                                            :name = "refs+'.xls'">Excel
                                        </download-excel>
                                        <download-excel
                                            class = "dropdown-item cursor-pointer"
                                            :fetch = "fetchExport"
                                            :fields = "exp.json_fields"
                                            :before-generate = "startDownload"
                                            :before-finish = "finishDownload"
                                            type = "csv"
                                            :worksheet = "refs"
                                            :name = "refs+'.xls'">CSV
                                        </download-excel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Bulk Action -->
                    </nav>
                    <!-- End Breadcrumb -->


                <!-- Card -->
                <div class="card">

                    <!-- Header -->
                    <header class="card-header">
                        
                    </header>
                    <!-- End Header -->

                    <!-- Body -->
                    <div class="card-body pt-0">
                        <div class="table-responsive">
                            <table id="printMe" class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">
                                            <div class="custom-control custom-checkbox">
                                                <input id="expBox0" 
                                                    class="custom-control-input" 
                                                    type="checkbox"
                                                    v-model="selectAll" 
                                                    @click="select">
                                                <label class="custom-control-label" for="expBox0"></label>
                                            </div>
                                        </th>
                                        <th style="width:15%">Title</th>
                                        <th class="text-center" style="width: 15%">Arists</th>
                                        <th class="text-center" style="width: 10%">Years</th>
                                        <th class="text-center" style="width: 30%">Comments</th>
                                        <th class="text-center" style="width: 10%">Actions</th>
                                    </tr>
                                </thead>

                                <tbody v-if="dataLoading">
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <div class="spinner-grow" role="status">
                                              <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && !rows.length">
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <span>No results found.</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && rows.length">
                                    <tr v-for="(row, index) in rows" 
                                        :key="index" 
                                        class="f14">
                                    
                                    <td class="font-weight-semi-bold">
                                        <div class="custom-control custom-checkbox">
                                            <input :id="'expBox'+row.id" 
                                                class="custom-control-input" 
                                                type="checkbox" 
                                                v-model="selected" :value="row.id">
                                            <label class="custom-control-label" :for="'expBox'+row.id">
                                            </label>
                                        </div>
                                    </td>

                                    <td class="font-weight-semi-bold">
                                        <p v-if="row.title.length">
                                            <label class="badge badge-primary btn-sm" 
                                                style="margin-right: 5px" 
                                                v-for="(title, idx) in row.title"
                                                :key="idx">
                                                {{ title }}
                                            </label>
                                        </p>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                       <p v-if="row.artist.length">
                                            <label class="badge badge-success btn-sm" 
                                                style="margin-right: 5px" 
                                                v-for="(artist, idx) in row.artist"
                                                :key="idx">
                                                {{ artist }}
                                            </label>
                                        </p>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                       <p v-if="row.year.length">
                                            <label class="badge badge-danger btn-sm" 
                                                style="margin-right: 5px" 
                                                v-for="(year, idx) in row.year"
                                                :key="idx">
                                                {{ year }}
                                            </label>
                                        </p>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                       <p v-if="row.comments.length">
                                            <label class="badge badge-primary btn-sm" 
                                                style="margin-right: 5px" 
                                                v-for="(comments, idx) in row.comments"
                                                :key="idx">
                                                {{ comments }}
                                            </label>
                                        </p>
                                    </td>
                                    
                                    <td class="text-center">
                                        <div class="dropdown">
                                            <a id="tableWithImage1MenuInvoker" 
                                                class="u-icon-sm link-muted" 
                                                href="javascript:;" 
                                                role="button" 
                                                aria-haspopup="true" 
                                                aria-expanded="false"
                                                data-toggle="dropdown"
                                                data-offset="8">
                                                <span v-if="!row.loading" class="ti-more"></span>
                                                <span v-if="row.loading" 
                                                    class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true">
                                                </span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" 
                                                style="width: 150px">
                                                <div class="card border-0 p-3">
                                                    <ul class="list-unstyled mb-0">
                                                        <li v-if="!row.trash">
                                                            <router-link
                                                                class="d-block link-dark"
                                                                :to="{ name: 'edit-'+refs, 
                                                                params:{id: row.encrypt_id}}">
                                                                Edit
                                                            </router-link>
                                                        </li>
                                                        <li>
                                                            <a @click="row.loading = true; 
                                                                deletePermanently(row.id)"
                                                                class="d-block link-dark" 
                                                                href="javascript:;">Delete Permanently
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>
                                            <div class="custom-control custom-checkbox">
                                                <input id="expBox0" class="custom-control-input" type="checkbox"
                                                    v-model="selectAll" @click="select">
                                                <label class="custom-control-label" for="expBox0"></label>
                                            </div>
                                        </th>
                                        <th>Title</th>
                                        <th class="text-center">Arists</th>
                                        <th class="text-center">Years</th>
                                        <th class="text-center">Comments</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                    <!-- Paginate -->
                    <nav  v-if="rows.length !== 0" 
                        aria-label="Page navigation example ui-mt20">
                        <ul class="pagination">
                            <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
                                <a class="page-link" href="javascript:" 
                                    @click="fetchData(pagination.prev_page_url, true)">Previous</a>
                            </li>
                            <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
                                <a class="page-link" href="javascript:" 
                                    @click="fetchData(pagination.next_page_url, true)">Next</a>
                            </li>
                        </ul>
                        <p class="pull-right ui-mt-50 f13">
                            <i>Page {{ pagination.current_page }} or {{ pagination.last_page }}</i>
                        </p>
                    </nav>
                    <!-- End Paginate -->

                    </div>
                </div>
            </div>
            <!-- End Content Body -->

            <Footer></Footer>
        </div>
        <!-- Content -->

        </main>
        <!-- End Main -->
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import iziToast from 'izitoast';
    
    export default {
        name: 'List',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                // export
                exp: {
                   json_fields: {
                        'id': 'id',
                        'title' : 'title',
                        'artist': 'artist',
                        'year': 'year',
                        'component': 'component',
                        'created_at': 'created_at',
                    }, 
                    json_data: [],
                    json_meta: [
                        [{
                            'key': 'charset',
                            'value': 'utf-8'
                        }]
                    ],
                },

                //
                search: '',
                status: '',
                selected: [],
                selectAll: false,

                dataLoading: true,
                bulkLoading: true,
                exportLoading: true,
                rows: [],
                show: 10,
                pagination: {},
                refs: 's1'
            }
        },
        mounted() {},
        watch: {
          $route() {
            //
            this.fetchData('', true);
          }
        },
        created() {
            //
            this.fetchData();
        },
        methods: {

            onSearchSubmit(value) {
                this.search = value;
                this.fetchData('', true);
            },

            onShow(show){
                this.showLoading = true;
                this.show = show;
                this.fetchData('', true);
            },

        
            // Fetch Data
            fetchData(page_url, loading=false) {
                if(loading) { this.dataLoading = true; }
                this.something_went_wrong = false;
                this.plural = '',
                this.selectAll = false;
                this.selected = [];

                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    //'Authorization': `Bearer ` + this.auth.access_token,
                };
                let vm = this;
                const options = {
                    url: page_url || window.baseURL+'/'+this.refs,
                    method: 'GET',
                    data: {},
                    params: {
                        search: this.search
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.bulkLoading = false;
                        this.exportLoading = false;
                        this.showLoading = false;

                        this.rows = res.data.rows;
                        if(res.data.paginate.total) {
                            vm.makePagination(res.data.paginate);
                        }
                    })
                    .catch(() => {})
                    .finally(() => {})
            },

            // Pagination
            makePagination(meta) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    next_page_url: meta.next_page_url,
                    prev_page_url: meta.prev_page_url
                }
                this.pagination = pagination;
            },

            // Fetch Export to Excel, CSV
            async fetchExport(){
                const res = await 
                    this.axios.post(window.baseURL+'/'+this.refs+'/export?id='+this.selected);
                return res.data.rows;
            },
            startDownload(){
                this.exportLoading = true;
            },
            finishDownload(){
                this.exportLoading = false;
                iziToast.success({
                    icon: 'ti-check',
                    title: 'Great job,',
                    message: 'File Generated Successfully',
                });
            },


        /** Bulk Actions **/
          // ON Select
          select() {
            this.selected = [];
              if (!this.selectAll) {
                for (let i in this.rows) {
                  this.selected.push(this.rows[i].id);
                }
              }
            },


            // Multi Delete Permanently
            multiDeletePermanently(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.deletePermanently(this.selected.join());
                }
            },

            // Delete Permanently
            deletePermanently(id) {
                if(confirm('Are You Sure?')) {
                    this.axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                        //'Authorization': `Bearer `+this.auth.access_token,
                    };
                    const options = {
                        url: window.baseURL+'/'+this.refs+'/'+id,
                        method: 'DELETE',
                        data: {},
                    }
                  this.axios(options)
                    .then(() => {
                      this.fetchData(); 
                      iziToast.success({
                          icon: 'ti-check',
                          title: 'Great job,',
                          message: 'Item'+this.plural+' Deleted Permanently Successfully',
                      });
                        
                    })
                    .catch(() => {
                        this.fetchData(); 
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    })
                    .finally(() => {});
                } else { 
                    // In case Cancel Alert
                    this.fetchData(); 
                }
            },
        /** END Bulk Actions **/

        },
    }
</script>
