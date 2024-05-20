<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Suspense>
        <Navigation />
      </Suspense>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <Suspense>
      <template #default>
        <Component :is="Component" :key="$route.path"></Component>
      </template>
    </Suspense>
  </RouterView>
</template>
