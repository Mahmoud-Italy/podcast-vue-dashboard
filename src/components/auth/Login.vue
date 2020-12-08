<template>
    <div class="">
        
        <!-- Main -->
        <main class="d-flex flex-column u-hero u-hero--end mnh-100vh" 
            style="background-image: url(/assets/img-temp/bg/bg-1.png)">

            <div class="container py-7 my-auto">
                <div class="d-flex align-items-center justify-content-center">
                    
                    <!-- Card -->
                    <div class="card my-7" style="width: 460px; max-width: 100%;">
                        <div class="card-body p-4 p-lg-7">
                            <h2 class="text-center mb-4">Log in</h2>

                            <!-- Log in Form -->
                            <form @submit.prevent="login">
                                <!-- Email Address -->
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input id="email" 
                                        class="form-control" 
                                        type="text" 
                                        v-model="row.email" 
                                        placeholder="Email Address">
                                </div>
                                <!-- End Email Address -->
                                
                                <!-- Password -->
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" 
                                        class="form-control" 
                                        type="password" 
                                        v-model="row.password" 
                                        placeholder="Password" 
                                        autocomplete="off">
                                </div>
                                <!-- End Password -->

                                <!-- Remember Me -->
                                <div class="d-flex align-items-center justify-content-between my-4">
                                    <div class="custom-control custom-checkbox">
                                        <input id="rememberMe" 
                                            class="custom-control-input" 
                                            type="checkbox">
                                        <label class="custom-control-label text-dark" 
                                            for="rememberMe">Remember me
                                        </label>
                                    </div>
                                    <!-- Forgot Password -->

                                <router-link :to="{ name: 'forget' }" 
                                    class="font-weight-semi-bold">Forgot password?
                                </router-link>

                                </div>
                                <!-- End Remember Me -->

                                <!-- Form button -->
                                <button type="submit" class="btn btn-block btn-wide btn-primary text-uppercase"
                                    :disabled="btnLoading">
                                    <span v-if="btnLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true"></span>Loading...
                                    </span>
                                    <span v-if="!btnLoading">Login</span>
                                </button>
                                <!-- End Form button -->

                            </form>
                            <!-- End Log in Form -->
                        </div>
                    </div>
                    <!-- End Card -->

                </div>
            </div>

            <Footer></Footer>
        </main>
        <!-- End Main -->

    </div>
</template>

<script>
    import Footer from '../layouts/Footer.vue';
    import iziToast from 'izitoast';

    export default {
        name: 'Login',
        components: {
            Footer
        },
        data(){
            return {
                row: {
                    email: '',
                    password: '',
                    keepMeAlive: false,
                },

                btnLoading: false,
            }
        },
        mounted() {},
        methods: {

            // Keep me alive
            keepMeAlive() {
                //
            },

            // doLogin
            login(){
                //
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>