<script setup lang="ts">

import BasketSummary from "@/components/BasketSummary.vue";
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";

import {Observer} from "mobx-vue-lite";
import ProductTile from "@/components/ProductTile.vue";

const store = useStore()
const router = useRouter()

if (!store.value.auth.token) {
  await router.push('/')
}
</script>

<template>
  <Observer>
    <div class="mt-6">
      <div class="mb-[2.625rem]"><span class="font-bold text-xl leading-normal tracking-tight mr-1">Tvoja korpa</span>
        <span
            class="leading-snug text-gray-400">{{ store.basket.length }} proizvoda</span></div>

      <div class="flex justify-between flex-row flex-wrap w-full lg:gap-x-12 gap-x-4">
        <div class="flex-grow-[10] border-2 min-w-[20rem] h-28 mb-8"></div>
        <div class="flex-grow">
          <BasketSummary></BasketSummary>
        </div>
      </div>
    </div>
  </Observer>

</template>

<style scoped>

</style>