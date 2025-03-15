import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import ProductList from '../components/ProductList.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'
 import CategoryPage from '../components/CategoryPage.vue'
// import NotFoundView from '../views/NotFoundView.vue'

const routes = [
{path : '/', component: HomePage},
  { path : '/products', component: ProductList },
    { path: '/product/:id', component: ProductDetails },
    { path: '/cart', component: ShoppingCart },
    { path: '/checkout', component: CheckoutPage },
     { path: '/category/:name', component: CategoryPage },
    { path: '/order-confirmed', component: OrderConfirmation }
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
