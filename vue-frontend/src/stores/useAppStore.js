import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDarkMode = ref(true)
  const currentUser = ref({
    id: 1,
    name: 'Minh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD00i2r3W0ku-eAUa7ywzyvMlzPydHihn7zUb564ClgRQr3U2RTMccYy3aKocCcJvfU2bnAdSjlX9ECpUwuqHCZQwqfZvfwT5bT40uAn7FmmimA2G6oVhfdlNjOTtSiqDvdmLy579jZd4vaUyhTp9QWPk-L_7LkR7-pZQDIVoPrNrxV3K61TefEPm74ZCO8Cp-c-VcaxLx-4jbtvJWpYuZkXSVXAOAW0wg8veRUseCEvQBhanf5_Nn0X2BiD2Xwl1h8-YhfuLTGiuA'
  })

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  return {
    isDarkMode,
    currentUser,
    toggleDarkMode
  }
})

