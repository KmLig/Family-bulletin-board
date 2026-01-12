<template>
  <div class="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display overflow-hidden h-screen flex flex-col max-w-md lg:max-w-none mx-auto lg:mx-0 border-x lg:border-x-0 border-gray-800 lg:border-0 shadow-2xl lg:shadow-none">
    <!-- Top Navigation & Controls Container -->
    <div class="flex-none bg-background-light dark:bg-background-dark z-20 shadow-sm dark:shadow-none pb-2">
      <!-- Top App Bar -->
      <div class="flex items-center p-4 pb-2 justify-between">
        <button 
          class="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="$router.back()"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Thư viện gia đình</h2>
      </div>
      <!-- Search Bar -->
      <div class="px-4 py-2">
        <label class="flex flex-col w-full">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-10 bg-surface-light dark:bg-surface-dark shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-primary">
            <div class="text-[#9dabb9] flex items-center justify-center pl-3 pr-2">
              <span class="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              class="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-[#111418] dark:text-white focus:outline-0 placeholder:text-[#9dabb9] text-sm font-normal leading-normal border-none" 
              placeholder="Tìm kiếm khoảnh khắc, người thân..." 
              v-model="searchQuery"
              @input="handleSearch"
            />
            <div class="text-[#9dabb9] flex items-center justify-center pr-3 pl-2 cursor-pointer hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">tune</span>
            </div>
          </div>
        </label>
      </div>
      <!-- Segmented Control -->
      <div class="flex px-4 py-2">
        <div class="flex h-10 flex-1 items-center justify-center rounded-lg bg-surface-light dark:bg-surface-dark p-1 ring-1 ring-gray-200 dark:ring-gray-800">
          <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[6px] transition-all has-[:checked]:bg-primary has-[:checked]:shadow-sm has-[:checked]:text-white text-[#637588] dark:text-[#9dabb9] text-sm font-semibold leading-normal">
            <span class="truncate">Dòng thời gian</span>
            <input 
              checked 
              class="invisible w-0 absolute" 
              name="view-mode" 
              type="radio" 
              value="timeline"
              v-model="galleryStore.viewMode"
            />
          </label>
          <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[6px] transition-all has-[:checked]:bg-primary has-[:checked]:shadow-sm has-[:checked]:text-white text-[#637588] dark:text-[#9dabb9] text-sm font-semibold leading-normal">
            <span class="truncate">Album</span>
            <input 
              class="invisible w-0 absolute" 
              name="view-mode" 
              type="radio" 
              value="album"
              v-model="galleryStore.viewMode"
            />
          </label>
        </div>
      </div>
      <!-- Filter Chips -->
      <div class="flex gap-2 px-4 py-1 overflow-x-auto no-scrollbar">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 border border-transparent"
          :class="galleryStore.filter === filter.value 
            ? 'bg-primary text-white' 
            : 'bg-surface-light dark:bg-surface-dark text-[#111418] dark:text-white border-gray-200 dark:border-gray-700'"
          @click="galleryStore.filter = filter.value"
        >
          <span class="text-sm font-medium leading-normal">{{ filter.label }}</span>
        </button>
      </div>
    </div>

    <!-- Main Content Area (Scrollable) -->
    <div class="flex-1 overflow-y-auto no-scrollbar pb-24 relative bg-background-light dark:bg-background-dark">
      <!-- Timeline Sections -->
      <div 
        v-for="(section, index) in filteredSections" 
        :key="index"
        class="pt-4 lg:pt-6"
        :class="{ 'pt-6 lg:pt-8': index > 0 }"
      >
        <div class="flex justify-between items-baseline px-4 pb-2">
          <h3 class="text-[#111418] dark:text-white text-xl font-bold leading-tight">{{ section.month }}</h3>
          <span v-if="section.event" class="text-sm text-[#637588] dark:text-[#9dabb9]">{{ section.event }}</span>
        </div>
        <div 
          class="grid gap-0.5 px-0.5"
          :class="section.gridClass"
        >
          <div 
            v-for="item in section.items" 
            :key="item.id"
            class="relative aspect-square group cursor-pointer overflow-hidden bg-gray-200 dark:bg-gray-800"
            :class="item.span"
            @click="openMedia(item)"
          >
            <img 
              v-if="item.type === 'image'"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              :src="item.url"
              :alt="item.alt"
            />
            <div v-else class="w-full h-full relative">
              <img 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                :src="item.url"
                :alt="item.alt"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black/30 backdrop-blur-sm rounded-full p-2">
                  <span class="material-symbols-outlined text-white">play_arrow</span>
                </div>
              </div>
              <div v-if="item.duration" class="absolute bottom-1 right-1 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                {{ item.duration }}
              </div>
            </div>
            <div v-if="item.favorite" class="absolute top-2 right-2">
              <span class="material-symbols-outlined text-white drop-shadow-md">favorite</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="absolute bottom-20 right-4 z-30">
      <button class="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform">
        <span class="material-symbols-outlined text-[32px]">add</span>
      </button>
    </div>

    <!-- Media Viewer Modal -->
    <MediaViewer 
      v-model="showMediaViewer"
      :media="selectedMedia"
      :has-previous="currentMediaIndex > 0"
      :has-next="currentMediaIndex < allMedia.length - 1"
      @previous="previousMedia"
      @next="nextMedia"
      v-if="selectedMedia"
    />

    <!-- Bottom Navigation Bar -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGalleryStore } from '@/stores/useGalleryStore'
import BottomNav from '@/components/BottomNav.vue'
import MediaViewer from '@/components/MediaViewer.vue'

const galleryStore = useGalleryStore()

const searchQuery = ref('')

const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'image', label: 'Ảnh' },
  { value: 'video', label: 'Video' },
  { value: 'favorite', label: 'Yêu thích' }
]

const filteredSections = computed(() => {
  let sections = [
    {
      month: 'Tháng 2, 2024',
      event: 'Tết Giáp Thìn',
      gridClass: 'grid-cols-3',
      items: [
        { id: 1, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwmjpcKc5eNtqyyic37xaIR_rhk7y81FREnS9fPyVELWsmRPFSUdh4I2GnN0AudlUA-AKvzpMLv2D719Sq2lxOhn9_OTbIBZoNcv1syZsS2bbe7Fx0IBNBA2CkNsGUGP4IHYXL9Pd5mJC4AXCqvypmYOJNauWSD0ePp_Ccz2-OcXXB_sWB0iD6PfWF3QS5A3_4W4mNzm6JtpMy0qcwlQN_BA0YDqkfGd38jQ2JXEx6Um6dV0V9-XtB3v4vXK_dygON4xEztIbYZE', alt: 'Family gathering' },
        { id: 2, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGGH6o4uW48ZVLPrBIS6cJ2lnMOA49qWolAPL3_UkOaNxwUrh83mfayNzP7sRM48gMHVZ6sg1Ryhn_LbmE-nEMjbB7F5NC1aZexOIsQrNY-ux1sWgHG3zyuPlcy7YiqN53u4ozw3_lM0t6Hjoyxyx7HzLrR3ikgSNbVvN_-tTSsx-qt1oxTxoHu4_2D_VAbVGAhLCd7Xxc6K_iFBmM0Cz4o-dGV-VTsHQQTKST4HcEyVSRbthKBYcy6_aA3KNSMUSMSSW0DezZIh4', alt: 'Happy family' },
        { id: 3, type: 'video', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxCy86RbHUcp8bGIgBEzkVCkRNXz0CiROrjopOHYNxRy5f4fA54wzw8CusXSVtBOAd6UcpiKSPXubAPIwB7z22oDF-Rb7VpZUSkB7PoF1LQu27ZILclQKO0OORXuk_fk07J0yWCZTNbZvFWDqBwrOQr7stuYqnRiJ5k-FoK6IDtFBNIcCelz1768EfdvN8rv5nbainJBkyoe4dtyExAc1FPZhRUSw_iGiiPunbTnXG8X-ZDAZKFw-MbjoQr2iUU7433M6oMjZL0E', alt: 'Children playing', duration: '0:45' },
        { id: 4, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM-P7kGBQp1PPwhP0AvOGEmS6OST_lMErANzt13vYC9uX9P8CPW_WN-Oaqb1KWYwFuz1AGR69KtpkPP_C-A1uLE0TW8kdF-uXjdYzi35V_nJed__abHPjc4JgBOavfJM9_g3TT4nZlShsKXEWV9b0Iu7pGw2_MacqIgzL4zQJnzOeHUSsrftLYGwh7V1mTEM8OpuDIR1p4ErN1HxoJRXQ00LieA4YPrfyXg4A7H7rsyxLS5GJhiDAwW26nFrek4idY3rjOX8i_Syg', alt: 'Food banquet' },
        { id: 5, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiC4onozGgEG7sGWOkqXdgJh4p8XLvs_aLgypABO4LkUfGKTPzO8_G_ha6e7KLW8yopvMpnE06lYgxhJBoE7-ErHB-WCHWRKMwQ28E7HLE-MT6ISbs97Bir3Cs9kseEYtWRhQvgv-MmTbtUeMDShn3Wri6FQXF17GgQoXjWpa0K9xEQkjMaHPd6rvm_WWb_ayZkha2wdN42x492voZh5xT-cP-7FIs_PBYrO7IE8AqLXSExDTuLkTTdXORPSeavdaQlt5O_6HcTX8', alt: 'Grandparents' },
        { id: 6, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNgjgVsuWpwsdDVGga5WDIN1WoWtvTVXt6LBDoAcwpvnPOj-Gy6VOtLQCiZqEXH3jKblnHYmCKjlocuwLsqOL3983lTo-kHgSfPn-s-_14QExWLYyby9p_bLggMGX333YT8XghocPfZBud_v9jqN6AMPvwTxrjw6GK9pMMLDdcFEXgrYXTCXWpt2_tmfboXrm60B9BTPXtlsmltb-spwB_mBAHl9HRB6eoXb9TrraNkiEaBRpxJjxDn8eXgH31kxSsqSEuPYzCwsk', alt: 'Family group' }
      ]
    },
    {
      month: 'Tháng 12, 2023',
      gridClass: 'grid-cols-3',
      items: [
        { id: 7, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD20ux9Sk9LyLLVG7VFeJ52VY8r9AWIy8saEB9DfrAmyiDiHVDgCpT3WkK5wVYBHX2YiD_hbAFEYhfKSSiRwP8ZEbMCCMYBaPcKNAcNjxb2j3Ko-Y7JxX4Sm7pTovfsLdAaEd1izMKS_bEkh5oSJ3976PUI54yhEwzKyNTPEx0y8j_rwhCBP6qVagBCnTBueFLDZ3cMNzouvAFMMQwOiIM_lA_Gi5LDhVd4ZVkLhbTx-6ezRqfUQhrBQKJgThTVXATXvmMYaJ92I74', alt: 'Christmas tree', span: 'col-span-2 row-span-2', favorite: true },
        { id: 8, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDOCYtS0Ofig14A9Wvr4T733n8fGNjcZMj0wd0zh8jJjpLBtpeZ16oKQU_ZFmo2GKr-2U-vnNEhOScYePrek4Qv5wwI9HmR0dzHDrzBZ0_3EyOku3qHUXw77x6p58fqNEHcBinBnY5P9bnFkdQXd6cBQ35OwPo81a-2VieH-ovDnabpRk9Ol9Ooc9H7mEvLwTcXQI9-Wnomxk9puJhqycIOKyWCetsv86gS7DCqTKSY40FavLb3Konj55YfYeGkY_aVl02e5EDC2k', alt: 'Decorating' },
        { id: 9, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtLAGC7WLqju1xR5uXlDSuxY5CW0mw7jrZaSbVbWuXDsiCTSzeJKK7Of9N1C7WI9z3db6EWwKLzRVlKZ1-lBVmYplSEaLP9U9AOqJgH4aIn2X1Q5wjf_Tl5JBa6NA2tBuCxN8USjW7NqvWtTAFZm_Fl3k5HEaLiQpGYQeuTEmybxWizqQxRr16S8vNQ5T1D9ugwhKg_wnG6rlPZkDQkzqYnDA5wsNCPT1LyTrj8pF6LWptf02MfMbllYaSg0FDDVDR04NZ7H30EmI', alt: 'Dinner table' },
        { id: 10, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7mpPP3PRDb1zuVYst45ohhU_o0K2Yvrt0zfzBQycIL75CCguj5raw0UY4ra_gVdx7qI5Ny_-68q-9v4eatUMbzP5WqQsB-LPotCMMIz1pBotYomXiJo1IpmQMVtSsAXsKwzV-VcxWuUuGEJP8TH6KIWFBIWJpyXs444dY69z2wKMvYI_zBOZyv2hoNg82AJrqtK5v3nYedJgT7BPPondmojQnitfmywcN9tgAeN9iYdanbDN5_djjnKNTMBRRHJhEl1x2Rsj73ck', alt: 'Baby christmas' },
        { id: 11, type: 'image', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs2x1zx7scg3rAihYahbjxbXr8OuFougPYo66zdoQVaBngGHRdK3O8DGMOf-VKVjq2I4jYtsfV2GPVt3xl9LWHmpAppDVDAg1mcMcTgY0LFHq5P7UlsVytooLRdkyNtpEajrLeV-ElISNLC6aT8Lw68e7zlnNgdqIaDbgEqJLRv16aaWiTyzLG12VbfBZoHThH9kQkOyc1BfwUKeW5-4PyqMGQN-PpFia5kd-gr6JG9KV566YaWutkM-6B4fAdv8Kw_a9Hc11pvdk', alt: 'New year party' }
      ]
    }
  ]
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    sections = sections.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.alt?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        section.month.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })).filter(section => section.items.length > 0)
  }
  
  // Filter by type
  if (galleryStore.filter !== 'all') {
    sections = sections.map(section => ({
      ...section,
      items: section.items.filter(item => {
        if (galleryStore.filter === 'image') return item.type === 'image'
        if (galleryStore.filter === 'video') return item.type === 'video'
        if (galleryStore.filter === 'favorite') return item.favorite
        return true
      })
    })).filter(section => section.items.length > 0)
  }
  
  return sections
})

const handleSearch = () => {
  // Search is handled in computed property
}

const showMediaViewer = ref(false)
const selectedMedia = ref(null)
const currentMediaIndex = ref(0)
const allMedia = computed(() => {
  return filteredSections.value.flatMap(section => section.items)
})

const openMedia = (item) => {
  const index = allMedia.value.findIndex(m => m.id === item.id)
  currentMediaIndex.value = index >= 0 ? index : 0
  selectedMedia.value = item
  showMediaViewer.value = true
}

const nextMedia = () => {
  if (currentMediaIndex.value < allMedia.value.length - 1) {
    currentMediaIndex.value++
    selectedMedia.value = allMedia.value[currentMediaIndex.value]
  }
}

const previousMedia = () => {
  if (currentMediaIndex.value > 0) {
    currentMediaIndex.value--
    selectedMedia.value = allMedia.value[currentMediaIndex.value]
  }
}
</script>

