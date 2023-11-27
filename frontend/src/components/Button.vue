<script setup lang="ts">
import {ref} from "vue";
import spinner from '../assets/spinner.svg'
import check from '../assets/white-check.svg'

const props = defineProps<{ spinning?: boolean, loginSuccesful?: boolean, loginWidth?: boolean }>()
const pressed = ref(false)
</script>

<template>
  <div
      class="w-[420px] h-11 py-3 bg-black rounded-full justify-center items-center inline-flex hover:scale-105 transition-all"
      :class="{'pressed': pressed, 'w-[420px]': props.loginWidth, 'w-full': !props.loginWidth}"
      @mousedown="pressed = true"
      @mouseup="pressed = false">
    <div v-if="!loginSuccesful" class="flex justify-center items-center">
      <div class="text-white text-lg font-normal font-['Arial'] leading-none transition-all">
        <slot />
      </div>
      <img
          v-if="spinning"
          class="ml-2 h-4"
          :src="spinner"/>
    </div>
    <div class="flex justify-center items-center" v-else>
      <div class="text-white text-lg font-normal font-['Arial'] leading-none transition-all">Uspešna prijava!</div>
      <img
          class="ml-4 h-4"
          :src="check"/>
    </div>

  </div>
</template>

<style scoped>
.pressed {
  scale: 92% !important;
}
</style>