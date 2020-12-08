<template>
    <div class="">
        <Header></Header>

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
                                        <th style="width: 5%"></th>
                                        <th style="width:10%">Key</th>
                                        <th class="text-center" style="width: 60%">Values</th>
                                        <th class="text-center" style="width: 10%">Actions</th>
                                    </tr>
                                </thead>

                                <tbody v-if="dataLoading">
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            <div class="spinner-grow" role="status">
                                              <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && !rows">
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            <span>No results found.</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && rows">
                                    <tr v-for="(value, key) in rows" 
                                        :key="key" 
                                        class="f14">
                                    <td></td>

                                    <td class="font-weight-semi-bold">
                                        {{ key }}
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                       <span v-if="rows[key]">
                                           <label class="badge badge-danger btn-sm" 
                                                style="margin-right: 5px" 
                                                v-for="(row, idx) in rows[key]"
                                                :key="idx">
                                                {{ row }}
                                            </label>
                                        </span>
                                    </td>
                                    
                                    <td class="text-center">
                                        
                                    </td>
                                </tr>
                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Key</th>
                                        <th class="text-center">Values</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>


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
    
    export default {
        name: 'List',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                //
                data: [],
                rows: [],
                selected: [],
                selectAll: false,
                dataLoading: true,
                pagination: {},
                refs: 'new'
            }
        },
        mounted() {},
        created() {
            //
            this.fetchData();
        },
        methods: {

            // Fetch Data
            fetchData(page_url, loading=false) {
                if(loading) { this.dataLoading = true; }

                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    //'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: page_url || window.baseURL+'/s3',
                    method: 'GET',
                    data: {},
                    params: {
                        search: this.search
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.rows = JSON.parse(res.data);
                    })
                    .catch(() => {})
                    .finally(() => {})
            },



            // ON Select
            select() {
                this.selected = [];
                  if (!this.selectAll) {
                    for (let i in this.rows) {
                      this.selected.push(this.rows[i].id);
                    }
                }
            },

        },
    }
</script>
