<template>
  <div class="home">

    <!-- Section hero -->
    <section class="hero">
      <div class="hero-texte">
        <h1>Révélez votre beauté naturelle</h1>
        <p>Découvrez notre collection de soins formulés avec des ingrédients naturels</p>
        <button @click="scrollVersListe" class="btn-principal">Voir les produits</button>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600" alt="Produits de soin" />
      </div>
    </section>

    <!-- Section petits points forts -->
    <section class="avantages">
      <div class="avantage">
        <span class="icone">🌿</span>
        <h3>100% Naturel</h3>
        <p>Ingrédients naturels</p>
      </div>
      <div class="avantage">
        <span class="icone">🐰</span>
        <h3>Cruelty-Free</h3>
        <p>Non testé sur animaux</p>
      </div>
      <div class="avantage">
        <span class="icone">♻️</span>
        <h3>Éco-responsable</h3>
        <p>Emballages recyclables</p>
      </div>
      <div class="avantage">
        <span class="icone">✨</span>
        <h3>Résultats visibles</h3>
        <p>Efficacité prouvée</p>
      </div>
    </section>

    <!-- Liste des produits -->
    <section ref="listeRef" class="liste-produits">
      <h2>Nos produits</h2>

      <p v-if="chargement">Chargement...</p>

      <div v-else class="grille">
        <ProductCard
          v-for="produit in produits"
          :key="produit.id"
          :product="produit"
          @add="ajouterAuPanier"
        />
      </div>
    </section>

    <!-- Newsletter simple -->
    <section class="newsletter">
      <h2>Restez informé(e)</h2>
      <p>Inscrivez-vous pour recevoir nos offres</p>
      <div class="newsletter-form">
        <input type="email" placeholder="Votre email" />
        <button>S'inscrire</button>
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
      produits: productsData,
      chargement: false,
      cartStore: useCartStore()
    }
  },

  methods: {
    ajouterAuPanier(produit) {
      this.cartStore.addToCart(produit)
      console.log('Produit ajouté :', produit.title)
    },

    scrollVersListe() {
      this.$refs.listeRef.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>

/* --- Hero --- */
.hero {
  display: flex;
  gap: 40px;
  align-items: center;
  padding: 40px 0;
  background-color: #f0eeff;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
}

.hero-texte h1 {
  font-size: 2.2rem;
  color: #2d1b4e;
  margin-bottom: 15px;
}

.hero-texte p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
}

.btn-principal {
  background-color: #6c5ce7;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-principal:hover {
  background-color: #5b4ccc;
}

.hero-image img {
  width: 350px;
  border-radius: 10px;
}

/* --- Avantages --- */
.avantages {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 40px;
  text-align: center;
}

.avantage {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
}

.icone {
  font-size: 2rem;
}

.avantage h3 {
  margin: 10px 0 5px;
  font-size: 1rem;
  color: #2d1b4e;
}

.avantage p {
  font-size: 0.9rem;
  color: #777;
}

/* --- Liste produits --- */
.liste-produits {
  margin-bottom: 40px;
}

.liste-produits h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #2d1b4e;
  text-align: center;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
}

/* --- Newsletter --- */
.newsletter {
  background-color: #6c5ce7;
  color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
}

.newsletter h2 {
  font-size: 1.6rem;
  margin-bottom: 10px;
}

.newsletter p {
  margin-bottom: 20px;
  font-size: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.newsletter-form input {
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  width: 250px;
}

.newsletter-form button {
  padding: 10px 20px;
  background-color: white;
  color: #6c5ce7;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .hero-image img {
    width: 100%;
  }

  .avantages {
    flex-wrap: wrap;
  }

  .avantage {
    flex: 1 1 calc(50% - 10px);
  }
}

@media (max-width: 480px) {
  .avantage {
    flex: 1 1 100%;
  }
}
</style>