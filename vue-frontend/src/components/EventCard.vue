<template>
  <div class="group relative flex overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm transition-all hover:shadow-md border border-transparent dark:border-white/5">
      <div 
        class="absolute left-0 top-0 bottom-0 w-1.5"
        :style="{ backgroundColor: getColor(event.color) }"
      ></div>
    <div class="flex flex-1 flex-col p-4 pl-5">
      <div class="flex items-center gap-2 mb-2">
        <span 
          class="material-symbols-outlined text-[20px]"
          :style="{ color: getColor(event.color) }"
        >
          {{ getEventIcon(event.type) }}
        </span>
        <span 
          class="text-xs font-bold uppercase tracking-wider"
          :style="{ color: getColor(event.color) }"
        >
          {{ getEventTypeLabel(event.type) }}
        </span>
      </div>
      <h4 class="text-[#111418] dark:text-white text-lg font-bold leading-tight mb-1">{{ event.title }}</h4>
      <p v-if="event.date" class="text-primary text-sm font-medium mb-1">{{ formatDate(event.date) }}</p>
      <div class="flex flex-col gap-1 mt-1">
        <div v-if="event.time" class="flex items-center gap-2 text-[#637588] dark:text-[#94a3b8] text-sm">
          <span class="material-symbols-outlined text-[16px]">schedule</span>
          <span>{{ event.time }}</span>
        </div>
        <div v-if="event.location" class="flex items-center gap-2 text-[#637588] dark:text-[#94a3b8] text-sm">
          <span class="material-symbols-outlined text-[16px]">location_on</span>
          <span class="line-clamp-1">{{ event.location }}</span>
        </div>
      </div>
      <div v-if="event.attendees && event.attendees.length > 0" class="flex items-center -space-x-2 mt-4">
        <img 
          v-for="(attendee, index) in event.attendees.slice(0, 3)" 
          :key="index"
          class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#1c242f] object-cover"
          :src="attendee.avatar"
          :alt="attendee.name"
        />
        <div v-if="event.attendees.length > 3" class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-white dark:ring-[#1c242f]">
          <span class="text-xs font-medium text-gray-600 dark:text-gray-300">+{{ event.attendees.length - 3 }}</span>
        </div>
      </div>
      <div v-else class="mt-4">
        <button 
          class="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          @click="handleRSVP"
        >
          <span class="material-symbols-outlined text-base">{{ event.isRSVP ? 'check_circle' : 'add_circle' }}</span>
          {{ event.isRSVP ? 'Đã tham gia' : 'RSVP tham gia' }}
        </button>
      </div>
    </div>
    <div 
      v-if="event.image"
      class="w-28 bg-cover bg-center"
      :style="{ backgroundImage: `url('${event.image}')` }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})

const getEventIcon = (type) => {
  const icons = {
    birthday: 'cake',
    anniversary: 'celebration',
    gathering: 'diversity_3'
  }
  return icons[type] || 'event'
}

const getEventTypeLabel = (type) => {
  const labels = {
    birthday: 'Sinh nhật',
    anniversary: 'Kỷ niệm',
    gathering: 'Họp mặt'
  }
  return labels[type] || 'Sự kiện'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `Ngày ${date.getDate()} tháng ${date.getMonth() + 1}`
}

const getColor = (color) => {
  const colors = {
    red: '#ef4444',
    orange: '#f97316',
    green: '#22c55e'
  }
  return colors[color] || '#137fec'
}

const emit = defineEmits(['rsvp'])

const handleRSVP = () => {
  emit('rsvp', props.event)
}
</script>

