<template>
  <nav class="nav">
    <router-link to="/">Accueil</router-link>
    <router-link to="/panier">Panier</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
