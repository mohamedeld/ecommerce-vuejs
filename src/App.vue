<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>
  <RouterView />
  <Toaster/>
</template>

