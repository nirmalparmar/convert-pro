import { createRouter, createWebHistory } from 'vue-router'
import Contact from '../views/Contact.vue'

const DEFAULT_TITLE = 'Convert Pro - Free CSV, JSON, SVG Converter!'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'home',
      redirect: '/json-diff'

    },
    {
      path: '/csv-to-json',
      name: 'csv-to-json',
      meta: {
        title: 'Convert Pro - CSV to JSON',
      },
      component: () => import('../views/ConvertCSVtoJSON.vue') 
    },
    {
      path: '/json-to-csv',
      name: 'json-to-csv',
      meta: {
        title: 'Convert Pro - JSON to CSV',
      },
      component: () => import('../views/ConvertJSONtoCSV.vue')
    },
    {
      path: '/jsonformatter',
      name: 'jsonformatter',
      meta: {
        title: 'JSON Formatter',
      },
      component: () => import('../views/JsonFormatter.vue')
    },
    {
      path: '/json-diff',
      name: 'json-diff',
      meta: {
        title: 'JSON Diff Checker - Convert - Pro',
      },
      component: () => import('../views/JsonDiffChecker.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {
        title: 'Convert Pro - Contact',
      },
      component: Contact
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE
})

export default router
