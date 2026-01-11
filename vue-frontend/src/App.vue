<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-white">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

