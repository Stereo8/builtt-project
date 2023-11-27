<script setup lang="ts">
import type {Product, WithQuantity} from "@/types/product";
import MinusIcon from "@/assets/minus.svg";
import PlusIcon from "@/assets/plus.svg";
import CartIcon from "@/assets/basket.svg";
import WhiteCheckIcon from "@/assets/white-check.svg";
import {Observer} from 'mobx-vue-lite'

const props = defineProps<Product & WithQuantity>()
const emits = defineEmits(['delete', 'add', 'subtract'])
const imgSrc = `${import.meta.env.VITE_CDN_URL}/${props.productImageFileName}`

</script>

<template>
  <Observer>
    <div
        class="flex flex-row flex-wrap sm:flex-nowrap justify-between mb-5 pb-5 border-b border-grey-400">
      <div class="flex gap-x-4 md:gap-x-8 gap-y-4">
        <div class="relative h-36 w-36 flex justify-center items-center flex-grow">
          <div class="absolute bg-zinc-100 h-36 w-36 top-0">
          </div>
          <img :src="imgSrc" :alt="props.name" class="h-36 max-w-36 z-20">
        </div>
        <div
            class="flex flex-col flex-grow-[10] min-h-[9rem] min-w-[8rem] sm:min-w-[12rem] max-w-[12rem] sm:max-w-[29rem]">
          <div class="font-bold text-lg">{{ props.name }}</div>
          <div>{{ props.packSize }}</div>
          <div v-if="props.quantity > 1" class="mt-2 text-gray-400">{{ `${props.price - props.discount} RSD po kom.` }}</div>
          <div class="flex-grow"></div>
          <div class="flex items-center mt-4">
            <div
                class="bg-white rounded-full w-24 h-9 flex justify-around items-center border-black border">
              <img :src="MinusIcon" alt="-" class="w-3.5 cursor-pointer" @click="emits('subtract')">
              <div class="">{{ props.quantity }}</div>
              <img :src="PlusIcon" alt="+" class="w-3.5 cursor-pointer" @click="emits('add')">
            </div>
            <div class="underline ml-6 cursor-pointer" @click="emits('delete')">Ukloni</div>
          </div>
        </div>
      </div>
      <div class="min-w-fit">
        <div class="text-2xl leading-loose">{{ (props.price - props.discount) * props.quantity }} <sup>RSD</sup></div>
        <div v-if="props.discount" class="-mt-4 text-orange-700"><span
            class="text-base leading-loose line-through mr-2">{{
            props.price * props.quantity
          }}</span><sup>RSD</sup></div>
      </div>
    </div>
  </Observer>
</template>

<style scoped>

</style>