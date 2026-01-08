<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price.toFixed(2) }} €</p>

    <div class="description">
      <slot />
    </div>

    <button @click="$emit('add-to-cart', product)">
      Ajouter au panier
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  width: 240px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  text-align: center;

  display: flex;
  flex-direction: column;
  transition: transform 0.2s; /* 🔹 transition pour l'effet hover */
}

.product-card:hover {
  transform: translateY(-5px); /* 🔹 effet hover */
}

img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}

.price {
  font-weight: bold;
  color: #7b4ae2;
  margin: 10px 0;
}

.description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

/* pousse le bouton en bas */
button {
  margin-top: auto;
  background: #7b4ae2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background: #5e35c7;
}
</style>
