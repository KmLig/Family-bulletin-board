<template>
  <div class="relative flex h-full w-full flex-col overflow-x-hidden pb-24 lg:pb-0 max-w-md lg:max-w-none mx-auto lg:mx-0 border-x lg:border-x-0 border-gray-800 lg:border-0 shadow-2xl lg:shadow-none">
    <!-- Header -->
    <header class="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-4 py-3 backdrop-blur-md">
      <h2 class="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Lịch Gia Đình</h2>
      <div class="flex items-center gap-3">
        <button class="relative flex h-10 w-10 items-center justify-center rounded-full text-[#111418] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined text-[24px]">notifications</span>
          <span class="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background-light dark:border-background-dark"></span>
        </button>
        <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-400 p-0.5">
          <img 
            alt="User avatar" 
            class="h-full w-full rounded-full object-cover"
            :src="appStore.currentUser.avatar"
          />
        </div>
      </div>
    </header>

    <!-- Calendar Widget -->
    <section class="flex flex-col items-center justify-center px-4 lg:px-8 py-2 lg:py-4">
      <div class="w-full max-w-md lg:max-w-2xl rounded-2xl bg-surface-light dark:bg-surface-dark p-4 lg:p-6 shadow-sm">
        <!-- Month Navigator -->
        <div class="flex items-center justify-between mb-4 px-2">
          <button 
            class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#111418] dark:text-white transition-colors"
            @click="previousMonth"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <p class="text-[#111418] dark:text-white text-base font-bold">{{ currentMonthText }}</p>
          <button 
            class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#111418] dark:text-white transition-colors"
            @click="nextMonth"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
        <!-- Days of Week -->
        <div class="grid grid-cols-7 mb-2">
          <div 
            v-for="day in daysOfWeek" 
            :key="day"
            class="text-[#637588] dark:text-[#94a3b8] text-xs font-bold text-center py-1"
          >
            {{ day }}
          </div>
        </div>
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-y-2">
          <div 
            v-for="day in calendarDays" 
            :key="day.key"
            class="h-9 w-full"
          >
            <button 
              v-if="day.value"
              class="h-9 w-full flex items-center justify-center rounded-full text-[#111418] dark:text-white text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 relative"
              :class="{
                'bg-primary text-white shadow-md shadow-primary/30': day.isSelected,
                'text-[#111418] dark:text-white': !day.isSelected
              }"
              @click="selectDate(day.value)"
            >
              {{ day.value }}
            <span 
              v-if="day.hasEvent" 
              class="absolute bottom-1.5 h-1 w-1 rounded-full"
              :style="{ backgroundColor: getEventColor(day.eventColor) }"
            ></span>
            </button>
          </div>
        </div>
        <div class="flex justify-center mt-2">
          <div class="h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </section>

      <!-- Filter Chips -->
    <section class="flex gap-3 px-4 lg:px-8 py-3 overflow-x-auto scrollbar-hide lg:justify-center">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-transform active:scale-95"
        :class="selectedFilter === filter.value 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-[#111418] dark:text-gray-300'"
        @click="selectedFilter = filter.value"
      >
        <span class="text-sm font-medium">{{ filter.label }}</span>
      </button>
    </section>

    <!-- Events List -->
    <div class="flex flex-col gap-2 lg:max-w-4xl lg:mx-auto">
      <!-- Section: Today -->
      <div v-if="todayEvents.length > 0">
        <h3 class="text-[#111418] dark:text-white text-lg lg:text-xl font-bold leading-tight px-5 lg:px-8 py-3 flex items-center gap-2">
          Hôm nay
          <span class="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">{{ todayDate }}</span>
        </h3>
        <div class="px-4 lg:px-8">
          <EventCard 
            v-for="event in todayEvents" 
            :key="event.id" 
            :event="event"
            @rsvp="handleRSVP"
          />
        </div>
      </div>

      <!-- Section: Upcoming -->
      <div v-if="upcomingEvents.length > 0">
        <h3 class="text-[#111418] dark:text-white text-lg lg:text-xl font-bold leading-tight px-5 lg:px-8 py-3 mt-2">Sắp tới</h3>
        <div class="px-4 lg:px-8 flex flex-col gap-4 lg:grid lg:grid-cols-2">
          <EventCard 
            v-for="event in upcomingEvents" 
            :key="event.id" 
            :event="event"
            @rsvp="handleRSVP"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEvents.length === 0" class="mt-6 px-8 py-8 flex flex-col items-center justify-center opacity-60">
        <div class="rounded-full bg-surface-light dark:bg-surface-dark p-4 mb-3">
          <span class="material-symbols-outlined text-4xl text-gray-400">event_note</span>
        </div>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">Không có sự kiện nào khác trong tháng này</p>
        <button class="mt-2 text-primary text-sm font-bold">Xem tháng sau</button>
      </div>
    </div>

    <!-- FAB: Add Event -->
    <button 
      class="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_16px_rgba(19,127,236,0.3)] transition-transform hover:scale-105 active:scale-95 group"
      @click="showEventForm = true"
    >
      <span class="material-symbols-outlined text-[28px] transition-transform group-hover:rotate-90">add</span>
    </button>

    <!-- Event Form Modal -->
    <EventForm 
      v-model="showEventForm"
      @saved="handleEventSaved"
    />

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import { useEventsStore } from '@/stores/useEventsStore'
import BottomNav from '@/components/BottomNav.vue'
import EventCard from '@/components/EventCard.vue'
import EventForm from '@/components/EventForm.vue'

const showEventForm = ref(false)

const handleEventSaved = () => {
  // Event saved, refresh if needed
}

const handleRSVP = (event) => {
  const eventIndex = eventsStore.events.findIndex(e => e.id === event.id)
  if (eventIndex !== -1) {
    const currentEvent = eventsStore.events[eventIndex]
    if (!currentEvent.isRSVP) {
      // Add current user to attendees
      if (!currentEvent.attendees) {
        currentEvent.attendees = []
      }
      currentEvent.attendees.push({
        name: 'Bạn',
        avatar: appStore.currentUser.avatar
      })
      currentEvent.isRSVP = true
    } else {
      // Remove from attendees
      if (currentEvent.attendees) {
        currentEvent.attendees = currentEvent.attendees.filter(a => a.name !== 'Bạn')
      }
      currentEvent.isRSVP = false
    }
  }
}

const appStore = useAppStore()
const eventsStore = useEventsStore()

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const selectedFilter = ref('all')

const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'birthday', label: 'Sinh nhật' },
  { value: 'anniversary', label: 'Kỷ niệm' },
  { value: 'gathering', label: 'Họp mặt' }
]

const currentMonthText = computed(() => {
  const month = new Date(eventsStore.currentMonth)
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
  return `${months[month.getMonth()]}, ${month.getFullYear()}`
})

const todayDate = computed(() => {
  const today = new Date()
  return `${today.getDate()} tháng ${today.getMonth() + 1}`
})

const calendarDays = computed(() => {
  const month = new Date(eventsStore.currentMonth)
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const startDay = firstDay.getDay()
  const days = []
  
  // Empty slots for previous month
  for (let i = 0; i < startDay; i++) {
    days.push({ value: null, key: `empty-${i}` })
  }
  
  // Days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(month.getFullYear(), month.getMonth(), day)
    const dateString = date.toISOString().split('T')[0]
    const event = eventsStore.events.find(e => e.date === dateString)
    const selectedDate = new Date(eventsStore.selectedDate)
    const isSelected = selectedDate.toISOString().split('T')[0] === dateString
    
      days.push({
      value: day,
      key: dateString,
      isSelected,
      hasEvent: !!event,
      eventColor: event ? event.color : ''
    })
  }
  
  return days
})

const filteredEvents = computed(() => {
  if (selectedFilter.value === 'all') {
    return eventsStore.events
  }
  return eventsStore.events.filter(e => e.type === selectedFilter.value)
})

const todayEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return filteredEvents.value.filter(e => e.date === today)
})

const upcomingEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return filteredEvents.value.filter(e => e.date > today)
})

const previousMonth = () => {
  const newDate = new Date(eventsStore.currentMonth)
  newDate.setMonth(newDate.getMonth() - 1)
  eventsStore.currentMonth = newDate
}

const nextMonth = () => {
  const newDate = new Date(eventsStore.currentMonth)
  newDate.setMonth(newDate.getMonth() + 1)
  eventsStore.currentMonth = newDate
}

const selectDate = (day) => {
  const month = new Date(eventsStore.currentMonth)
  const date = new Date(month.getFullYear(), month.getMonth(), day)
  eventsStore.selectedDate = date
}

const getEventColor = (color) => {
  if (!color) return ''
  const colorMap = {
    'red': '#ef4444',
    'orange': '#f97316',
    'green': '#22c55e'
  }
  return colorMap[color] || '#137fec'
}
</script>

