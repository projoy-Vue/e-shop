<template>
  <div class="pagination-controls" v-if="totalPages > 1">
    <div class="pagination-info">
      Showing {{ startIndex }}-{{ endIndex }} of {{ totalProducts }} products
    </div>

    <div class="pagination-buttons">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Previous
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
        class="pagination-button"
      >
        {{ page }}
      </button>

      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Next
      </button>
    </div>

    <div class="items-per-page">
      <select v-model="selectedItemsPerPage" @change="updateItemsPerPage">
        <option value="12">12 per page</option>
        <option value="24">24 per page</option>
        <option value="48">48 per page</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('products', [
      'currentPage',
      'totalPages',
      'itemsPerPage',
      'filteredProducts'
    ]),
    totalProducts() {
      return this.filteredProducts.length;
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex() {
      const end = this.currentPage * this.itemsPerPage;
      return end > this.totalProducts ? this.totalProducts : end;
    },
    visiblePages() {
      const range = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    },
    selectedItemsPerPage: {
      get() {
        return this.itemsPerPage.toString();
      },
      set(value) {
        return value;
      }
    }
  },
  methods: {
    ...mapMutations('products', ['SET_CURRENT_PAGE', 'SET_ITEMS_PER_PAGE']),
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.SET_CURRENT_PAGE(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    updateItemsPerPage(event) {
      this.SET_ITEMS_PER_PAGE(parseInt(event.target.value));
      this.SET_CURRENT_PAGE(1);
    }
  }
}
</script>

  
  <style scoped>
  .pagination-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .pagination-info {
    color: #666;
    font-size: 0.9rem;
  }
  
  .pagination-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .pagination-button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .pagination-button.active {
    background: #3498db;
    color: white;
    border-color: #3498db;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .items-per-page select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .pagination-buttons {
      gap: 0.25rem;
    }
    
    .pagination-button {
      padding: 0.25rem 0.5rem;
    }
  }
  </style>