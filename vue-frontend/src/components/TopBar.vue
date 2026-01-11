<template>
  <div class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
    <div 
      v-if="showBack"
      class="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer"
      @click="$router.back()"
    >
      <span class="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
    </div>
    <h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center" :class="{ 'pr-12': !showBack }">
      {{ title }}
    </h2>
    <div class="flex w-12 items-center justify-end">
      <button 
        v-if="showMenu"
        class="flex cursor-pointer items-center justify-center rounded-full size-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        @click="$emit('menu-click')"
      >
        <span class="material-symbols-outlined text-[24px]">more_vert</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: false
  },
  showMenu: {
    type: Boolean,
    default: false
  }
})

defineEmits(['menu-click'])
</script>

