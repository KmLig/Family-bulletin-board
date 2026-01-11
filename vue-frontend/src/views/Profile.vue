<template>
  <div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto border-x border-gray-800 shadow-2xl">
    <TopBar title="Hồ sơ thành viên" :show-back="false" :show-menu="true" />
    
    <!-- Scrollable Content -->
    <div class="flex-1 pb-24">
      <!-- Profile Header -->
      <div class="flex flex-col items-center px-4 pt-4 pb-2">
        <div class="relative mb-4">
          <div 
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-surface-dark shadow-xl"
            :style="{ backgroundImage: `url('${member.avatar}')` }"
          ></div>
          <div class="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1.5 border-4 border-background-dark flex items-center justify-center shadow-sm">
            <span class="material-symbols-outlined text-[16px]">edit</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-1">
          <h1 class="text-2xl font-bold leading-tight tracking-[-0.015em] text-center">{{ member.name }}</h1>
          <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span class="text-sm font-medium">Thế hệ thứ {{ member.generation }}</span>
            <span class="size-1 rounded-full bg-slate-500"></span>
            <span class="text-sm font-medium">{{ member.role }}</span>
          </div>
          <div class="flex items-center gap-1.5 mt-1 text-slate-500 dark:text-slate-400 bg-surface-dark px-3 py-1 rounded-full">
            <span class="material-symbols-outlined text-[14px]">cake</span>
            <span class="text-xs font-medium">{{ member.birthDate }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="px-4 py-4 w-full flex gap-3">
        <button class="flex-1 h-10 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Chỉnh sửa hồ sơ</span>
        </button>
        <button class="size-10 bg-surface-dark hover:bg-slate-800 text-white rounded-lg flex items-center justify-center border border-gray-800 transition-colors">
          <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
        </button>
      </div>

      <!-- Bio -->
      <div class="px-4 pb-4">
        <p class="text-slate-600 dark:text-slate-300 text-sm font-normal leading-relaxed text-center">
          {{ member.bio }}
        </p>
      </div>

      <!-- Genealogy Chips -->
      <div class="w-full overflow-x-auto no-scrollbar pb-2">
        <div class="flex px-4 gap-3 min-w-max">
          <button class="flex h-9 items-center gap-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined text-[18px]">account_tree</span>
            <span class="text-sm font-semibold">Xem cây gia phả</span>
          </button>
          <button class="flex h-9 items-center gap-2 px-4 rounded-full bg-surface-dark border border-gray-800 text-slate-300 hover:bg-slate-800 transition-colors">
            <span class="material-symbols-outlined text-[18px]">family_restroom</span>
            <span class="text-sm font-medium">Cha mẹ (2)</span>
          </button>
          <button class="flex h-9 items-center gap-2 px-4 rounded-full bg-surface-dark border border-gray-800 text-slate-300 hover:bg-slate-800 transition-colors">
            <span class="material-symbols-outlined text-[18px]">favorite</span>
            <span class="text-sm font-medium">Vợ chồng (1)</span>
          </button>
          <button class="flex h-9 items-center gap-2 px-4 rounded-full bg-surface-dark border border-gray-800 text-slate-300 hover:bg-slate-800 transition-colors">
            <span class="material-symbols-outlined text-[18px]">child_care</span>
            <span class="text-sm font-medium">Con cái (3)</span>
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar">
        <div class="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-surface-dark p-3 items-center text-center border border-gray-800">
          <p class="text-white text-xl font-bold leading-tight">{{ member.stats.photos }}</p>
          <p class="text-slate-400 text-xs font-medium">Ảnh đã đăng</p>
        </div>
        <div class="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-surface-dark p-3 items-center text-center border border-gray-800">
          <p class="text-white text-xl font-bold leading-tight">{{ member.stats.relatives }}</p>
          <p class="text-slate-400 text-xs font-medium">Người thân</p>
        </div>
        <div class="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-surface-dark p-3 items-center text-center border border-gray-800">
          <p class="text-white text-xl font-bold leading-tight">{{ member.stats.events }}</p>
          <p class="text-slate-400 text-xs font-medium">Sự kiện</p>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="sticky top-[68px] z-40 bg-background-dark pt-2 px-4 pb-2 border-b border-gray-800/50">
        <div class="flex p-1 bg-surface-dark rounded-lg">
          <button class="flex-1 py-1.5 rounded-md bg-gray-700 text-white shadow-sm text-sm font-semibold transition-all">
            Hình ảnh
          </button>
          <button class="flex-1 py-1.5 rounded-md text-slate-400 hover:text-white text-sm font-medium transition-all">
            Tiểu sử
          </button>
          <button class="flex-1 py-1.5 rounded-md text-slate-400 hover:text-white text-sm font-medium transition-all">
            Sự kiện
          </button>
        </div>
      </div>

      <!-- Media Grid -->
      <div class="grid grid-cols-3 gap-1 p-1">
        <div 
          v-for="i in 8" 
          :key="i"
          class="aspect-square relative group overflow-hidden bg-gray-800 rounded-sm"
        >
          <img 
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKE0YiRpKkfHiIsWG4txc66mTzBI7wdowyiRUoJ7H6jLwVlWjp6Y6MkiyL9poyo60dNWxYIiHTs_EKoJQ5nxUe713ulRFaSyCNIGk9gBNQx0vLk8QVGKe3k-we24On74VtQ5R9gLHruWoglFXnWtgCN6FZsU4t9n3dZ9gjCsYgK9odQ4mKG_RT1ShBdJXzctF8OdhZEOzlcVLFOWaWzifPwNt-PqObOqVFbWdIlCwMcQ3fuNcR2OzWuKYsfZwmU-3XzFypBjbXYg4"
            alt="Photo"
          />
        </div>
        <div class="aspect-square relative group overflow-hidden bg-gray-800 rounded-sm bg-gray-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-gray-600 transition-colors">
          <span class="material-symbols-outlined text-[32px] mb-1">add_a_photo</span>
          <span class="text-xs font-medium">Thêm ảnh</span>
        </div>
      </div>

      <!-- Empty State -->
      <div class="mx-4 mt-6 p-6 rounded-xl border border-dashed border-gray-700 bg-surface-dark/30 flex flex-col items-center justify-center text-center">
        <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <span class="material-symbols-outlined text-primary text-2xl">history_edu</span>
        </div>
        <p class="text-white font-semibold mb-1">Chưa có sự kiện nào</p>
        <p class="text-slate-400 text-sm mb-4">Hãy thêm các cột mốc đáng nhớ vào dòng thời gian của {{ member.name }}.</p>
        <button class="text-primary text-sm font-bold hover:underline">Thêm sự kiện ngay</button>
      </div>
      <div class="h-6 w-full"></div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFamilyStore } from '@/stores/useFamilyStore'
import TopBar from '@/components/TopBar.vue'
import BottomNav from '@/components/BottomNav.vue'

const familyStore = useFamilyStore()

const member = computed(() => {
  return familyStore.members[0] || {
    name: 'Nguyễn Văn An',
    generation: 3,
    role: 'Cha',
    birthDate: '12/05/1975',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZTl14P6RI5Uo1nXukGZyRhQRD2MVWpHv6bzxJ7MBX2YBV2kkUkv1kj9PajGIfvqvhGXhjoMFpiotP4I3dTUf5jQ06LkcbDLuWPnDr1fyeT0PgkBSEW4K57Wbqj1p8VgAnkenYcCtWNfGFLkmUqPBGwnnRrMABA0fV9bheCFrpbzQInYqtvszQk2g2YvuC_Zq6heOcrK5T0oGEu-YXJPBm_lRCzPraWlOZ4G0PJAUTztwpOtIrfrsNsD-UeUtsxnjVpBHv4_hJo0s',
    bio: 'Yêu thích câu cá và những buổi BBQ chủ nhật bên gia đình. Luôn trân trọng những giá trị truyền thống và lưu giữ kỷ niệm. 🎣 📸',
    stats: {
      photos: 128,
      relatives: 45,
      events: 12
    }
  }
})
</script>

