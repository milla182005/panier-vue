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
        <img
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop"
          alt="Produits de soin"
        />
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

    <!-- Footer simple -->
    <footer class="footer">
      <div class="footer-contenu">
        <div class="footer-col">
          <h3>SkinShop</h3>
          <p>Des soins naturels pour révéler votre beauté.</p>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <p>contact@skinshop.fr</p>
          <p>+33 01 23 45 67 89</p>
        </div>
        <div class="footer-col">
          <h3>Livraison</h3>
          <p>Gratuite dès 40€</p>
          <p>Retours sous 30 jours</p>
        </div>
      </div>
      <div class="footer-bas">
        <p>© 2025 SkinShop — Tous droits réservés</p>
      </div>
    </footer>

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
  transition: background 0.3s;
}

.btn-principal:hover {
  background-color: #5b4ccc;
}

.hero-image img {
  width: 350px;
  border-radius: 10px;
  object-fit: cover;
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
  transition: box-shadow 0.3s;
}

.avantage:hover {
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.15);
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

/* --- Footer --- */
.footer {
  background-color: #6c5ce7;
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.footer-contenu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 25px;
}

.footer-col h3 {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  color: #c9b8ff;
}

.footer-col p {
  font-size: 0.9rem;
  opacity: 0.75;
  margin-bottom: 6px;
  line-height: 1.6;
}

.footer-bas {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.5;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-image img {
    width: 100%;
  }

  .hero-texte h1 {
    font-size: 1.8rem;
  }

  .avantages {
    flex-wrap: wrap;
  }

  .avantage {
    flex: 1 1 calc(50% - 10px);
  }

  .footer-contenu {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .avantage {
    flex: 1 1 100%;
  }

  .hero-texte h1 {
    font-size: 1.5rem;
  }
}

</style>