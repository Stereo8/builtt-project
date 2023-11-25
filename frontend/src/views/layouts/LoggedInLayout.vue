<script setup lang="ts">
import BrandLogo from '../../assets/brand-logo.svg'
import BlackBasketIcon from '../../assets/basket-black.svg'
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";
import {Observer} from "mobx-vue-lite"

const store = useStore()
const router = useRouter()
</script>

<template>
  <Observer>
    <div class="fixed top-0 w-full h-16 bg-zinc-100 flex items-center justify-between">
      <img :src="BrandLogo" alt="Builtt" class="w-20 h-10 ml-8 cursor-pointer" @click="router.push('/proizvodi')">
      <div class="relative mr-8 w-6 h-6 " @click="router.push('/basket')">
        <img :src="BlackBasketIcon" alt="Cart" class="w-6 h-6">
        <div class="absolute w-6 h-6 flex justify-center items-center top-[0.2rem] text-[8pt] cursor-pointer">{{
            store.basket.reduce((acc, curr) => acc + curr.quantity, 0)
          }}
        </div>
      </div>
    </div>
  </Observer>

  <div class="w-full">
    <slot/>
  </div>
</template>

<style scoped>

</style>