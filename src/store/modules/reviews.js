import reviewsData from '@/assets/reviews.json';

const state = {
  reviews: []
};

const getters = {
  allReviews: (state) => state.reviews
};

const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  }
};

const actions = {
  loadReviews({ commit }) {
    commit('SET_REVIEWS', reviewsData);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
