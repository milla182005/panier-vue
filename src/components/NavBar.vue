<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="brand">
        🧴 SkinShop
      </router-link>

      <!-- Liens de navigation -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">Accueil</router-link>

        <router-link to="/panier" class="nav-link">
          🛒 Panier
          <span v-if="cartStore.totalItems > 0" class="badge">
            {{ cartStore.totalItems }}
          </span>
        </router-link>

        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'NavBar',

  data() {
    return {
      cartStore: useCartStore()
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #6c5ce7;
  padding: 15px 0;
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-link.router-link-active {
  font-weight: bold;
}

/* Badge du panier */
.badge {
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 4px;
}
</style>