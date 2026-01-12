<template>
  <Modal 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'"
    size="default"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Event Type -->
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Loại sự kiện
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            type="button"
            v-for="type in eventTypes"
            :key="type.value"
            class="p-3 rounded-lg border-2 transition-all"
            :class="formData.type === type.value 
              ? `border-primary bg-primary/10 text-primary` 
              : `border-gray-200 dark:border-gray-700 hover:border-primary/50 text-slate-600 dark:text-slate-400`"
            @click="formData.type = type.value"
          >
            <span class="material-symbols-outlined block mb-1">{{ type.icon }}</span>
            <span class="text-xs font-medium">{{ type.label }}</span>
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Tiêu đề <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.title"
          type="text"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Nhập tiêu đề sự kiện"
        />
      </div>

      <!-- Date -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Ngày <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.date"
            type="date"
            required
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Giờ
          </label>
          <input
            v-model="formData.time"
            type="time"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Địa điểm
        </label>
        <input
          v-model="formData.location"
          type="text"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Nhập địa điểm"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Mô tả
        </label>
        <textarea
          v-model="formData.description"
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Nhập mô tả sự kiện"
        ></textarea>
      </div>

      <!-- Image URL -->
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          URL ảnh
        </label>
        <input
          v-model="formData.image"
          type="url"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://..."
        />
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="$emit('update:modelValue', false)"
      >
        Hủy
      </button>
      <button
        type="button"
        class="px-6 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors font-medium"
        @click="handleSubmit"
      >
        {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import Modal from './Modal.vue'
import { useEventsStore } from '@/stores/useEventsStore'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  event: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const eventsStore = useEventsStore()

const isEdit = computed(() => !!props.event)

const eventTypes = [
  { value: 'birthday', label: 'Sinh nhật', icon: 'cake' },
  { value: 'anniversary', label: 'Kỷ niệm', icon: 'celebration' },
  { value: 'gathering', label: 'Họp mặt', icon: 'diversity_3' }
]

const formData = ref({
  type: 'birthday',
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  image: ''
})

const colorMap = {
  birthday: 'red',
  anniversary: 'orange',
  gathering: 'green'
}

watch(() => props.event, (newEvent) => {
  if (newEvent) {
    formData.value = {
      type: newEvent.type || 'birthday',
      title: newEvent.title || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      location: newEvent.location || '',
      description: newEvent.description || '',
      image: newEvent.image || ''
    }
  } else {
    // Reset form
    formData.value = {
      type: 'birthday',
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      location: '',
      description: '',
      image: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  const eventData = {
    ...formData.value,
    color: colorMap[formData.value.type] || 'blue',
    id: isEdit.value ? props.event.id : Date.now()
  }

  if (isEdit.value) {
    const index = eventsStore.events.findIndex(e => e.id === props.event.id)
    if (index !== -1) {
      eventsStore.events[index] = { ...eventsStore.events[index], ...eventData }
    }
  } else {
    eventsStore.events.push(eventData)
  }

  emit('saved')
  emit('update:modelValue', false)
}
</script>

<script>
import { computed } from 'vue'
</script>

