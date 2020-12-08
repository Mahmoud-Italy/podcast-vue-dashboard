import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
  
  /** Dashboard **/

  // App
  { path: '/',  name: 'dashboard', component: require('../components/layouts/App.vue').default, beforeEnter: requireAuth },

  // S1
  { path: '/s1', name: 's1', component: require('../components/s1/List.vue').default, beforeEnter: requireAuth },
  { path: '/s1/create', name: 'create-s1', component: require('../components/s1/Create.vue').default, beforeEnter: requireAuth },
  { path: '/s1/:id/edit', name: 'edit-s1', component: require('../components/s1/Edit.vue').default, beforeEnter: requireAuth },

  // S2
  { path: '/s2', name: 's2', component: require('../components/s2/List.vue').default, beforeEnter: requireAuth },
  { path: '/s2/create', name: 'create-s2', component: require('../components/s2/Create.vue').default, beforeEnter: requireAuth },
  { path: '/s2/:id/edit', name: 'edit-s2', component: require('../components/s2/Edit.vue').default, beforeEnter: requireAuth },

  // S3
  { path: '/s3', name: 's3', component: require('../components/s1/List.vue').default, beforeEnter: requireAuth },
  { path: '/s3/create', name: 'create-s3', component: require('../components/s1/Create.vue').default, beforeEnter: requireAuth },
  { path: '/s3/:id/edit', name: 'edit-s3', component: require('../components/s1/Edit.vue').default, beforeEnter: requireAuth },

  // new
  { path: '/new', name: 'new', component: require('../components/new/List.vue').default, beforeEnter: requireAuth },

  // Errors
  { path: '/*', name: 'not-found', component: require('../components/errors/NotFound.vue').default }

  ]
})


function requireAuth(to, from, next) {
  // if(!localStorage.getItem('access_token')) { next('/login'); }
  // else { next(); }
  next();
}

// function requireUnAuth(to, from, next) {
//   if(localStorage.getItem('access_token')) { next('/'); }
//   else { next(); }
// }