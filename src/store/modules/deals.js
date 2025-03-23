export default {
    state: {
      deals: [],
      dealCategories: ['All', 'Electronics', 'Fashion', 'Home', 'Beauty']
    },
    mutations: {
      SET_DEALS(state, deals) {
        state.deals = deals.map(deal => ({
          ...deal,
          originalPrice: deal.price * 1.2, // Calculates original price based on 20% discount
          discount: 20, // Sets a fixed discount value
          expiresAt: '2024-02-20T23:59:59' // Fixed expiration date
        }))
      }
    },
    getters: {
      activeDeals: state => state.deals.filter(deal => 
        new Date(deal.expiresAt) > new Date()
      )
    },
    actions: {
      async fetchDeals({ commit }) {
        try {
          const response = await fetch('/deals.json') // Loads from public folder
          const data = await response.json()
          commit('SET_DEALS', data)
        } catch (error) {
          console.error('Failed to load deals:', error)
        }
      }
    }
  }
  