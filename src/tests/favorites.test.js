import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

// Un faux produit pour les tests
const produitTest = {
  id: 1,
  title: 'Crème hydratante',
  price: 19.99,
  image: '/images/creme.png',
  description: 'Une crème hydratante.'
}

const produitTest2 = {
  id: 2,
  title: 'Sérum vitamine C',
  price: 24.50,
  image: '/images/serum.png',
  description: 'Un sérum vitamine C.'
}

describe('Store Favoris', () => {

  // Avant chaque test, on recrée un store vide
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('les favoris sont vides au départ', () => {
    const store = useFavoritesStore()
    expect(store.favoris).toHaveLength(0)
  })

  it('toggleFavori — ajoute un produit aux favoris', () => {
    const store = useFavoritesStore()
    store.toggleFavori(produitTest)
    expect(store.favoris).toHaveLength(1)
    expect(store.favoris[0].title).toBe('Crème hydratante')
  })

  it('toggleFavori deux fois — retire le produit des favoris', () => {
    const store = useFavoritesStore()
    store.toggleFavori(produitTest)
    store.toggleFavori(produitTest)
    expect(store.favoris).toHaveLength(0)
  })

  it('estEnFavori retourne true si le produit est en favori', () => {
    const store = useFavoritesStore()
    store.toggleFavori(produitTest)
    expect(store.estEnFavori(produitTest.id)).toBe(true)
  })

  it('estEnFavori retourne false si le produit n\'est pas en favori', () => {
    const store = useFavoritesStore()
    expect(store.estEnFavori(produitTest.id)).toBe(false)
  })

  it('totalFavoris compte bien le nombre de favoris', () => {
    const store = useFavoritesStore()
    store.toggleFavori(produitTest)
    store.toggleFavori(produitTest2)
    expect(store.totalFavoris).toBe(2)
  })

  it('viderFavoris — tous les favoris sont supprimés', () => {
    const store = useFavoritesStore()
    store.toggleFavori(produitTest)
    store.toggleFavori(produitTest2)
    store.viderFavoris()
    expect(store.favoris).toHaveLength(0)
  })

})