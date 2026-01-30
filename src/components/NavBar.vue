<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo / Nom du site -->
      <router-link to="/" class="brand">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="brand-name">SkinShop</span>
      </router-link>

      <!-- Menu de navigation avec icônes SVG -->
      <div class="nav-links">
        <!-- Accueil -->
        <router-link to="/" class="nav-link" title="Accueil">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="label">Accueil</span>
        </router-link>

        <!-- Panier avec badge -->
        <router-link to="/panier" class="nav-link cart-link" title="Panier">
          <div class="icon-wrapper">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="20" cy="21" r="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- Badge notification -->
            <span v-if="cartStore.totalItems > 0" class="badge">
              {{ cartStore.totalItems }}
            </span>
          </div>
          <span class="label">Panier</span>
        </router-link>

        <!-- Contact -->
        <router-link to="/contact" class="nav-link" title="Contact">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="22,6 12,13 2,6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="label">Contact</span>
        </router-link>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Logo / Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s;
}

.brand:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3));
}

.brand-icon {
  width: 32px;
  height: 32px;
  transition: transform 0.5s;
}

.brand:hover .brand-icon {
  transform: rotate(180deg);
}

.brand-name {
  letter-spacing: 1px;
  font-weight: 800;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-3px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Icônes SVG */
.icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.nav-link:hover .icon {
  transform: scale(1.15);
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3));
}

.router-link-active .icon {
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* Panier avec badge */
.cart-link .icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: -10px;
  right: -12px;
  background: linear-gradient(135deg, #ff4757 0%, #ff6348 100%);
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  min-width: 22px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(255, 71, 87, 0.6);
  border: 2px solid white;
  animation: pulse-badge 2s infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 3px 10px rgba(255, 71, 87, 0.6);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.9);
  }
}

/* Animation d'apparition du badge */
.badge {
  animation: pulse-badge 2s infinite, pop-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes pop-in {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Animation supplémentaire sur hover du panier */
.cart-link:hover .badge {
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px);
  }
  75% {
    transform: translateX(3px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 65px;
  }

  .brand-name {
    display: none;
  }

  .brand-icon {
    width: 28px;
    height: 28px;
  }

  .nav-links {
    gap: 1.5rem;
  }

  .label {
    font-size: 0.7rem;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    height: 60px;
    padding: 0 0.75rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
  }

  .label {
    display: none;
  }

  .icon {
    width: 26px;
    height: 26px;
  }

  .badge {
    top: -8px;
    right: -10px;
    font-size: 0.65rem;
    padding: 0.2rem 0.45rem;
    min-width: 20px;
  }
}
</style>