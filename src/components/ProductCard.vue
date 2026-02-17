<template>
  <div class="carte-produit">
    
    <!-- Image -->
    <div class="image-produit">
      <img :src="product.image" :alt="product.title" />
    </div>

    <!-- Infos -->
    <div class="infos-produit">
      <h3>{{ product.title }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="pied-carte">
        <span class="prix">{{ formatPrix(product.price) }}</span>
        <button @click="$emit('add', product)" class="btn-ajouter">
          + Ajouter
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add'])

// Formater le prix en euros
function formatPrix(prix) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(prix)
}
</script>

<style scoped>
.carte-produit {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.carte-produit:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Image */
.image-produit {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.image-produit img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Infos */
.infos-produit {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.infos-produit h3 {
  font-size: 1rem;
  color: #2d1b4e;
  margin-bottom: 8px;
}

.description {
  font-size: 0.9rem;
  color: #666;
  flex: 1;
  margin-bottom: 15px;
}

/* Pied de carte */
.pied-carte {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.prix {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6c5ce7;
}

.btn-ajouter {
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-ajouter:hover {
  background-color: #5b4ccc;
}
</style>