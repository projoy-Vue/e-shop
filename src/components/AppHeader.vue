<template>
    <header class="app-header">
      <div class="header-container">
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
  
        <!-- Logo -->
        <router-link to="/" class="logo">
          <img src="@/assets/logo.svg" alt="E-Shop Logo">
          <span>E-Shop</span>
        </router-link>
  
        <!-- Category Dropdown -->
        <div class="category-dropdown">
          <button class="dropdown-toggle" @click="isCategoryOpen = !isCategoryOpen">
            Categories ▾
          </button>
          <transition name="slide-down">
            <div v-show="isCategoryOpen" class="dropdown-menu">
              <router-link 
                v-for="category in categories" 
                :key="category" 
                :to="`/category/${category}`"
                @click="isCategoryOpen = false"
              >
                {{ category }}
              </router-link>
            </div>
          </transition>
        </div>
  
        <!-- Search Bar -->
        <div class="search-bar">
          <form @submit.prevent="performSearch">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search products..."
              @input="updateSearchQuery"
            >
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
  
        <!-- Navigation Links -->
        <nav class="main-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
          <router-link to="/new">New Arrivals</router-link>
          <router-link to="/deals">Special Offers</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/contact">Contact</router-link>
          
          <!-- Account Dropdown -->
          <div class="account-dropdown">
            <button class="account-toggle" @click="isAccountOpen = !isAccountOpen">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <transition name="slide-down">
              <div v-show="isAccountOpen" class="dropdown-menu">
                <router-link to="/account">My Account</router-link>
                <router-link to="/orders">My Orders</router-link>
                <a href="#" @click="logout">Logout</a>
              </div>
            </transition>
          </div>
  
          <!-- Cart -->
          <router-link to="/cart" class="cart-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="cart-count">{{ cartItemCount }}</span>
          </router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import { mapGetters, mapMutations } from 'vuex'
  
  export default {
    data() {
      return {
        isCategoryOpen: false,
        isAccountOpen: false,
        isMobileMenuOpen: false,
        searchQuery: ''
      }
    },
    computed: {
      ...mapGetters('cart', ['cartItemCount']),
      ...mapGetters('products', ['categories'])
    },
    methods: {
      ...mapMutations('products', ['SET_SEARCH_QUERY']),
      
      updateSearchQuery() {
        this.SET_SEARCH_QUERY(this.searchQuery)
      },
      
      performSearch() {
        if (this.$route.path !== '/products') {
          this.$router.push('/products')
        }
      },
      
      logout() {
        // Implement logout logic
      },
      
      closeDropdowns(event) {
        if (!event.target.closest('.category-dropdown')) {
          this.isCategoryOpen = false
        }
        if (!event.target.closest('.account-dropdown')) {
          this.isAccountOpen = false
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.closeDropdowns)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeDropdowns)
    }
  }
  </script>
  
  <style scoped>
  .app-header {
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1000;
  }
  
  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .logo img {
    height: 40px;
  }
  
  .category-dropdown {
    position: relative;
  }
  
  .dropdown-toggle {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 500;
    color: #2c3e50;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 4px;
    min-width: 200px;
    z-index: 1000;
  }
  
  .dropdown-menu a {
    display: block;
    padding: 0.75rem 1rem;
    color: #2c3e50;
    text-decoration: none;
  }
  
  .dropdown-menu a:hover {
    background: #f8f9fa;
  }
  
  .search-bar {
    flex: 1;
    max-width: 500px;
  }
  
  .search-bar form {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border-radius: 25px;
    padding: 0.5rem 1rem;
  }
  
  .search-bar input {
    flex: 1;
    border: none;
    background: none;
    padding: 0.5rem;
    outline: none;
  }
  
  .search-bar button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
  }
  
  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .main-nav a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  
  .main-nav a:hover {
    color: #3498db;
  }
  
  .cart-link {
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
  }
  
  .account-dropdown {
    position: relative;
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    padding: 0.5rem;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .header-container {
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
    }
  
    .mobile-menu-btn {
      display: block;
    }
  
    .main-nav {
      display: none;
      width: 100%;
      flex-direction: column;
      order: 4;
      padding: 1rem 0;
    }
  
    .main-nav.mobile-open {
      display: flex;
    }
  
    .category-dropdown,
    .search-bar {
      order: 3;
      width: 100%;
    }
  
    .search-bar {
      max-width: none;
    }
  }
  
  /* Transitions */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>