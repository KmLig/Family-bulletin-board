<template>
  <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-background-dark/95 backdrop-blur-lg border-t border-gray-800 pb-safe lg:hidden">
    <div class="flex items-center justify-around h-[60px] px-2">
      <button 
        class="flex flex-col items-center justify-center w-full h-full gap-1"
        :class="currentRoute === 'home' ? 'text-primary' : 'text-slate-400 hover:text-white'"
        @click="navigate('home')"
      >
        <span class="material-symbols-outlined" :class="{ 'filled': currentRoute === 'home' }">home</span>
        <span class="text-[10px] font-medium">Trang chủ</span>
      </button>
      <button 
        class="flex flex-col items-center justify-center w-full h-full gap-1"
        :class="currentRoute === 'family-tree' ? 'text-primary' : 'text-slate-400 hover:text-white'"
        @click="navigate('family-tree')"
      >
        <span class="material-symbols-outlined group-hover:scale-110 transition-transform">account_tree</span>
        <span class="text-[10px] font-medium">Gia phả</span>
      </button>
      <button 
        class="flex flex-col items-center justify-center w-full h-full -mt-5"
        @click="navigate('events')"
      >
        <div class="size-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 text-white hover:bg-blue-600 transition-colors">
          <span class="material-symbols-outlined text-3xl">add</span>
        </div>
      </button>
      <button 
        class="flex flex-col items-center justify-center w-full h-full gap-1"
        :class="currentRoute === 'gallery' ? 'text-primary' : 'text-slate-400 hover:text-white'"
        @click="navigate('gallery')"
      >
        <span class="material-symbols-outlined group-hover:scale-110 transition-transform">photo_library</span>
        <span class="text-[10px] font-medium">Thư viện</span>
      </button>
      <button 
        class="flex flex-col items-center justify-center w-full h-full gap-1"
        :class="currentRoute === 'profile' ? 'text-primary' : 'text-slate-400 hover:text-white'"
        @click="navigate('profile')"
      >
        <span class="material-symbols-outlined group-hover:scale-110 transition-transform" :class="{ 'filled': currentRoute === 'profile' }">person</span>
        <span class="text-[10px] font-medium">Cá nhân</span>
      </button>
    </div>
    <div class="h-5 w-full"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentRoute = computed(() => {
  return route.name
})

const navigate = (routeName) => {
  router.push({ name: routeName })
}
</script>

