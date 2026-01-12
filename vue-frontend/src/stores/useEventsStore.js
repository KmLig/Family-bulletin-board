import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
  const events = ref([
    {
      id: 1,
      type: 'birthday',
      title: 'Bà Nội tròn 80 tuổi',
      date: '2023-11-05',
      time: '18:00 - 21:00',
      location: 'Nhà hàng Sen Tây Hồ, Hà Nội',
      color: 'red',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBle5kWcKhWR_K-EKO9SoYValMzfJGK0321sLKWV3BuzYQsIINkUDL6qTwabgCQJvbxx9hC-A5MuXaFs1gme5TgiIa_6JuAh0UsJJzV-zmYIkfGwfhQvdEIvCUznbl2-LLmEk68vdtQlJke9yPx9hi9HD_uNTpBZvj6aj9LMnL9hdKvpHenbHcJZTe9yErSGU7vwA5hj9GKVVmxXUZLCuTJCuQwVdP6YRMaAdm69WUEbTNqjyQkNJk3-DlpgxM_H-k-26i6mxddC10',
      attendees: [],
      isRSVP: false
    },
    {
      id: 2,
      type: 'anniversary',
      title: '30 năm ngày cưới Bác Cả',
      date: '2023-11-15',
      location: 'Tại gia (Nhà thờ họ)',
      color: 'orange',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_nfd7ITmgueGlqgXNI7cLrDQUnuKyaNI3z8Cdxop62XtDUlEO7R2bDxUeMGOP0-QBeDbxu1S0SpB3b0Faxbk1vL92bNIF2pQnc9F0N6qGKOzcgCjETpOYKAuSURFEpI_5bME7pVNiSmcFHh0rpsRgiW5c_oCFgBEBHkE2ymnWOaRyypy_2oOEodA2pVttSZFJO-3BJpQIc7biIvxE1oWhYPa_BrNU-UlsOSU7fersJtv71bRHyJTLShPYIatu4Tth_2HAiDbJfbo'
    },
    {
      id: 3,
      type: 'gathering',
      title: 'Họp mặt Chi 2',
      date: '2023-11-20',
      location: 'Công viên Yên Sở',
      color: 'green',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTzAcm4_UPIrrOhCJYiQS7tEaNWGmiClIATJJ1MQ2fyP18qZH-jq9yW2U3kO-cIUXz67r_u34XSAd5ecSnkiOqHZ9sPRWcS2T956HPontnjMCKBeC1fnL-NSk5e220rQqqoLgFJpJpb1a4xCS32OSrO1j3BVVYuCY7iuPtiP1fDpeeH0BX2Kv-XwKNt_4DnHBSua_f62rMj4QldIGU5YI4GpRw2uLQfKxclTqX8cI0r46jCkuJ0hnsCFTYFQcm85ebicyKrSzl-HM'
    }
  ])

  const currentMonth = ref(new Date())
  const selectedDate = ref(new Date('2023-11-05'))

  return {
    events,
    currentMonth,
    selectedDate
  }
})

