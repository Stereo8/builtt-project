<script setup lang="ts">
import {ref} from "vue";

import InputField from "@/components/InputField.vue";
import LoginButton from "@/components/LoginButton.vue";

const email = ref('')
const password = ref('')

const authenticate = async () => {
  const requestConfig: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: email.value, password: password.value })
  }
  const response = await window.fetch(`${import.meta.env.VITE_API_URL}/auth/login`, requestConfig).then((res) => res.json())
  console.log(response)
}
</script>

<template>
  <div class="flex flex-col">
    <h2 class="text-black text-xl font-bold font-['Arial'] leading-normal tracking-tight mb-10">Prijavi se na svoj
      nalog</h2>
    <InputField v-model="email" class="mb-2" label="E-mail adresa" placeholder="Upišite e-mail adresu"></InputField>
    <InputField v-model="password" class="mb-10" label="Šifra" placeholder="Upišite šifru" type="password"></InputField>

    <LoginButton @click="authenticate"></LoginButton>
  </div>

</template>

<style scoped>
</style>