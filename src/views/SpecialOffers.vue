<template>
    <div>
      <h1>Special Offers</h1>
      <SpecialOffers />
      <!-- Your content for special offers -->
       <ProductCarousel />
    </div>
  </template>
  
  <script>
  import SpecialOffers from '../components/SpecialOffers.vue';
  import ProductCarousel from '../components/ProductCarousel.vue';
  export default {
    components: {
      SpecialOffers,
      ProductCarousel
    }
  };
  </script>
  