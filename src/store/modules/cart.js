export default {
    namespaced: true,

    state: {
      items: []
    },
    mutations: {
      ADD_TO_CART(state, product) {
        const existing = state.items.find(item => item.id === product.id)
        if (existing) {
          existing.quantity++
        } else {
          state.items.push({ ...product, quantity: 1 })
        }
      },
      REMOVE_FROM_CART(state, productId) {
        state.items = state.items.filter(item => item.id !== productId)
      }
    },
    getters: {
      cartItems: state => state.items, // Add this getter
      cartTotal: state => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      cartItemCount: state => {
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    },
    actions: {
      addToCart({ commit }, product) {
        commit('ADD_TO_CART', product)
      },
      removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId)
      },
      async checkout({ commit, state }, orderData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (state.items.length === 0) {
              reject(new Error('Cart is empty'))
              return
            }
            
            // In real app, send orderData to your backend
            console.log('Processing order:', orderData)
            
            commit('CLEAR_CART')
            resolve()
          }, 1000)
        })
      }
    }


    

  }