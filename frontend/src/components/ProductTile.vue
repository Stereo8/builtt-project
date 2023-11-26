<script setup lang="ts">
import type {Product} from "@/types/product";
import {useStore} from "@/stores/store";

import CartIcon from '../assets/basket.svg'
import PlusIcon from '../assets/plus.svg'
import MinusIcon from '../assets/minus.svg'
import WhiteCheckIcon from '../assets/white-check.svg'

import {ref} from "vue";

const props = defineProps<Product>()
const store = useStore()

const hovered = ref(false)
const imgSrc = `${import.meta.env.VITE_CDN_URL}/${props.productImageFileName}`
const quantity = ref(1)
const justAdded = ref(false)

const addToBasket = () => {
  store.value.addProductToBasket({...props, quantity: quantity.value})
  quantity.value = 1
  justAdded.value = true
  setTimeout(() => justAdded.value = false, 1500)
}

</script>

<template>
  <div>
    <div class="flex flex-col w-72" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <div class="relative h-72 w-72 flex justify-center items-center">
        <div class="absolute bg-zinc-100 h-72 w-72 top-0">
        </div>
        <div v-show="hovered"
             class="absolute bg-white rounded-full w-24 h-9 bottom-2 left-2 z-50 flex justify-around items-center">
          <img :src="MinusIcon" alt="-" class="w-3.5 cursor-pointer" @click="quantity -= 1">
          <div class="">{{ quantity }}</div>
          <img :src="PlusIcon" alt="+" class="w-3.5 cursor-pointer" @click="quantity += 1">
          <div
              class="rounded-full h-9 w-9 bg-black left-full absolute ml-1.5 flex justify-center items-center cursor-pointer"
              @click="addToBasket()">
            <Transition>
              <img v-if="!justAdded" key="1" :src="CartIcon" alt="add to cart" class="h-5 w-5">
              <img v-else key="2" :src="WhiteCheckIcon" alt="added to cart" class="h-5 w-5">
            </Transition>
          </div>
        </div>
        <img :src="imgSrc" :alt="props.name" class="h-72 max-w-72 z-20">
      </div>

      <div class="font-bold text-lg mt-4">{{ props.name }}</div>
      <div class="text-2xl leading-loose">{{ props.price - props.discount }} <sup>RSD</sup></div>
      <div v-if="props.discount" class="-mt-4 text-orange-700"><span class="text-base leading-loose line-through mr-2">{{
          props.price
        }}</span><sup>RSD</sup></div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from {
  opacity: 1;
}

.v-enter-to {
  opacity: 1;
}

</style>