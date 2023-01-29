<script setup>
import { RouterView } from 'vue-router'
import HeadMeta from './components/HeadMeta.vue';
</script>

<template>
  <div class="main-container">
    <HeadMeta />
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  .main-container{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .router-view{
    height: calc(100% - 50px);
    margin-top: 50px;
    width: 100%;
    overflow: auto;
  }
</style>
