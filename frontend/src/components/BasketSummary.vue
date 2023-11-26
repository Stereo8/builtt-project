<script setup lang="ts">
import {Observer} from 'mobx-vue-lite'
import {useStore} from "@/stores/store";
import {computed} from "vue";

const store = useStore()
const ukupno = computed(() => {
  return store.value.basket.reduce((acc, curr) => {
    return acc + (curr.price * curr.quantity)
  }, 0)
})
const usteda = computed(() => {
  return store.value.basket.reduce((acc, curr) => {
    return acc + (curr.discount * curr.quantity)
  }, 0)
})
const zaIsplatu = computed(() => {
  return ukupno.value - usteda.value
})
</script>

<template>
  <Observer>
    <div class="min-w-[18rem] h-[28.125rem] bg-neutral-100 rounded p-6 flex flex-col justify-start">
      <span class="font-bold text-lg leading-normal mb-7">Tvoja narudžbina</span>
      <div class="border-b border-grey-400 pb-4 mb-4">
        <div class="w-full flex justify-between mb-2">
          <span>Ukupno</span>
          <span class="text-lg">{{ ukupno }} <sup>RSD</sup></span>
        </div>
        <div class="w-full flex justify-between mb-2">
          <span>Ušteda</span>
          <span class="text-lg">-{{ usteda }} <sup>RSD</sup></span>
        </div>
        <div class="w-full flex justify-between">
          <span>Isporuka Daily Express*</span>
          <span class="text-xs">Besplatna</span>
        </div>
      </div>
      <div>
        <div class="w-full flex justify-between">
          <span>Ukupno za isplatu</span>
          <span class="text-lg">{{ zaIsplatu }}  <sup>RSD</sup></span>
        </div>
      </div>
    </div>
  </Observer>

</template>

<style scoped>

</style>