<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import spinner from './assets/black-spinner.svg'
import {useStore} from "@/stores/store";
import LoggedInLayout from "@/views/layouts/LoggedInLayout.vue";
import {ref} from "vue";
import {Observer} from 'mobx-vue-lite';

const store = useStore()
const router = useRouter()

</script>

<template>
  <div class="flex justify-center items-center w-full md:px-16 px-4">
    <Suspense>
      <template #default>

        <Observer>
          <LoggedInLayout v-if="store.auth.token && router.currentRoute.value.path !== '/'">
            <RouterView/>
          </LoggedInLayout>
          <RouterView v-else></RouterView>
        </Observer>
      </template>
      <template #fallback><img :src="spinner" alt="loading spinner"></template>
    </Suspense>
  </div>
</template>