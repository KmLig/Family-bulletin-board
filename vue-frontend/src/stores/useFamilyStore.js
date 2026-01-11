import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFamilyStore = defineStore('family', () => {
  const members = ref([
    {
      id: 1,
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
  ])

  const selectedMember = ref(null)

  const selectMember = (memberId) => {
    selectedMember.value = members.value.find(m => m.id === memberId)
  }

  return {
    members,
    selectedMember,
    selectMember
  }
})

