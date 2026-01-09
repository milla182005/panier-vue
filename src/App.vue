<script setup>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'
import ShoppingCart from './components/ShoppingCart.vue'

// Logo dans assets
import Logo from './assets/logo.png'

const products = ref([
  { 
    name: 'Nettoyant Visage Hydratant',
    price: 14.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2tee12D_FgwkarrkdABCmf40MwfMepOF5uQ&s',
    description: 'Nettoie la peau en douceur tout en respectant son hydratation naturelle.'
  },
  { 
    name: 'Sérum Vitamine C',
    price: 23.45,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyB6KBhvmYPy0JaSE4EwtezzLbthe1CLflvA&s',
    description: 'Apporte de l’éclat et aide à unifier le teint.'
  },
  { 
    name: 'Crème Hydratante',
    price: 19.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZgbkB1-AI8BENGMCuNdEn0WgOPd2ZS3jlA&s',
    description: 'Hydratation longue durée pour une peau douce et confortable.'
  },
  { 
    name: 'Masque Visage Apaisant',
    price: 9.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_vDffMbGFcKSImIcIJbn4bXVCvQN4Vu3udQ&s',
    description: 'Apaise les rougeurs et procure une sensation de confort immédiat.'
  },
  { 
    name: 'Crème Solaire SPF 50',
    price: 17.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYLz1UD2N8X06cIehSR0UoFZlKrGExPHyjzg&s',
    description: 'Protège efficacement la peau contre les rayons UV.'
  },
  { 
    name: 'Eau Micellaire Douce',
    price: 12.90,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7r8HqdOMqLCbYCqMCE82C_O90TQIzcxDsw&s',
    description: 'Démaquille et nettoie la peau sans l’irriter.'
  },
  { 
    name: 'Sérum Hydratant',
    price: 18.59,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qGU9l_Q3ISAeXCFR8v5e2-kETHd5u_H7KA&s',
    description: 'Hydratation intense pour une peau repulpée et lumineuse.'
  },
  { 
    name: 'Masque Charbon',
    price: 10.20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpXixCNI8BgLHVhlRb6naqVM9GBXj6ZVnWGQ&s',
    description: 'Purifie les pores et élimine les impuretés en profondeur.'
  },
  { 
    name: 'Gommage Corps',
    price: 15.40,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1_ViBUKO0s1BtNmMhB69kIV8rML6bOKGOUQ&s',
    description: 'Exfolie délicatement la peau pour la rendre lisse et douce.'
  },
  { 
    name: 'Lait de Corps',
    price: 20.30,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXi9tPl1_dRYHU3ZjcjbU41LFbI-dH1K93zA&s',
    description: 'Nourrit et hydrate la peau pour un confort durable.'
  }
])

const cart = ref([])

const addToCart = (product) => cart.value.push(product)
const removeItem = (index) => cart.value.splice(index, 1)
</script>

<template>
  <div class="page">
    <!-- HEADER -->
    <header class="header">
      <div class="logo-title">
        <img :src="Logo" alt="Logo Skincare Shop" class="logo" />
        <h1>Skincare Shop</h1>
      </div>
      <p class="subtitle">Des soins adaptés à votre peau</p>
    </header>

    <!-- PRODUITS -->
    <main class="products-section">
      <div class="products">
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          @add-to-cart="addToCart"
        >
          <!-- ✅ description dynamique -->
          <p>{{ product.description }}</p>
        </ProductCard>
      </div>

      <!-- PANIER EN BAS -->
      <div class="cart-inline">
        <ShoppingCart :items="cart" @remove-item="removeItem" />
      </div>
    </main>
  </div>
</template>

<style>
.page {
  min-height: 100vh;
  background: #f6f4fb;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.subtitle {
  color: #666;
}

.products-section {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
}

.cart-inline {
  max-width: 320px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

@media (max-width: 900px) {
  .products {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
