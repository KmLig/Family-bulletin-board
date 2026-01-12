<template>
  <Modal 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    size="full"
  >
    <div class="relative h-full flex items-center justify-center bg-black">
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        @click="$emit('update:modelValue', false)"
      >
        <span class="material-symbols-outlined">close</span>
      </button>

      <!-- Navigation Buttons -->
      <button 
        v-if="hasPrevious"
        class="absolute left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        @click="$emit('previous')"
      >
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <button 
        v-if="hasNext"
        class="absolute right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        @click="$emit('next')"
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </button>

      <!-- Media Content -->
      <div class="w-full h-full flex items-center justify-center p-4">
        <img 
          v-if="media.type === 'image'"
          :src="media.url"
          :alt="media.alt || 'Image'"
          class="max-w-full max-h-full object-contain"
        />
        <video 
          v-else-if="media.type === 'video'"
          :src="media.url"
          controls
          class="max-w-full max-h-full"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Media Info -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div class="flex items-center justify-between">
          <div>
            <p v-if="media.title" class="text-white text-lg font-bold">{{ media.title }}</p>
            <p v-if="media.date" class="text-white/80 text-sm mt-1">{{ media.date }}</p>
          </div>
          <div class="flex items-center gap-3">
            <button 
              class="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              @click="toggleFavorite"
            >
              <span 
                class="material-symbols-outlined"
                :class="{ 'filled text-red-500': media.favorite }"
              >
                favorite
              </span>
            </button>
            <button 
              class="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              @click="$emit('share')"
            >
              <span class="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  media: {
    type: Object,
    required: true
  },
  hasPrevious: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'previous', 'next', 'share'])

const toggleFavorite = () => {
  // Emit event to parent to handle favorite toggle
}
</script>

