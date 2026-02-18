import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

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

describe('Store Panier', () => {

  // Avant chaque test, on recrée un store vide
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('le panier est vide au départ', () => {
    const store = useCartStore()
    expect(store.items).toHaveLength(0)
  })

  it('ajouter un produit — il apparaît dans le panier', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].title).toBe('Crème hydratante')
  })

  it('ajouter le même produit deux fois — quantité = 2', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.addToCart(produitTest)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(2)
  })

  it('totalItems compte bien le nombre total d\'articles', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.addToCart(produitTest)
    store.addToCart(produitTest2)
    expect(store.totalItems).toBe(3)
  })

  it('totalPrice calcule bien le prix total', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.addToCart(produitTest2)
    expect(store.totalPrice).toBeCloseTo(44.49)
  })

  it('supprimer un produit — il disparaît du panier', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.removeFromCart(produitTest.id)
    expect(store.items).toHaveLength(0)
  })

  it('vider le panier — panier vide', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.addToCart(produitTest2)
    store.clearCart()
    expect(store.items).toHaveLength(0)
  })

  it('augmenter la quantité', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.increaseQuantity(produitTest.id)
    expect(store.items[0].quantity).toBe(2)
  })

  it('diminuer la quantité à 1 — supprime le produit', () => {
    const store = useCartStore()
    store.addToCart(produitTest)
    store.decreaseQuantity(produitTest.id)
    expect(store.items).toHaveLength(0)
  })

})