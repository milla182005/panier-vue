import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    // Total général du panier
    totalPrice(state) {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    // Nombre total d'articles
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    }
  },

  actions: {
    // Ajouter un produit (ou augmenter quantité si déjà présent)
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },

    // Supprimer un produit du panier
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },

    // Augmenter la quantité
    increaseQuantity(productId) {
      const item = this.items.find(i => i.id === productId)
      if (item) {
        item.quantity++
      }
    },

    // Diminuer la quantité
    decreaseQuantity(productId) {
      const item = this.items.find(i => i.id === productId)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        // Si quantité = 1, on supprime le produit
        this.removeFromCart(productId)
      }
    },

    // Vider tout le panier
    clearCart() {
      this.items = []
    }
  }
})