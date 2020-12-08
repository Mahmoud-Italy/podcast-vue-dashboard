<template>
    <div class="">
        
        <!-- Sidebar -->
        <aside id="sidebar" class="u-sidebar">
            <div class="u-sidebar-inner" style="min-height: 700px">

                <!-- Sidebar Header -->
                <header class="u-sidebar-header">
                    <router-link :to="{ name: 'dashboard'}" class="u-sidebar-logo">
                        <img class="u-sidebar-logo__icon" src="/assets/svg/logo-mini.svg" alt="">
                        <img class="u-sidebar-logo__text" src="/assets/svg/logo-text-light.svg" alt="">
                    </router-link>
                </header>
                <!-- End Sidebar Header -->

                <!-- Sidebar Nav -->
                <nav class="u-sidebar-nav">

                    <!-- Sidebar Nav Menu -->
                    <ul class="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'dashboard' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Dashbaord</span>
                            </router-link>
                        </li>

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 's1' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/s1') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">S1</span>
                            </router-link>
                        </li>

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 's2' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/s2') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">S2</span>
                            </router-link>
                        </li>

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'dashboard' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/s3') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">S3</span>
                            </router-link>
                        </li>

                        

                        <li class="u-sidebar-nav-menu__item"></li>
                        <br/><br/><br/><br/><br/><br/>

                    </ul>
                    <!-- End Sidebar Nav Menu -->
                </nav>
                <!-- End Sidebar Nav -->

            </div>
        </aside>
        <!-- End Sidebar -->

    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data(){
            return {
                //
                pgLoading: false,
                path: '/',
            }
        },
        mounted() {},
        watch: {},
        created() {
            // Path
            if(this.$route.path) {
                this.path = this.$route.path;
            }

            //
        },
        methods: {
            //

            onChangeNav(e){
                if(this.$refs['itemComponent'+e].classList.contains('u-sidebar-nav--opened')) {
                    this.$refs['itemComponent'+e].classList.remove('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'none';
                } else {
                    this.$refs['itemComponent'+e].classList.add('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'block';
                }
            },

        },
    }
</script>
