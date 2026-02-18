import { defineStore } from 'pinia'
import productsData from '@/data/products.json'

export const useProductsStore = defineStore('products', {

  // Les données du store
  state: () => ({
    produits: [],
    chargement: false,
    erreur: null
  }),

  // Les actions (fonctions qui modifient le state)
  actions: {

    // Charger les produits depuis le fichier JSON
    chargerProduits() {
      this.chargement = true
      this.erreur = null

      try {
        this.produits = productsData
      } catch (e) {
        this.erreur = 'Impossible de charger les produits.'
        console.error(e)
      } finally {
        this.chargement = false
      }
    }
  }
})