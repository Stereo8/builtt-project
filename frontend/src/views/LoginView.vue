<script setup lang="ts">
import {ref} from "vue";

import InputField from "@/components/InputField.vue";
import LoginButton from "@/components/Button.vue";
import {Observer} from 'mobx-vue-lite';
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";

const email = ref('')
const password = ref('')
const loadingIndicator = ref(false)
const buttonShaking = ref(false)
const errorMessage = ref('')
const loginSuccessful = ref(false)


const store = useStore()
const router = useRouter()

const showError = (message) => {
  buttonShaking.value = true
  errorMessage.value = message
  loadingIndicator.value = false
  setTimeout(() => {
    buttonShaking.value = false;
    errorMessage.value = ''
  }, 5000)
}

const authenticate = async () => {
  const requestConfig: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({email: email.value, password: password.value})
  }

  loadingIndicator.value = true
  const response = await window.fetch(`${import.meta.env.VITE_API_URL}/auth/login`, requestConfig)

  if (response.ok) {
    const token = await response.json().then((res) => res.token || undefined)

    store.value.setAuthToken(token)
    loginSuccessful.value = true
    setTimeout(async () => {
      await router.push('/proizvodi')
    }, 1200)
  } else {
    if (response.status === 401) {
      showError('Pogrešan e-mail ili šifra. Pokušaj ponovo.')
    } else {
      showError('Neočekivana greška.')
    }
  }
}
</script>

<template>
  <Observer>
    <div class="flex flex-col">
      <h2 class="text-black text-xl font-bold font-['Arial'] leading-normal tracking-tight mb-10">Prijavi se na svoj
        nalog</h2>
      <InputField v-model="email" class="mb-2" label="E-mail adresa" placeholder="Upišite e-mail adresu"
                  @submit="authenticate"></InputField>
      <InputField v-model="password" class="mb-10" label="Šifra" placeholder="Upišite šifru"
                  type="password" @submit="authenticate"></InputField>

      <LoginButton :class="{shaking: buttonShaking}" @click="authenticate" :spinning="loadingIndicator"
                   :login-succesful="loginSuccessful" login-width>
        Prijavi se na nalog!
      </LoginButton>
      <div
          class="py-3 px-4 mt-4 border rounded border-red-300 bg-red-100 text-red-400 rounded-l h-16 flex flex-col justify-center"
          :class="{'invisible': !errorMessage}">
        {{ errorMessage }}
      </div>
    </div>
  </Observer>

</template>

<style scoped>
@keyframes shake {
  8%, 41% {
    transform: translateX(-10px);
  }
  25%, 58% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-5px);
  }
  92% {
    transform: translateX(5px);
  }
  0%, 100% {
    transform: translateX(0);
  }
}

.shaking {
  animation-name: shake;
  animation-duration: .5s;
}
</style>