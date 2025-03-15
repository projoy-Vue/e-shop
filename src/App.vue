<template>
  <div id="app">
    <nav>
      <AppHeader></AppHeader>
    </nav>
    <router-view></router-view>
    <footer>
      <AppFooter></AppFooter>
    </footer>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapGetters('cart', ['cartItemCount'])
  },
 
}
</script>
