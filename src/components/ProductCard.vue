<template>
  <div class="card">
    <img :src="product.image" />
    <h3>{{ product.title }}</h3>
    <p>{{ product.description }}</p>
    <strong>{{ product.price }} €</strong>
    <button @click="$emit('add', product)">
      Ajouter au panier
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}
img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}
</style>
