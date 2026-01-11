<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden relative h-screen w-full flex flex-col">
    <!-- Top App Bar (Fixed) -->
    <header class="z-50 absolute top-0 left-0 w-full bg-background-dark/80 backdrop-blur-md border-b border-white/5">
      <div class="flex items-center p-4 justify-between">
        <button class="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Đại Gia Đình Nguyễn</h2>
        <div class="flex items-center justify-end gap-2">
          <button class="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors">
            <span class="material-symbols-outlined">settings</span>
          </button>
          <button class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <div 
              class="size-6 rounded-full bg-cover bg-center"
              :style="{ backgroundImage: `url('${appStore.currentUser.avatar}')` }"
            ></div>
          </button>
        </div>
      </div>
    </header>

    <!-- Interactive Canvas Area -->
    <main class="flex-1 relative overflow-hidden bg-[#101922] w-full h-full cursor-grab active:cursor-grabbing">
      <!-- Grid Background Pattern -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"></div>
      
      <!-- Floating Search Bar -->
      <div class="absolute top-20 left-4 right-4 z-40 max-w-md mx-auto">
        <div class="flex w-full items-stretch rounded-full h-12 shadow-lg shadow-black/20">
          <div class="text-[#9dabb9] flex border-none bg-[#283039] items-center justify-center pl-4 rounded-l-full border-r-0">
            <span class="material-symbols-outlined">search</span>
          </div>
          <input 
            class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-full text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] placeholder:text-[#9dabb9] px-4 pl-2 text-base font-normal leading-normal" 
            placeholder="Tìm thành viên..." 
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Tree Container -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] scale-100 origin-center w-[1000px] h-[800px]">
        <!-- Connecting Lines (SVG) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-white/20" style="z-index: 0;">
          <path d="M500,120 C500,180 250,150 250,250" fill="none" stroke-width="2"></path>
          <path d="M500,120 C500,180 750,150 750,250" fill="none" stroke-width="2"></path>
          <path d="M250,330 C250,380 150,360 150,450" fill="none" stroke-width="2"></path>
          <path d="M250,330 C250,380 350,360 350,450" fill="none" stroke-width="2"></path>
          <path d="M750,330 C750,380 650,360 650,450" fill="none" stroke-width="2"></path>
          <path d="M750,330 C750,380 850,360 850,450" fill="none" stroke-width="2"></path>
        </svg>

        <!-- Generation 1 (Root) -->
        <div class="absolute top-[40px] left-[500px] -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-10">
          <div class="relative">
            <div class="size-20 rounded-full border-4 border-white/10 bg-gray-700 overflow-hidden shadow-xl group-hover:scale-110 group-hover:border-primary transition-all duration-300">
              <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCccScxpWig4InuGfoAdb580OJhp-IRi9Ad-03S5DqLq5YVktpSTmBwoOBfu1jih8spPLy4Sk_H8tNSUrsawTdacrFN9rjzO5lE5SK4ne4RAo7ah0GkOvyd2cY25dhd33svQYk6pU7yvpWfHUbOSM4LWB7i8EmpP5_3WnlQ24KBZELu9WZ--L_fA_1o09yPHq6z5uF0i7yiu8sf5MQKSUOUGtJHschYz6fIxY5Ai3P_5hlA4oyLz_Le535Pb9SV9PnuVRyTgAkC4GM" alt="Portrait" />
            </div>
            <div class="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm border border-[#101922]">1945</div>
          </div>
          <div class="text-center">
            <p class="text-white text-sm font-bold bg-[#101922]/80 px-2 rounded-md">Nguyễn Thị Cúc</p>
            <p class="text-white/60 text-xs">Bà Nội</p>
          </div>
        </div>

        <!-- Generation 2 - Left -->
        <div class="absolute top-[250px] left-[250px] -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-10">
          <div class="relative">
            <div class="size-20 rounded-full border-4 border-white/10 bg-gray-700 overflow-hidden shadow-xl group-hover:scale-110 group-hover:border-primary transition-all duration-300">
              <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdgeN-jrJYs3lUKAK-QmtUYg4HgbUIs2533hVdI6Gg0OwYoHMHrKKMJpZrWFFKbCWRalkVQxlQqJht07-I31nPEz6hX7Jj9bD5Cx_6k_jVXIsDz7iGYW9OD-iyOJUVASD9BS53aH4RmNyf6cm-UHESFKxsrhIeXfKV1dgesvJzVwbbvctnw4khNPaLli_yTMONqyfxWlr2WbcdMBxmQoiXr09fUiFUOYWV4d9KbPsgbpYF_sYBnDKwZY_HAwgRcXn0LRRl5a-iUA4" alt="Portrait" />
            </div>
            <div class="absolute -bottom-2 -right-2 bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm border border-[#101922]">1970</div>
          </div>
          <div class="text-center">
            <p class="text-white text-sm font-bold bg-[#101922]/80 px-2 rounded-md">Nguyễn Văn Ba</p>
            <p class="text-white/60 text-xs">Bác Cả</p>
          </div>
        </div>

        <!-- Generation 2 - Right (Selected) -->
        <div 
          class="absolute top-[250px] left-[750px] -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-10"
          @click="selectMember(2)"
        >
          <div class="absolute inset-0 -m-4 border border-dashed border-primary/50 rounded-full animate-spin-slow pointer-events-none"></div>
          <div class="relative">
            <div class="size-24 rounded-full border-4 border-primary bg-gray-700 overflow-hidden shadow-2xl shadow-primary/20 scale-110 transition-all duration-300">
              <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyJxdJVWtrQ1dqf-bzzGuwuvNGxq4DgWntLjjooCCbStZu0Y6wjIwsY8vBdId0prhP0eex0lIG1N4nbe59U3ZMTwoDgKb9Mt4gjygCJMc-ebmJF8FVb2Qt1VtS6pHrIkXeggqIKZcLNHmwHQmb25U61xm00en5UrVySHDNF3qykrIs14qUsiPxA0r5aJCJMUo_NUan6jQRxWAsMc-lhPM4oxUtrCjhaiawpuWSmYf3qV5yuc1L2-iaU3uLcw_WTpzqTeGmOQsi1Oo" alt="Portrait" />
            </div>
            <div class="absolute -bottom-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm border border-[#101922]">1975</div>
          </div>
          <div class="text-center mt-1">
            <p class="text-primary text-base font-bold bg-[#101922]/90 px-3 py-0.5 rounded-full shadow-lg">Nguyễn Văn Bốn</p>
            <p class="text-white/80 text-xs">Bố</p>
          </div>
        </div>

        <!-- Generation 3 -->
        <div 
          v-for="(member, index) in gen3Members" 
          :key="index"
          class="absolute top-[450px]"
          :class="gen3Positions[index]"
          @click="selectMember(3 + index)"
        >
          <div class="flex flex-col items-center gap-2 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-10 -translate-x-1/2">
            <div class="size-14 rounded-full border-2 border-white/10 bg-gray-700 overflow-hidden shadow-lg">
              <img class="w-full h-full object-cover" :src="member.avatar" :alt="member.name" />
            </div>
            <p class="text-white text-xs font-medium bg-[#101922]/80 px-1 rounded">{{ member.name }}</p>
          </div>
        </div>
      </div>

      <!-- Floating Controls -->
      <div class="absolute bottom-36 right-4 flex flex-col gap-2 z-40">
        <div class="flex flex-col rounded-lg bg-[#1c2127]/90 backdrop-blur border border-white/10 overflow-hidden shadow-lg">
          <button class="p-3 text-white hover:bg-white/10 active:bg-white/20 transition-colors border-b border-white/5">
            <span class="material-symbols-outlined">add</span>
          </button>
          <button class="p-3 text-white hover:bg-white/10 active:bg-white/20 transition-colors">
            <span class="material-symbols-outlined">remove</span>
          </button>
        </div>
        <button class="p-3 text-white bg-[#1c2127]/90 backdrop-blur border border-white/10 rounded-lg shadow-lg hover:bg-white/10 active:bg-white/20 transition-colors">
          <span class="material-symbols-outlined">center_focus_strong</span>
        </button>
      </div>
    </main>

    <!-- Bottom Detail Sheet -->
    <div v-if="selectedMember" class="absolute bottom-0 left-0 w-full z-50">
      <div class="absolute -top-20 right-4 pointer-events-auto">
        <button class="flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:bg-primary/90 transition-all active:scale-95">
          <span class="material-symbols-outlined !text-[32px]">add</span>
        </button>
      </div>
      <div class="w-full bg-[#1c2127] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] border-t border-white/10 p-5 pb-8">
        <div class="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6"></div>
        <div class="flex items-start justify-between gap-4">
          <div class="flex gap-4">
            <div 
              class="size-20 shrink-0 rounded-2xl bg-center bg-no-repeat bg-cover border-2 border-white/10 shadow-inner"
              :style="{ backgroundImage: `url('${selectedMember.avatar}')` }"
            ></div>
            <div class="flex flex-col pt-1">
              <div class="flex items-center gap-2">
                <h3 class="text-white text-xl font-bold leading-tight">{{ selectedMember.name }}</h3>
                <span class="material-symbols-outlined text-primary text-lg" title="Verified">verified</span>
              </div>
              <p class="text-[#9dabb9] text-sm font-medium mt-1">{{ selectedMember.role }} (1975 - Nay)</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">Trưởng Nam</span>
                <span class="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">Đang sống</span>
              </div>
            </div>
          </div>
          <button class="shrink-0 p-2 text-white/50 hover:text-white transition-colors">
            <span class="material-symbols-outlined">more_vert</span>
          </button>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-6 border-t border-white/5 pt-4">
          <button class="flex flex-col items-center gap-2 group">
            <div class="size-12 rounded-full bg-[#283039] flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary text-white transition-colors">
              <span class="material-symbols-outlined">account_circle</span>
            </div>
            <span class="text-xs text-[#9dabb9] group-hover:text-white">Hồ sơ</span>
          </button>
          <button class="flex flex-col items-center gap-2 group">
            <div class="size-12 rounded-full bg-[#283039] flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary text-white transition-colors">
              <span class="material-symbols-outlined">photo_library</span>
            </div>
            <span class="text-xs text-[#9dabb9] group-hover:text-white">Ảnh (24)</span>
          </button>
          <button class="flex flex-col items-center gap-2 group">
            <div class="size-12 rounded-full bg-[#283039] flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary text-white transition-colors">
              <span class="material-symbols-outlined">family_history</span>
            </div>
            <span class="text-xs text-[#9dabb9] group-hover:text-white">Quan hệ</span>
          </button>
          <button class="flex flex-col items-center gap-2 group">
            <div class="size-12 rounded-full bg-[#283039] flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary text-white transition-colors">
              <span class="material-symbols-outlined">edit</span>
            </div>
            <span class="text-xs text-[#9dabb9] group-hover:text-white">Sửa</span>
          </button>
        </div>
        <button class="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
          Xem chi tiết
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import { useFamilyStore } from '@/stores/useFamilyStore'

const appStore = useAppStore()
const familyStore = useFamilyStore()

const searchQuery = ref('')
const selectedMember = ref(null)

const gen3Members = [
  { name: 'Minh', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD00i2r3W0ku-eAUa7ywzyvMlzPydHihn7zUb564ClgRQr3U2RTMccYy3aKocCcJvfU2bnAdSjlX9ECpUwuqHCZQwqfZvfwT5bT40uAn7FmmimA2G6oVhfdlNjOTtSiqDvdmLy579jZd4vaUyhTp9QWPk-L_7LkR7-pZQDIVoPrNrxV3K61TefEPm74ZCO8Cp-c-VcaxLx-4jbtvJWpYuZkXSVXAOAW0wg8veRUseCEvQBhanf5_Nn0X2BiD2Xwl1h8-YhfuLTGiuA' },
  { name: 'Lan', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF6-WF-eEG6Ro2B4ULlLFA1e5zXuOiLTA0edRIRfen5kB9RmRpNYLTQ4MnnZumknxssLqQYPohMIT_QTfxFMgFfAIbmsRx5NE1n2grTtVfQNvb0hADqL7ZV58Zo1LNjFDlWtfR08UkgDaCThzHkV006ut4VNv-EprWE1Vfyr3CZY_JZoABj63-IPJnqd7Wtzvo3VjVr9EH-SPJg9XjStPGzY4F9ZKWYCniR-pPRW8o6phFc6ExO_GQmbAA9LZFRLxOw-E6pP7rcwo' },
  { name: 'Mai', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTF9beNS196FCma8l4oVFjiaWT-_Ui3DdQ-rx_72oNekEaHJXLasEnJp3BxT9wo43MwtCDUjlyBeAJ0QS7xTYPzZFR2KIzSAtnPxHmoROWQ9TTmcs7OhRD38t1ro3__rkm-BTS7SqMD7Auulb3YWzQem3003JRIvogR7tojGiIruhmsPmaIfKcCNC_lK5eG6KxbjYosVY9FJLwkyEpXgz_WLgfE-uNFtKCHxlj_x2LXVyBNgg1Po4a5lPjCPIT4UMb7WE1bLmA8vg' }
]

const gen3Positions = [
  'left-[150px]',
  'left-[350px]',
  'left-[650px]',
  'left-[850px]'
]

const selectMember = (id) => {
  selectedMember.value = {
    id,
    name: 'Nguyễn Văn Bốn',
    role: 'Bố',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0yB23NHICaZnq0ZFdw5xEX37LrL0Q0Sdu82388xFzj8KE2hY4HgrrTeQfJ04AFQT4kcxxRY2A9Nn2Jdq2e2Rw1D45XpVO0_q26wrO3F2Ahn6rxMtzvFNin0jC2CJG8HGsQIGLCEukdQHcxPMbAIpqU-Hvj_qWuTp3ARg7e8vkzom1rInhV72T6P6Sj4ZqxKCTknWKZUMsRLC1gBs20uM5vd9VszSf6j2KPRabhaYXKfp8qMYZ8mG-z74UPerWw1oejlMUFmwlwmk'
  }
}
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>

