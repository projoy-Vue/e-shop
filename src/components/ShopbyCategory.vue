<template>
  <section class="category-section">
    <div class="section-heading">
      <h2 class="section-title">Shop by Category</h2>
      <p class="section-description">
        Explore our curated collections
      </p>
    </div>

    <div class="category-grid">
      <router-link 
        v-for="category in categories"
        :key="category.id"
        :to="`/category/${category.name}`"
        class="category-card"
      >
        <div class="image-container">
          <img 
            :src="getImage(category.image)"
            :alt="category.name"
            class="category-image"
          >
          <div class="category-overlay">
            <h3 class="category-name">{{ category.name }}</h3>
            <button class="shop-now">Shop Now</button>
          </div>
        </div>
      </router-link>
    </div>
    
  
    <router-link :to="{ path: `/category/${categoryName}` }"class="browse-all">
      Browse All Categories
    </router-link>
  </section>
</template>
<script>
export default {
  data() {
    return {
      categoryName: 'all'
    }
  },
  computed: {
    categories() {
      return this.$store.getters['products/categories']
    }
  },
  methods: {
    getImage(image) {
      return new URL(image, import.meta.url).href
    }
  }

}
</script>

<style scoped>
.category-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.section-heading {
  text-align: center;
  margin-bottom: 3rem;
}

.section-heading h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  margin: 0;
}

.section-heading h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #2c3e50;
  transition: width 0.3s ease;
}

.section-heading h2:hover::after {
  width: 100px;
}

.section-description {
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #6c757d;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.category-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  aspect-ratio: 1/1;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image {
  transform: scale(1.05);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.category-name {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0 1rem;
}

.shop-now {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.category-card:hover .shop-now {
  opacity: 1;
  transform: translateY(0);
}

.browse-all {
  display: block;
  width: max-content;
  margin: 2rem auto 0;
  padding: 1rem 2.5rem;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.browse-all:hover {
  background: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .section-heading h2 {
    font-size: 2rem;
  }

  .category-name {
    font-size: 1.2rem;
  }

  .shop-now {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .category-section {
    padding: 2rem 1rem;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .browse-all {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
}
</style>