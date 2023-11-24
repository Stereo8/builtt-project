<script setup lang="ts">
import {RouterView} from 'vue-router'
import spinner from './assets/black-spinner.svg'

</script>

<template>
  <div class="flex justify-center items-center">
    <Suspense>
      <template #default>
        <RouterView/>
      </template>
      <template #fallback><img :src="spinner" alt="loading spinner"></template>
    </Suspense>
  </div>
</template>