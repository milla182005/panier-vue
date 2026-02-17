<template>
  <div id="app">
    <NavBar />
    <main class="contenu">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
/* Reset de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contenu {
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
}

/* Styles globaux utiles */
img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}
</style>