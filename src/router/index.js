import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import ProductList from '../components/ProductList.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'
import CategoryPage from '../components/CategoryPage.vue'
import NewArrivals from '../views/NewArrivals.vue'
import SpecialOffers from '../views/SpecialOffers.vue'
// import NotFoundView from '../views/NotFoundView.vue'
const routes = [
  { path: '/', component: HomePage },
  { path: '/products', component: ProductList },
  { path: '/product/:id', component: ProductDetails },
  { path: '/cart', component: ShoppingCart },
  { path: '/checkout', component: CheckoutPage },
  { path: '/category/:name', component: CategoryPage },
  { path: '/order-confirmed', component: OrderConfirmation },
  { path: '/new', component: NewArrivals 
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/deals', component: SpecialOffers },
  {path: '/account', component: () => import('../views/AccountView.vue')},
  { path: '/about', component: () => import('../views/AboutView.vue')},
  { path: '/contact', component: () => import('../views/ContactView.vue')}
  // {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: NotFoundView
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
