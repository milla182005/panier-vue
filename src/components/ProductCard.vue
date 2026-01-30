<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />
      <div class="product-badge" v-if="isNew">Nouveau</div>
    </div>
    
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-footer">
        <span class="product-price">{{ formatPrice(product.price) }}</span>
        <button class="add-to-cart-btn" @click="$emit('add', product)" title="Ajouter au panier">
          <span class="plus-icon">+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Définir l'émission d'événements
defineEmits(['add'])

const isNew = computed(() => {
  // Marquer les 5 premiers produits comme nouveaux
  return props.product.id <= 5
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px solid transparent;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: #667eea;
}

.product-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  font-size: 1.1rem;
  color: #2d1b4e;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.4;
  min-height: 2.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.add-to-cart-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.8rem;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.add-to-cart-btn:hover {
  transform: scale(1.15) rotate(90deg);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.add-to-cart-btn:active {
  transform: scale(1) rotate(90deg);
  animation: addPulse 0.3s ease;
}

.plus-icon {
  font-weight: 300;
  line-height: 1;
}

/* Animation au clic */
@keyframes addPulse {
  0%, 100% {
    transform: scale(1) rotate(90deg);
  }
  50% {
    transform: scale(1.3) rotate(90deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .product-image {
    height: 220px;
  }

  .product-info {
    padding: 1rem;
  }

  .product-title {
    font-size: 1rem;
  }

  .product-description {
    font-size: 0.85rem;
  }

  .product-price {
    font-size: 1.3rem;
  }

  .add-to-cart-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .product-image {
    height: 200px;
  }

  .product-info {
    padding: 0.875rem;
  }

  .product-title {
    font-size: 0.95rem;
    min-height: 2.6rem;
  }

  .product-description {
    font-size: 0.8rem;
  }

  .product-price {
    font-size: 1.2rem;
  }

  .add-to-cart-btn {
    width: 38px;
    height: 38px;
    font-size: 1.4rem;
  }
}
</style>