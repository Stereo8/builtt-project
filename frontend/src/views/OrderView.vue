<script setup lang="ts">
import {useRouter} from "vue-router";
import {useStore} from "@/stores/store";
import BasketItem from "@/components/BasketItem.vue";
import BasketSummary from "@/components/BasketSummary.vue";
import {ref} from "vue";


const store = useStore()
const router = useRouter()


const orderId = router.currentRoute.value.params.id

const requestConfig: RequestInit = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${await store.value.auth.token}`
  },
  method: 'GET',
}

const response = await window.fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, requestConfig)
if (response.status === 401) {
  router.push('/')
}
const data = ref(await response.json())
const basket = ref(JSON.parse(data.value.data.basketContents))
console.log(basket)
</script>

<template>
  <div class="mt-6">
    <div class="mb-[2.5rem]"><span class="font-bold text-xl leading-normal tracking-tight mr-2">Tvoja narudžbina</span>
      <span
          class="leading-snug text-gray-400">{{ basket.reduce((acc, curr) => acc + curr.quantity, 0) }} proizvoda</span>
    </div>

    <div class="flex justify-between flex-row flex-wrap w-full lg:gap-x-12 gap-x-4">
      <div class="flex-grow-[10] min-w-[20rem] mb-2">
        <div v-for="product in basket">
          <BasketItem v-bind="product" hide-controls></BasketItem>
        </div>
      </div>
    </div>

    <div>Adresa za dostavu: {{ data.data.shippingAddress }}</div>
    <div>Adresa za obračun: {{ data.data.billingAddress }}</div>
    <div>Plaćeno: {{ data.data.orderTotal }} RSD</div>
  </div>
</template>

<style scoped>

</style>