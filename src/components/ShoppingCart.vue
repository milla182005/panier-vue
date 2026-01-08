<template>
  <div class="cart">
    <h2>🛒 Mon Panier <span class="badge">{{ items.length }}</span></h2>

    <p v-if="items.length === 0" class="empty">Votre panier est vide</p>

    <ul v-else>
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.price.toFixed(2) }} €</span>
        <button @click="$emit('remove-item', index)">✖</button>
      </li>
    </ul>

    <h3>Total : {{ total.toFixed(2) }} €</h3>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.price, 0)
)
</script>

<style scoped>
.cart {
  background: transparent;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
}


.empty {
  color: #888;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;       /* Centrer verticalement le bouton */
  margin-bottom: 10px;
}

button {
  background: #ff4d4f;      /* Rouge vif pour le bouton */
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 50%;       /* Rond */
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s;
}

button:hover {
  background: #d9363e;      /* Rouge plus foncé au survol */
}

.badge {
  background: #7b4ae2;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 8px;
  margin-left: 8px;
}
</style>
