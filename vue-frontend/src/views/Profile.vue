<template>
  <div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md lg:max-w-none mx-auto lg:mx-0 border-x lg:border-x-0 border-gray-800 lg:border-0 shadow-2xl lg:shadow-none">
    <TopBar title="Hồ sơ thành viên" :show-back="false" :show-menu="true" />
    
    <!-- Scrollable Content -->
    <div class="flex-1 pb-24">
      <!-- Profile Header -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:gap-8 items-center px-4 lg:px-8 pt-4 lg:pt-8 pb-2">
        <div class="relative mb-4 lg:mb-0">
          <div 
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 lg:h-40 lg:w-40 border-4 border-surface-dark shadow-xl"
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
      <div class="px-4 lg:px-8 py-4 w-full flex gap-3 lg:max-w-2xl">
        <button class="flex-1 h-10 lg:h-12 bg-primary hover:bg-blue-600 text-white text-sm lg:text-base font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-[18px]">edit_note</span>
          <span>Chỉnh sửa hồ sơ</span>
        </button>
        <button class="size-10 lg:size-12 bg-surface-dark hover:bg-slate-800 text-white rounded-lg flex items-center justify-center border border-gray-800 transition-colors">
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
          <button 
            class="flex-1 py-1.5 rounded-md text-sm font-semibold transition-all"
            :class="activeTab === 'photos' ? 'bg-gray-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'"
            @click="activeTab = 'photos'"
          >
            Hình ảnh
          </button>
          <button 
            class="flex-1 py-1.5 rounded-md text-sm font-medium transition-all"
            :class="activeTab === 'bio' ? 'bg-gray-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'"
            @click="activeTab = 'bio'"
          >
            Tiểu sử
          </button>
          <button 
            class="flex-1 py-1.5 rounded-md text-sm font-medium transition-all"
            :class="activeTab === 'events' ? 'bg-gray-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'"
            @click="activeTab = 'events'"
          >
            Sự kiện
          </button>
        </div>
      </div>

      <!-- Tab Content: Photos -->
      <div v-if="activeTab === 'photos'" class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 lg:gap-2 p-1 lg:p-4 lg:max-w-6xl lg:mx-auto">
        <div 
          v-for="(photo, i) in memberPhotos" 
          :key="i"
          class="aspect-square relative group overflow-hidden bg-gray-800 rounded-sm cursor-pointer"
          @click="openMediaViewer(photo)"
        >
          <img 
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            :src="photo"
            alt="Photo"
          />
        </div>
        <div class="aspect-square relative group overflow-hidden bg-gray-800 rounded-sm bg-gray-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-gray-600 transition-colors">
          <span class="material-symbols-outlined text-[32px] mb-1">add_a_photo</span>
          <span class="text-xs font-medium">Thêm ảnh</span>
        </div>
      </div>

      <!-- Tab Content: Bio -->
      <div v-if="activeTab === 'bio'" class="px-4 lg:px-8 py-6 lg:max-w-3xl lg:mx-auto">
        <div class="bg-surface-dark rounded-xl p-6 space-y-6">
          <div>
            <h4 class="text-white text-lg font-bold mb-3">Thông tin cá nhân</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">cake</span>
                <div>
                  <p class="text-slate-400 text-sm">Ngày sinh</p>
                  <p class="text-white font-medium">{{ member.birthDate }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">account_tree</span>
                <div>
                  <p class="text-slate-400 text-sm">Thế hệ</p>
                  <p class="text-white font-medium">Thế hệ thứ {{ member.generation }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">family_restroom</span>
                <div>
                  <p class="text-slate-400 text-sm">Vai trò</p>
                  <p class="text-white font-medium">{{ member.role }}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-white text-lg font-bold mb-3">Giới thiệu</h4>
            <p class="text-slate-300 leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Tab Content: Events -->
      <div v-if="activeTab === 'events'" class="px-4 lg:px-8 py-6 lg:max-w-4xl lg:mx-auto">
        <div v-if="memberEvents.length > 0" class="space-y-4">
          <EventCard 
            v-for="event in memberEvents" 
            :key="event.id" 
            :event="event"
          />
        </div>
        <div v-else class="mx-4 mt-6 p-6 rounded-xl border border-dashed border-gray-700 bg-surface-dark/30 flex flex-col items-center justify-center text-center">
          <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <span class="material-symbols-outlined text-primary text-2xl">history_edu</span>
          </div>
          <p class="text-white font-semibold mb-1">Chưa có sự kiện nào</p>
          <p class="text-slate-400 text-sm mb-4">Hãy thêm các cột mốc đáng nhớ vào dòng thời gian của {{ member.name }}.</p>
          <button class="text-primary text-sm font-bold hover:underline">Thêm sự kiện ngay</button>
        </div>
      </div>
      <div class="h-6 w-full"></div>
    </div>

    <MediaViewer 
      v-model="showMediaViewer"
      :media="selectedMedia"
      v-if="selectedMedia"
    />
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFamilyStore } from '@/stores/useFamilyStore'
import { useEventsStore } from '@/stores/useEventsStore'
import TopBar from '@/components/TopBar.vue'
import BottomNav from '@/components/BottomNav.vue'
import EventCard from '@/components/EventCard.vue'
import MediaViewer from '@/components/MediaViewer.vue'

const familyStore = useFamilyStore()
const eventsStore = useEventsStore()

const activeTab = ref('photos')
const showMediaViewer = ref(false)
const selectedMedia = ref(null)

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

const memberPhotos = computed(() => {
  return [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKE0YiRpKkfHiIsWG4txc66mTzBI7wdowyiRUoJ7H6jLwVlWjp6Y6MkiyL9poyo60dNWxYIiHTs_EKoJQ5nxUe713ulRFaSyCNIGk9gBNQx0vLk8QVGKe3k-we24On74VtQ5R9gLHruWoglFXnWtgCN6FZsU4t9n3dZ9gjCsYgK9odQ4mKG_RT1ShBdJXzctF8OdhZEOzlcVLFOWaWzifPwNt-PqObOqVFbWdIlCwMcQ3fuNcR2OzWuKYsfZwmU-3XzFypBjbXYg4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCtcOa5k2MN6lAqwXLFvDW8ZT4WoRzB5oTdih1s6HWZSEZ8kL1G0Ige1u1zcCWfv26IDq9mHguGDOLx8AlyzTafATlC6BDzTuGD8wu7eQKILNJmSXcznEZVJaOXDLQnYS5DAM_Faq5jSy4ZVwK-jBQtLh4qlBeiY8q-O-0XQaMiW4CabnZNehfXWG6DFC-ra45nsGQr2DfsSD1wSugHG1E3BhshBF8QfGs623dV7ksOPPHj_bp3zBR990h7NSeROzeYKCU71WOSl8g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PjMLIrVcQ11upG1Y03bruv65LpBoXo-wgt07w_MpvfAwHGVWDsn53VLany6y5aROuMPq9RyP5ctlVAU1218IIn4HtPUySKnKLkO95oN4LBsreN3AYErwXHbYKR94JyvD1vE0h3WK1z84NepSlpk7xKf1V3CFdZIoSfK3CKcTOOFaG1FkBc-9tsamlxcL8YLTTXG63nGRuLOQoDb0gKTzDTRyuZg-l-1-N_BLEZLnbnpJWjZ9Uf1-zYgQoaJVMhFpXfB3913TFN8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7-tC4sN394QM_E9bsEq7Uz2uQ-Z4JYwRubp4599HTRxO3WbxR48-O5vtHxZo2Dro3CihOyBPhUAC9HZODlaRnv7_vMNM13i1qcSVjh5yNV4Z1We2zbeIjFxPQntzjLYJIv9FgacLl_Gmvcypa_j7p87kYCkh_qOYDtewODggvDeZYJB8gq5PMWVns500GQJ0rvPxRSFo-TcV-Ak7DPOZrhQMF4C30Xyc9J7M-rryVfoXSV6qAokIzpv5tn07QtKjJBjmoQyCq0oQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAi6A6vfoBStW4ELybTcGlV0SEXuZncNA88eEAM5l8MMQbLa_-3N9la8dN3eSXlepfHWocD3uGlTpwWoRVQs0bAe_vqK8NJOtE6rwEQvem-guquOOhwtRg1nJ4wGz1iSYgIJ83-jHWqEePealNCmEWImrTVZXurHpya83rKs3adhnqJcBsjQUSQL0weLJyHSMbFGwSmB5OPUXSsQv8YTVGOTvcuC32H7f1di75uMxmmgwrwu8EPImygx5CNDo6cUnaFiaCe011vV2E',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCSB5U3ch-v0mIN-O_T6RgSwvI3lPPGwJVKVpIyn2920V9Sm4s3eHAQCmauDV8sCPZa_Qc9DLypDEr6wQTtCiuA0uCXvnC2zCnjnOGdWaVPDI_eedzTKXxGaNIbfP6F_eaxEE-2v9knXLT_Py_EVlQQZ7MqskirMuk8fA-w_u50WoD8V-gDyli6O0KDaT3ylME-vEWODpDs51CX0oG4nyNnR3535nm08u5_rOYhNvigpuDve6D-lf4ZcDje45B2AA8vFMevOTXHgJA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCuLwObrBDG0OyhxHNXorRSElV88Pvvc9z00InT4iNc7RLHi-Y1-krdhgFR8h9uPIc_CexV1qTQMwkrgLV3MwOGiPVt3pr1op7Et9Zr6LeUbm7NRycoGDp64ye7npk_1taa7vJxz27a-OfwKooQl2lGRKKV4JiFEIOPBOOuztueYesYKAvEQK0loIlLvgOz2bPkSZukIvzMZnYn3s0Xr58hG8xST4hXyym46npj92gDcN7Y2vzJWgmN9TT8WZREccf-6CnZ1Z-_pxw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAw6iS8Gyb-Veezq80Oe8zUpUw0TIi7o0XIafnHT2eMN2lYdd2uCotSPlQf5IT3uk9kUihs__2tN_My8XGlL81JQJmQu8fStBn4qbEvM5Qu0AL6qRyTixg8YtLh7YxQJgtS--BblAczch3JSvQL_eTpd9t68QC24F4T8Y8uBPnJWNQVx9Ole84Ef69rgRF14-RplcQyQ5JzpEjSuTr5yolgsuM5pzpnV2iqTgdgD265oELuQGTPDxrUrDhwO9eea_XNdpzbiGjc2dk'
  ]
})

const memberEvents = computed(() => {
  return eventsStore.events.filter(e => e.memberId === member.value.id || !e.memberId)
})

const openMediaViewer = (photo) => {
  selectedMedia.value = {
    type: 'image',
    url: photo
  }
  showMediaViewer.value = true
}
</script>

