<template>
    <div class="">
        <Header></Header>

        <main class="u-main">
            <Navigation></Navigation>

                <div class="u-content">
                    <div class="u-body" style="min-height: 700px">
                        <div class="row">
                            
                        </div>
                    </div>
                </div>

            <Footer></Footer>
        </main>
        
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';

    export default {
        name: 'App',
        components: {
            Header,
            Navigation,
            Footer,
        },
        data(){
            return {
                //
            }
        },
        mounted() {},
        created() {
            //
        },
        methods: {
            //
        },
    }
</script>
