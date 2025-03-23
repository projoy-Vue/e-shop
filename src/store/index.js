import { createStore } from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import reviews from './modules/reviews';
import deals from './modules/deals';

const store = createStore({
  modules: {
    cart,
    products,
    reviews,
    deals
  }
})

export default store
