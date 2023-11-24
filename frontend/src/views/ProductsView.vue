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
  <ProductTile v-for="product in products"
               :name="product.name" :price="product.price"
               :product-image-file-name="product.productImageFileName"></ProductTile>
</template>

<style scoped>

</style>