<script setup>
  import ListItems from '../components/ListItems.vue'
</script>

<template>
  <div class="bucketlist">
    <ListItems/>
  </div>
</template>

<style scoped>
  .bucketlist {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
