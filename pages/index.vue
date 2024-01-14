<script setup lang="ts">
const x = queryTableData(db.ingredients.where('name').startsWith('test'))
</script>

<template>
  <div>
    <ul>
      <li v-for="ingredient in x" :key="ingredient.name">
        {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>
