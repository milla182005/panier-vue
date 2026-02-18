import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {

  // Les données du store
  state: () => ({
    favoris: []
  }),

  // Les fonctions calculées
  getters: {
    // Nombre total de favoris
    totalFavoris(state) {
      return state.favoris.length
    },

    // Vérifie si un produit est déjà en favori
    estEnFavori(state) {
      return (produitId) => state.favoris.some(p => p.id === produitId)
    }
  },

  // Les actions (fonctions qui modifient le state)
  actions: {

    // Ajouter ou retirer un favori
    toggleFavori(produit) {
      const index = this.favoris.findIndex(p => p.id === produit.id)

      if (index === -1) {
        // Le produit n'est pas en favori, on l'ajoute
        this.favoris.push(produit)
        console.log('Ajouté aux favoris :', produit.title)
      } else {
        // Le produit est déjà en favori, on le retire
        this.favoris.splice(index, 1)
        console.log('Retiré des favoris :', produit.title)
      }
    },

    // Vider tous les favoris
    viderFavoris() {
      this.favoris = []
    }
  }
})