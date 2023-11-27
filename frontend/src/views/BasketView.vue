<script setup lang="ts">

import BasketSummary from "@/components/BasketSummary.vue";
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";

import {Observer} from "mobx-vue-lite";
import ProductTile from "@/components/ProductTile.vue";
import BasketItem from "@/components/BasketItem.vue";

const store = useStore()
const router = useRouter()

if (store.value.auth.token === '') {
  router.push('/')
}
</script>

<template>
  <Observer>
    <div class="mt-6">
      <div class="mb-[2.5rem]"><span class="font-bold text-xl leading-normal tracking-tight mr-2">Tvoja korpa</span>
        <span
            class="leading-snug text-gray-400">{{ store.basket.reduce((acc, curr) => acc + curr.quantity, 0) }} proizvoda</span>
      </div>

      <div class="flex justify-between flex-row flex-wrap w-full lg:gap-x-12 gap-x-4">
        <div class="flex-grow-[10] min-w-[20rem] mb-8">
          <div v-for="product in store.basket">
            <BasketItem v-bind="product" @add="store.addOneToProduct(product.id)"
                        @subtract="store.removeOneFromProduct(product.id)"
                        @delete="store.removeProductFromBasket(product.id)"></BasketItem>
          </div>
        </div>
        <div class="flex-grow">
          <BasketSummary></BasketSummary>
        </div>
      </div>
    </div>
  </Observer>

</template>

<style scoped>

</style>