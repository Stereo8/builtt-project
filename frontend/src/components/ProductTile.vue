<script setup lang="ts">
import type {Product} from "@/types/product";

import CartIcon from '../assets/basket.svg'
import PlusIcon from '../assets/plus.svg'
import MinusIcon from '../assets/minus.svg'

import {ref} from "vue";
const props = defineProps<Product>()
const hovered = ref(false)
const imgSrc = `${import.meta.env.VITE_CDN_URL}/${props.productImageFileName}`
const quantity = ref(1)

</script>

<template>
  <div>
    <div class="flex flex-col w-72" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <div class="relative h-72 w-72 flex justify-center items-center">
        <div class="absolute bg-zinc-100 h-72 w-72 top-0">
        </div>
        <div v-show="hovered" class="absolute bg-white rounded-full w-24 h-9 bottom-2 left-2 z-50 flex justify-around items-center">
          <img :src="MinusIcon" alt="-" class="w-3.5 cursor-pointer" @click="quantity -= 1">
          <div class="">{{ quantity }}</div>
          <img :src="PlusIcon" alt="+" class="w-3.5 cursor-pointer" @click="quantity += 1">
          <div class="rounded-full h-9 w-9 bg-black left-full absolute ml-1.5 flex justify-center items-center cursor-pointer">
            <img :src="CartIcon" alt="add to cart" class="h-5 w-5">
          </div>
        </div>
        <img :src="imgSrc" :alt="props.name" class="h-72 max-w-72 z-20">
      </div>

      <div class="font-bold text-lg mt-4">{{ props.name }}</div>
      <div class="text-2xl leading-loose">{{ props.price }} <sup class="">RSD</sup></div>
    </div>
  </div>
</template>

<style scoped>

</style>