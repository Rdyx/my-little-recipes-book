<script setup lang="ts">
const x = getTableData('ingredients')
db.ingredients.add({ name: 'test' })
</script>

<template>
  <div>
    <ul>
      <li v-for="ingredient in x" :key="ingredient.id">
        {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>
