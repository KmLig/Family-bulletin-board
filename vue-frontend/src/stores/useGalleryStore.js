import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGalleryStore = defineStore('gallery', () => {
  const media = ref([
    {
      id: 1,
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwmjpcKc5eNtqyyic37xaIR_rhk7y81FREnS9fPyVELWsmRPFSUdh4I2GnN0AudlUA-AKvzpMLv2D719Sq2lxOhn9_OTbIBZoNcv1syZsS2bbe7Fx0IBNBA2CkNsGUGP4IHYXL9Pd5mJC4AXCqvypmYOJNauWSD0ePp_Ccz2-OcXXB_sWB0iD6PfWF3QS5A3_4W4mNzm6JtpMy0qcwlQN_BA0YDqkfGd38jQ2JXEx6Um6dV0V9-XtB3v4vXK_dygON4xEztIbYZE',
      date: '2024-02',
      month: 'Tháng 2, 2024',
      event: 'Tết Giáp Thìn'
    },
    {
      id: 2,
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGGH6o4uW48ZVLPrBIS6cJ2lnMOA49qWolAPL3_UkOaNxwUrh83mfayNzP7sRM48gMHVZ6sg1Ryhn_LbmE-nEMjbB7F5NC1aZexOIsQrNY-ux1sWgHG3zyuPlcy7YiqN53u4ozw3_lM0t6Hjoyxyx7HzLrR3ikgSNbVvN_-tTSsx-qt1oxTxoHu4_2D_VAbVGAhLCd7Xxc6K_iFBmM0Cz4o-dGV-VTsHQQTKST4HcEyVSRbthKBYcy6_aA3KNSMUSMSSW0DezZIh4',
      date: '2024-02',
      month: 'Tháng 2, 2024'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxCy86RbHUcp8bGIgBEzkVCkRNXz0CiROrjopOHYNxRy5f4fA54wzw8CusXSVtBOAd6UcpiKSPXubAPIwB7z22oDF-Rb7VpZUSkB7PoF1LQu27ZILclQKO0OORXuk_fk07J0yWCZTNbZvFWDqBwrOQr7stuYqnRiJ5k-FoK6IDtFBNIcCelz1768EfdvN8rv5nbainJBkyoe4dtyExAc1FPZhRUSw_iGiiPunbTnXG8X-ZDAZKFw-MbjoQr2iUU7433M6oMjZL0E',
      date: '2024-02',
      month: 'Tháng 2, 2024',
      duration: '0:45'
    }
  ])

  const viewMode = ref('timeline')
  const filter = ref('all')

  return {
    media,
    viewMode,
    filter
  }
})

