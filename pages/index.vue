<script setup lang="ts">
const x = queryTableData(db.ingredients.where('name').startsWith('test'))
</script>

<template>
  <div v-auto-animate>
    <ul>
      <li v-for="ingredient in x" :key="ingredient?.name">
        {{ ingredient }}
      </li>
    </ul>
  </div>
</template>
