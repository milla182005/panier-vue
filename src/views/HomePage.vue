<template>
  <div class="home">
    <h1>Nos produits</h1>

    <p v-if="loading">Chargement...</p>

    <div class="products">
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

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.products = productsData
      this.loading = false
    }, 500)
  },
  methods: {
    addToCart(product) {
      console.log('Ajout panier:', product)
    }
  }
}
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>
