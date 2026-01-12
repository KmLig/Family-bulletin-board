<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-[88px] lg:pb-0 max-w-md lg:max-w-none mx-auto lg:mx-0 border-x lg:border-x-0 border-gray-800 lg:border-0 shadow-2xl lg:shadow-none">
    <!-- Top App Bar -->
    <div class="flex items-center bg-background-light dark:bg-background-dark p-4 lg:p-6 pb-2 justify-between sticky top-0 z-20 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 lg:bg-opacity-100">
      <h2 class="text-slate-900 dark:text-white text-xl lg:text-2xl font-bold leading-tight tracking-tight flex-1">Gia Đình Tôi</h2>
      <div class="flex gap-3 items-center justify-end">
        <button class="flex items-center justify-center rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <span class="material-symbols-outlined" style="font-size: 24px;">add_a_photo</span>
        </button>
        <button class="flex items-center justify-center rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-transparent text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <span class="material-symbols-outlined" style="font-size: 28px;">notifications</span>
          <span class="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </div>
    </div>

    <!-- Greeting Headline -->
    <div class="px-4 lg:px-8 pb-2 pt-2 lg:pt-4">
      <p class="text-slate-500 dark:text-slate-400 text-sm lg:text-base font-medium">{{ currentDate }}</p>
      <h2 class="text-slate-900 dark:text-white tracking-tight text-[28px] lg:text-3xl font-bold leading-tight pt-1">
        Chào {{ appStore.currentUser.name }}! 👋
      </h2>
    </div>

    <!-- Events Section -->
    <div>
      <div class="flex items-center justify-between px-4 lg:px-8 pt-6 pb-3">
        <h3 class="text-slate-900 dark:text-white text-lg lg:text-xl font-bold leading-tight tracking-tight">Sự kiện sắp tới</h3>
        <router-link to="/events" class="text-primary text-sm lg:text-base font-semibold">Xem tất cả</router-link>
      </div>
      <!-- Horizontal Scroll Container -->
      <div class="flex overflow-x-auto no-scrollbar pb-2 px-4 lg:px-8 gap-3 snap-x snap-mandatory lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:snap-none">
        <div 
          v-for="event in upcomingEvents" 
          :key="event.id"
          class="snap-start flex-none w-[280px] lg:w-auto bg-surface-light dark:bg-surface-dark rounded-xl p-3 lg:p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-3"
        >
          <div class="relative w-full aspect-video rounded-lg overflow-hidden">
            <div 
              class="w-full h-full bg-center bg-cover transition-transform hover:scale-105 duration-500"
              :style="{ backgroundImage: `url('${event.image}')` }"
            ></div>
            <div class="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              {{ getDaysUntil(event.date) }}
            </div>
          </div>
          <div>
            <p class="text-slate-900 dark:text-white text-base font-bold leading-snug">{{ event.title }}</p>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-base">calendar_month</span>
              {{ formatDate(event.date) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Memories / On This Day -->
    <div class="mt-2">
      <h3 class="text-slate-900 dark:text-white text-lg lg:text-xl font-bold leading-tight tracking-tight px-4 lg:px-8 pb-3 pt-4">Kỷ niệm hôm nay</h3>
      <div class="px-4 lg:px-8 lg:max-w-4xl">
        <div class="relative w-full h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          <div 
            class="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI-FLyoHJ0dN38_3iVvuhv2l2uVGC-0x-q3-Dw_oxnHUPFhYOgpNBQBimfrvPXMLTYoAZg3tdwM8XuQnB_EZFYMiX7aOA39k6NRZR0qUMkDeBIouofkV1rp1l-DZqmbAOfN8sZ7zN4djFVeg8ZFGpOq_FZ-Ty-diIETHSodHA-McnUZdEjCuIYHWVE9MJzCT7Kn-qYi4nJUqH0WPAavv4thtCIVWBaEHvu6LK628tTlTdBIumqOWleiwL_L6T8jOfRdi_GyGyFOH0')"
          ></div>
          <div class="absolute top-3 right-3 z-20 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">history</span>
            5 năm trước
          </div>
          <div class="absolute bottom-0 left-0 w-full p-4 z-20">
            <p class="text-white text-lg font-bold">Kỷ niệm ngày cưới Bố Mẹ</p>
            <p class="text-white/80 text-sm">15 Tháng 4, 2019 • 12 ảnh</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Feed -->
    <div class="mt-2">
      <h3 class="text-slate-900 dark:text-white text-lg lg:text-xl font-bold leading-tight tracking-tight px-4 lg:px-8 pb-3 pt-6">Bảng tin gia đình</h3>
      <div class="px-4 lg:px-8 flex flex-col gap-4 lg:max-w-4xl lg:mx-auto">
        <FeedCard 
          v-for="post in feedStore.posts" 
          :key="post.id" 
          :post="post"
        />
      </div>
    </div>

    <div class="h-6"></div>
    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import { useEventsStore } from '@/stores/useEventsStore'
import { useFeedStore } from '@/stores/useFeedStore'
import BottomNav from '@/components/BottomNav.vue'
import FeedCard from '@/components/FeedCard.vue'

const appStore = useAppStore()
const eventsStore = useEventsStore()
const feedStore = useFeedStore()

const currentDate = computed(() => {
  const date = new Date()
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  const months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12']
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
})

const upcomingEvents = computed(() => {
  return eventsStore.events.slice(0, 2)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getDate()} tháng ${date.getMonth() + 1}`
}

const getDaysUntil = (dateString) => {
  const today = new Date()
  const eventDate = new Date(dateString)
  const diffTime = eventDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return 'Ngày mai'
  if (diffDays < 7) return `${diffDays} ngày nữa`
  if (diffDays < 14) return 'Chủ Nhật tới'
  return `${Math.ceil(diffDays / 7)} tuần nữa`
}
</script>

