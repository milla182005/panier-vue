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
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

.contenu {
  padding: 30px 20px;
  max-width: 1100px;
  margin: 0 auto;
}
</style>