<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize"> {{ refs }}

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
                            <li class="breadcrumb-item text-capitalize">
                                <router-link :to="{ name: refs }">{{ refs }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <div v-if="pgLoading" class="row h-100">
            <div class="container text-center">
                <div class="spinner-grow mt-5" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        
                    <div class="col-md-12 mb-5">


                    <!-- Card -->
                    <div class="card">
                        <div class="card-body">
                            <div class="accordion">
                                <div class="col-12 pt-3">

                                    <p><i>* please use , to sperate values</i></p>

                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1">Title</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText1"  
                                            rows="5" 
                                            v-model="row.title">
                                        </textarea>
                                    </div>
                                    <!-- End Title -->

                                    <!-- Artist -->
                                    <div class="form-group">
                                        <label for="inputText2">Artist</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText2"  
                                            rows="5" 
                                            v-model="row.artist">
                                        </textarea>
                                    </div>
                                    <!-- End Artist -->

                                    <!-- Year -->
                                    <div class="form-group">
                                        <label for="inputText3">Year</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText3"  
                                            rows="5" 
                                            v-model="row.year">
                                        </textarea>
                                    </div>
                                    <!-- End Year -->

                                    <!-- Comments -->
                                    <div class="form-group">
                                        <label for="inputText4">Comments</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText4"  
                                            rows="5" 
                                            v-model="row.comments">
                                        </textarea>
                                    </div>
                                    <!-- End Comments -->

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End CarDMeta -->

                    </div>
                    <!-- End Card -->

                </div>
            </div>
            <!-- End Content -->

                    

                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading" class="text-capitalize"> Update</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-danger" 
                                :disabled="btnLoading" 
                                @click="cancel">
                                <span class="ti-close"></span>
                                <span> Cancel </span>
                            </button>
                        </div>
                    </div>

                </form>
            </div>


                <Footer></Footer>
            </div>
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
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                //
                row: {
                    title: '',
                    artist: '',
                    year: '',
                    comments: '',
                },

                pgLoading: true,
                btnLoading: false,

                refs: 's1'
            }
        },
        mounted() {},
        computed: {},
        created() {
            //
            this.fetchRow();
        },
        methods: {
            
            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    //'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    // row
                    this.row.title = res.data.row.title;
                    this.row.artist = res.data.row.artist;
                    this.row.year = res.data.row.year;
                    this.row.comments = res.data.row.comments;

                    })
                    .catch(() => {})
                    .finally(() => {});
            },


            // edit Row
            editRow(){
                    this.btnLoading = true;
                    this.axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                        //'Authorization': `Bearer ` + this.auth.access_token,
                    };
                    const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                    const options = {
                        url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                        method: 'PUT',
                        data: {
                            title: this.row.title,
                            artist: this.row.artist,
                            year: this.row.year,
                            comments: this.row.comments
                        }
                    }
                    this.axios(options, config)
                        .then(() => {
                            this.btnLoading = false;
                            iziToast.success({
                                icon: 'ti-check',
                                title: 'Great job,',
                                message: 'Item Updated Successfully.',
                            });
                            this.$router.push({ name: this.refs });
                        })
                        .catch(err => {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: (err.response) ? err.response.data.message : 'Something went wrong'
                            });
                        })
                        .finally(() => {})
            },

            
            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: this.refs });
                }
            },

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
