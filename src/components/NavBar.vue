<template>
  <nav class="navbar">
    <h2>Skincare Shop</h2>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/cart">Panier</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// Ici tu peux ajouter du JS si nécessaire plus tard
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #7b4ae2;
  color: white;
  border-radius: 12px;
}

ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
