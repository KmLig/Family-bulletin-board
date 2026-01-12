<template>
  <aside 
    v-if="isDesktop"
    class="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-background-dark border-r border-gray-800 flex-col z-40"
  >
    <!-- Logo/Header -->
    <div class="p-6 border-b border-gray-800">
      <h1 class="text-white text-xl font-bold">Gia Đình Tôi</h1>
      <p class="text-slate-400 text-sm mt-1">Family Bulletin Board</p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4">
      <div class="flex flex-col gap-2">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.route }"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="isActive(item.route) 
            ? 'bg-primary/20 text-primary border-l-4 border-primary' 
            : 'text-slate-300 hover:bg-white/5 hover:text-white'"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span class="font-medium">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-gray-800">
      <div class="flex items-center gap-3">
        <div 
          class="h-10 w-10 rounded-full bg-cover bg-center"
          :style="{ backgroundImage: `url('${appStore.currentUser.avatar}')` }"
        ></div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-sm font-medium truncate">{{ appStore.currentUser.name }}</p>
          <p class="text-slate-400 text-xs truncate">Thành viên</p>
        </div>
        <button 
          class="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          @click="appStore.toggleDarkMode"
        >
          <span class="material-symbols-outlined">{{ appStore.isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/useAppStore'

const route = useRoute()
const appStore = useAppStore()

const isDesktop = ref(false)

const checkDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  checkDesktop()
  window.addEventListener('resize', checkDesktop)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDesktop)
})

const navItems = [
  { name: 'home', route: 'home', icon: 'home', label: 'Trang chủ' },
  { name: 'family-tree', route: 'family-tree', icon: 'account_tree', label: 'Cây gia phả' },
  { name: 'events', route: 'events', icon: 'event', label: 'Sự kiện' },
  { name: 'gallery', route: 'gallery', icon: 'photo_library', label: 'Thư viện' },
  { name: 'profile', route: 'profile', icon: 'person', label: 'Cá nhân' }
]

const isActive = (routeName) => {
  return route.name === routeName
}
</script>

