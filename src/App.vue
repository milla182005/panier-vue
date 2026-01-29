<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
/* Ici tu peux mettre le style global si besoin */
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}
</style>
