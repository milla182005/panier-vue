<template>
  <div class="page-panier">
    <h1>Mon Panier</h1>

    <!-- Panier vide -->
    <div v-if="cartStore.items.length === 0" class="panier-vide">
      <h2>Votre panier est vide</h2>
      <p>Ajoutez des produits pour commencer vos achats</p>
      <router-link to="/" class="btn-retour">Continuer mes achats</router-link>
    </div>

    <!-- Contenu du panier -->
    <div v-else class="contenu-panier">

      <!-- Liste des articles -->
      <div class="liste-articles">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="article"
        >
          <!-- Image avec fallback si elle ne charge pas -->
          <img
            :src="item.image"
            :alt="item.title"
            class="article-image"
            @error="imageErreur"
          />

          <div class="article-info">
            <!-- Titre avec fallback si manquant -->
            <h3>{{ item.title || 'Produit sans nom' }}</h3>
            <p>{{ item.description || 'Aucune description disponible.' }}</p>
            <!-- Prix avec vérification -->
            <p class="article-prix">
              {{ item.price ? item.price.toFixed(2) + ' €' : 'Prix non disponible' }}
            </p>
          </div>

          <!-- Quantité -->
          <div class="quantite">
            <button @click="cartStore.decreaseQuantity(item.id)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.increaseQuantity(item.id)">+</button>
          </div>

          <!-- Sous-total -->
          <div class="sous-total">
            <p class="label">Sous-total</p>
            <p class="montant">{{ (item.price * item.quantity).toFixed(2) }} €</p>
          </div>

          <!-- Supprimer -->
          <button @click="cartStore.removeFromCart(item.id)" class="btn-supprimer">
            🗑️
          </button>
        </div>
      </div>

      <!-- Résumé de commande -->
      <div class="resume">
        <h2>Résumé</h2>

        <div class="ligne">
          <span>Articles ({{ cartStore.totalItems }})</span>
          <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
        </div>

        <div class="ligne">
          <span>Livraison</span>
          <span style="color: green;">Gratuite</span>
        </div>

        <hr />

        <div class="ligne total">
          <span>Total</span>
          <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
        </div>

        <button class="btn-commander">Passer la commande</button>

        <button @click="cartStore.clearCart" class="btn-vider">
          Vider le panier
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartPage',

  data() {
    return {
      cartStore: useCartStore()
    }
  },

  methods: {
    // Si l'image du produit ne charge pas, on met une image de remplacement
    imageErreur(event) {
      event.target.src = 'https://placehold.co/90x90?text=?'
    }
  }
}
</script>

<style scoped>
.page-panier {
  max-width: 1100px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #333;
}

/* Panier vide */
.panier-vide {
  text-align: center;
  padding: 60px 20px;
}

.panier-vide h2 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #555;
}

.btn-retour {
  display: inline-block;
  background-color: #6c5ce7;
  color: white;
  padding: 10px 25px;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 20px;
}

.btn-retour:hover {
  background-color: #5b4ccc;
}

/* Layout panier */
.contenu-panier {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 25px;
}

/* Articles */
.liste-articles {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.article-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
}

.article-info {
  flex: 1;
}

.article-info h3 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.article-info p {
  font-size: 0.85rem;
  color: #666;
}

.article-prix {
  font-weight: bold;
  color: #6c5ce7 !important;
  margin-top: 5px;
}

/* Quantité */
.quantite {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 5px 8px;
}

.quantite button {
  width: 28px;
  height: 28px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.quantite button:hover {
  background-color: #ddd;
}

.quantite span {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

/* Sous-total */
.sous-total {
  text-align: right;
}

.sous-total .label {
  font-size: 0.8rem;
  color: #999;
}

.sous-total .montant {
  font-size: 1rem;
  font-weight: bold;
}

/* Bouton supprimer */
.btn-supprimer {
  border: none;
  background-color: #ffebee;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-supprimer:hover {
  background-color: #ff5252;
}

/* Résumé */
.resume {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.resume h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
}

.ligne {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.total {
  font-size: 1.1rem;
  font-weight: bold;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 15px 0;
}

.btn-commander {
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-commander:hover {
  background-color: #218838;
}

.btn-vider {
  width: 100%;
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-vider:hover {
  background-color: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .contenu-panier {
    grid-template-columns: 1fr;
  }

  .article {
    flex-wrap: wrap;
  }

  .resume {
    position: static;
  }
}
</style>