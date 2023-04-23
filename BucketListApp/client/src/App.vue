<script setup>
import HomeView from './views/BucketList.vue'
</script>

<template>
  <div>
    <header>
      <h1>My Bucket List</h1>
    </header>
    <main class="wrapper">
      <HomeView />
    </main>
    <footer>
      My Bucket List | All Rights Reserved | 2023
    </footer>
  </div>
</template>

<style scoped>
  header {
    text-align: center;
    background-color: #E5E5E5;
    padding: 10px;
    min-height: 10vh;
  }

  main {
    min-height: 80vh;
    background-color: #F5F5F5;
  }

  footer {
    min-height: 10vh;
    text-align: center;
    background-color: #E5E5E5;
    padding: 10px;
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }
</style>
