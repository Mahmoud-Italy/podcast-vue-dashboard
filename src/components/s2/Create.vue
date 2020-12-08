<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}

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
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        
                    <div class="col-md-12 mb-5">


                    <!-- Card -->
                    <div class="card">
                        <div class="card-body">
                            <div class="accordion">
                                <div class="col-12 pt-3">

                                    <!-- Languages -->
                                    <div class="form-group">
                                        <label for="inputText1">Languages</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText1"  
                                            rows="5" 
                                            v-model="row.languages">
                                        </textarea>
                                    </div>
                                    <!-- End Languages -->

                                    <!-- Encoding -->
                                    <div class="form-group">
                                        <label for="inputText2">Encoding tool</label>
                                        <textarea 
                                            class="form-control"
                                            id="inputText2"  
                                            rows="5" 
                                            v-model="row.tncoding_tool">
                                        </textarea>
                                    </div>
                                    <!-- End Encoding -->

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
                                <span v-if="!btnLoading" class="text-capitalize"> Create</span>
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
        name: 'Create',
        components: {
            Header,
            Navigation,
            Footer,
        },
        data(){
            return {
                //
                row: {
                    languages: '',
                    encoding_tool: '',
                },

                pgLoading: false,
                btnLoading: false,

                refs: 's2'
            }
        },
        mounted() {},
        computed: {},
        created() {
            //
        },
        methods: {
     
            // Add New
            addNew(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    //'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/'+this.refs,
                    method: 'POST',
                    data: {
                        languages: this.row.languages,
                        encoding_tool: this.row.encoding_tool,
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Added Successfully.',
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
