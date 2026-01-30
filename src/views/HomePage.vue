<template>
  <div class="home">
    <h1>Nos produits</h1>

    <p v-if="loading">Chargement...</p>

    <div class="products" v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add="addToCart"
      />
    </div>
  </div>
</template>

<script>
import productsData from '@/data/products.json'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'HomePage',
  components: { ProductCard },
  
  data() {
    return {
      products: productsData,
      loading: false,
      cartStore: useCartStore() // ⬅️ IMPORTANT : initialisé ici
    }
  },
  
  methods: {
    addToCart(product) {
      this.cartStore.addToCart(product)
      console.log('✅ Produit ajouté au panier:', product.title)
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>