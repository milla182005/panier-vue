<template>
  <div class="cart-page">
    <h1>🛒 Mon Panier</h1>

    <!-- Message panier vide -->
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛍️</div>
      <h2>Votre panier est vide</h2>
      <p>Ajoutez des produits pour commencer vos achats</p>
      <router-link to="/" class="btn-continue">
        Continuer mes achats
      </router-link>
    </div>

    <!-- Liste des produits -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <!-- Image du produit -->
          <div class="item-image">
            <img :src="item.image" :alt="item.title" />
          </div>

          <!-- Informations du produit -->
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <p class="item-price">{{ item.price.toFixed(2) }} €</p>
          </div>

          <!-- Contrôle de quantité -->
          <div class="item-quantity">
            <button 
              @click="cartStore.decreaseQuantity(item.id)"
              class="qty-btn"
              aria-label="Diminuer quantité"
            >
              −
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              @click="cartStore.increaseQuantity(item.id)"
              class="qty-btn"
              aria-label="Augmenter quantité"
            >
              +
            </button>
          </div>

          <!-- Sous-total -->
          <div class="item-subtotal">
            <p class="subtotal-label">Sous-total</p>
            <p class="subtotal-price">
              {{ (item.price * item.quantity).toFixed(2) }} €
            </p>
          </div>

          <!-- Bouton supprimer -->
          <button 
            @click="cartStore.removeFromCart(item.id)"
            class="btn-remove"
            aria-label="Supprimer le produit"
          >
            🗑️
          </button>
        </div>
      </div>

      <!-- Résumé du panier -->
      <div class="cart-summary">
        <h2>Résumé de la commande</h2>
        
        <div class="summary-line">
          <span>Articles ({{ cartStore.totalItems }})</span>
          <span>{{ cartStore.totalPrice.toFixed(2) }} €</span>
        </div>

        <div class="summary-line">
          <span>Livraison</span>
          <span class="free">Gratuite</span>
        </div>

        <hr />

        <div class="summary-total">
          <span>Total</span>
          <span class="total-price">{{ cartStore.totalPrice.toFixed(2) }} €</span>
        </div>

        <button class="btn-checkout">
          Passer la commande
        </button>

        <button 
          @click="cartStore.clearCart"
          class="btn-clear"
        >
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
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

/* Panier vide */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: #888;
  margin-bottom: 2rem;
}

.btn-continue {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-continue:hover {
  background: #0056b3;
}

/* Contenu du panier */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Item du panier */
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-image img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.item-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.item-price {
  font-weight: 600;
  color: #007bff;
}

/* Contrôle quantité */
.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.25rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 3px;
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #e0e0e0;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

/* Sous-total */
.item-subtotal {
  text-align: right;
}

.subtotal-label {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.25rem;
}

.subtotal-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

/* Bouton supprimer */
.btn-remove {
  width: 40px;
  height: 40px;
  border: none;
  background: #ffebee;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: #ff5252;
  transform: scale(1.1);
}

/* Résumé */
.cart-summary {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-summary h2 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.summary-line .free {
  color: #28a745;
  font-weight: 600;
}

.cart-summary hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.total-price {
  color: #007bff;
  font-size: 1.5rem;
}

.btn-checkout {
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 0.75rem;
}

.btn-checkout:hover {
  background: #218838;
}

.btn-clear {
  width: 100%;
  background: transparent;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-clear:hover {
  background: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-quantity,
  .item-subtotal,
  .btn-remove {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .cart-summary {
    position: static;
  }
}
</style>