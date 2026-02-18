<template>
  <div class="page-favoris">
    <h1>Mes Favoris</h1>

    <!-- Aucun favori -->
    <div v-if="favoritesStore.favoris.length === 0" class="favoris-vides">
      <p>🤍</p>
      <h2>Vous n'avez pas encore de favoris</h2>
      <p>Cliquez sur le cœur d'un produit pour l'ajouter ici</p>
      <router-link to="/" class="btn-retour">Voir les produits</router-link>
    </div>

    <!-- Liste des favoris -->
    <div v-else>
      <p class="compteur">{{ favoritesStore.totalFavoris }} produit(s) en favori</p>

      <div class="grille">
        <div
          v-for="produit in favoritesStore.favoris"
          :key="produit.id"
          class="carte-favori"
        >
          <!-- Image avec fallback si elle ne charge pas -->
          <div class="image-produit">
            <img
              :src="produit.image"
              :alt="produit.title || 'Produit'"
              @error="imageErreur"
            />
          </div>

          <!-- Infos -->
          <div class="infos-produit">
            <!-- Titre avec fallback si manquant -->
            <h3>{{ produit.title || 'Produit sans nom' }}</h3>
            <p class="description">{{ produit.description || 'Aucune description disponible.' }}</p>

            <div class="pied-carte">
              <!-- Prix avec vérification -->
              <span class="prix">
                {{ produit.price ? formatPrix(produit.price) : 'Prix non disponible' }}
              </span>

              <div class="boutons">
                <!-- Ajouter au panier -->
                <button @click="ajouterAuPanier(produit)" class="btn-ajouter">
                  + Panier
                </button>

                <!-- Retirer des favoris -->
                <button @click="retirerFavori(produit)" class="btn-retirer">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton vider les favoris -->
      <div class="actions-bas">
        <button @click="favoritesStore.viderFavoris()" class="btn-vider">
          Vider les favoris
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'FavoritesPage',

  data() {
    return {
      favoritesStore: useFavoritesStore(),
      cartStore: useCartStore()
    }
  },

  methods: {
    // Retirer un produit des favoris
    retirerFavori(produit) {
      this.favoritesStore.toggleFavori(produit)
    },

    // Ajouter un favori directement au panier
    ajouterAuPanier(produit) {
      this.cartStore.addToCart(produit)
      console.log('Ajouté au panier depuis les favoris :', produit.title)
    },

    // Si l'image ne charge pas, on met une image de remplacement
    imageErreur(event) {
      event.target.src = 'https://placehold.co/400x200?text=Image+non+disponible'
    },

    // Formater le prix en euros
    formatPrix(prix) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(prix)
    }
  }
}
</script>

<style scoped>
.page-favoris {
  max-width: 1100px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #333;
}

/* Favoris vides */
.favoris-vides {
  text-align: center;
  padding: 60px 20px;
}

.favoris-vides p:first-child {
  font-size: 4rem;
  margin-bottom: 15px;
}

.favoris-vides h2 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #555;
}

.favoris-vides p {
  color: #888;
  margin-bottom: 20px;
}

.btn-retour {
  display: inline-block;
  background-color: #6c5ce7;
  color: white;
  padding: 10px 25px;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 10px;
}

.btn-retour:hover {
  background-color: #5b4ccc;
}

/* Compteur */
.compteur {
  color: #888;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

/* Grille des favoris */
.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

/* Carte favori */
.carte-favori {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.carte-favori:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-produit {
  height: 200px;
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
  font-size: 1.1rem;
  font-weight: bold;
  color: #6c5ce7;
}

.boutons {
  display: flex;
  gap: 8px;
}

.btn-ajouter {
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 7px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-ajouter:hover {
  background-color: #5b4ccc;
}

.btn-retirer {
  background-color: #ffebee;
  border: none;
  padding: 7px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-retirer:hover {
  background-color: #ff5252;
}

/* Bouton vider */
.actions-bas {
  text-align: right;
}

.btn-vider {
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-vider:hover {
  background-color: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .grille {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>