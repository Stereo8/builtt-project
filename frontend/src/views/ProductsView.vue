<script setup lang="ts">
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";
import {Ref, ref} from "vue";
import ProductTile from "@/components/ProductTile.vue";
import type {Product} from "@/types/product";

const store = useStore()
const router = useRouter()

const products: Ref<Product[]> = ref([])
const error = ref(false)

console.log(store.value.auth.token)

const requestConfig: RequestInit = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${await store.value.auth.token}`
  },
  method: 'GET',
}

const response = await window.fetch(`${import.meta.env.VITE_API_URL}/products`, requestConfig)

if (response.status === 401) {
  router.push('/')
} else if (response.status !== 200) {
  showError()
} else {
  products.value = (await response.json()).data.products
}

</script>

<template>
  <div class="mt-6">
    <div class="mb-1"><span class="font-bold text-xl leading-normal tracking-tight mr-1">Svi proizvodi</span> <span
        class="leading-snug text-gray-400">{{ products.length }} proizvoda</span></div>

    <div class="flex justify-center flex-row w-full">
      <div class="flex flex-row flex-wrap justify-start">
        <ProductTile v-for="product in products"
                     class="m-4"
                     v-bind="product"></ProductTile>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>