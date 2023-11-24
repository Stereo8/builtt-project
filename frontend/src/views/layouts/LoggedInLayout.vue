<script setup lang="ts">
import BrandLogo from '../../assets/brand-logo.svg'
import BlackBasketIcon from '../../assets/basket-black.svg'
</script>

<template>
  <div class="fixed top-0 w-full h-16 bg-zinc-100 flex items-center justify-between">
    <img :src="BrandLogo" alt="Builtt" class="w-20 h-10 ml-8">
    <img :src="BlackBasketIcon" alt="Cart" class="mr-8 w-6 h-6">
  </div>
  <div class="w-full">
    <slot/>
  </div>
</template>

<style scoped>

</style>