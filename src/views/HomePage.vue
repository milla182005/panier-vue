<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Révélez votre beauté naturelle
        </h1>
        <p class="hero-subtitle">
          Découvrez notre collection de soins visage et corps formulés avec des ingrédients naturels
        </p>
        <button class="cta-button" @click="scrollToProducts">
          Découvrir nos produits
        </button>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800" alt="Skincare products" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature">
        <div class="feature-icon">🌿</div>
        <h3>100% Naturel</h3>
        <p>Ingrédients d'origine naturelle</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🐰</div>
        <h3>Cruelty-Free</h3>
        <p>Non testé sur les animaux</p>
      </div>
      <div class="feature">
        <div class="feature-icon">♻️</div>
        <h3>Éco-responsable</h3>
        <p>Emballages recyclables</p>
      </div>
      <div class="feature">
        <div class="feature-icon">✨</div>
        <h3>Résultats visibles</h3>
        <p>Efficacité prouvée</p>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section" ref="productsSection">
      <h2 class="section-title">Nos Produits Phares</h2>

      <p v-if="loading" class="loading-text">Chargement...</p>

      <div class="products" v-else>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add="addToCart"
        />
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
      <div class="newsletter-content">
        <h2>Restez informé(e)</h2>
        <p>Inscrivez-vous pour recevoir nos offres exclusives et conseils beauté</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Votre adresse email" />
          <button>S'inscrire</button>
        </div>
      </div>
    </section>
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
      cartStore: useCartStore()
    }
  },
  
  methods: {
    addToCart(product) {
      this.cartStore.addToCart(product)
      console.log('✅ Produit ajouté au panier:', product.title)
      
      // Petite notification visuelle (optionnelle)
      this.showNotification(product.title)
    },

    showNotification(productName) {
      // Vous pouvez ajouter une notification toast ici
      // Pour l'instant, on utilise juste le console.log
    },

    scrollToProducts() {
      this.$refs.productsSection?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 4rem 6%;
  background: linear-gradient(135deg, #f5f0ff 0%, #fff5f7 100%);
  min-height: 600px;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #2d1b4e;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.hero-image {
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem 6%;
  background: white;
}

.feature {
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.2rem;
  color: #2d1b4e;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.feature p {
  color: #666;
  font-size: 0.95rem;
}

/* Products Section */
.products-section {
  padding: 5rem 6%;
  background: #fafafa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2d1b4e;
  margin-bottom: 3rem;
  font-weight: 700;
}

.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 3rem;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Newsletter Section */
.newsletter {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 5rem 6%;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

.newsletter h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.newsletter p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  white-space: nowrap;
}

.newsletter-form button:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 5%;
  }

  .hero-image {
    height: 400px;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .products {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 5%;
    min-height: 500px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }

  .hero-image {
    height: 300px;
  }

  .products-section {
    padding: 3rem 5%;
  }

  .products {
    grid-template-columns: 1fr;
  }
}
</style>