<template>
  <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
    <!-- Photo Upload Post -->
    <template v-if="post.type === 'album'">
      <div class="flex items-center gap-3 mb-3">
        <div 
          class="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center"
          :style="{ backgroundImage: `url('${post.author.avatar}')` }"
        ></div>
        <div class="flex-1">
          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ post.author.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">đã thêm một album mới • {{ post.timeAgo }}</p>
        </div>
        <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <span class="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <p class="text-slate-800 dark:text-slate-200 text-sm mb-3">{{ post.content }}</p>
      <div class="grid grid-cols-2 gap-2 mb-3 rounded-lg overflow-hidden">
        <div 
          v-for="(image, index) in post.images" 
          :key="index"
          class="aspect-square bg-cover bg-center"
          :style="{ backgroundImage: `url('${image}')` }"
        ></div>
      </div>
      <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3">
        <div class="flex items-center gap-4">
          <button 
            class="flex items-center gap-1.5 transition-colors"
            :class="post.isLiked ? 'text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-red-500'"
            @click="toggleLike(post)"
          >
            <span 
              class="material-symbols-outlined text-xl"
              :class="{ 'filled': post.isLiked }"
            >favorite</span>
            <span class="text-xs font-medium">{{ post.likes }}</span>
          </button>
          <button 
            class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            @click="showComments(post)"
          >
            <span class="material-symbols-outlined text-xl">chat_bubble</span>
            <span class="text-xs font-medium">{{ post.comments }}</span>
          </button>
        </div>
        <button 
          class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
          @click="sharePost(post)"
        >
          <span class="material-symbols-outlined text-xl">share</span>
        </button>
      </div>
    </template>

    <!-- Family Tree Update -->
    <template v-else-if="post.type === 'family-tree-update'">
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
          <span class="material-symbols-outlined">account_tree</span>
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-bold text-slate-900 dark:text-white">Cập nhật gia phả</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ post.author.name }} {{ post.content }}</p>
            </div>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ post.timeAgo }}</span>
          </div>
          <div class="mt-3 flex items-center gap-3 p-2 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-700">
            <div 
              class="h-12 w-12 rounded-full bg-slate-300 bg-cover bg-center"
              :style="{ backgroundImage: `url('${post.newMember.avatar}')` }"
            ></div>
            <div>
              <p class="text-sm font-bold text-slate-900 dark:text-white">{{ post.newMember.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ post.newMember.relation }}</p>
            </div>
          </div>
          <button class="mt-3 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold rounded-lg transition-colors">
            Xem cây gia phả
          </button>
        </div>
      </div>
    </template>

    <!-- Status Post -->
    <template v-else>
      <div class="flex items-center gap-3 mb-2">
        <div 
          class="h-10 w-10 rounded-full bg-slate-200 bg-cover bg-center"
          :style="{ backgroundImage: `url('${post.author.avatar}')` }"
        ></div>
        <div>
          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ post.author.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">đăng {{ post.timeAgo }}</p>
        </div>
      </div>
      <p class="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{{ post.content }}</p>
      <div class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
        <div class="flex -space-x-2 overflow-hidden">
          <img 
            v-for="(avatar, index) in post.likedBy" 
            :key="index"
            class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-surface-dark object-cover"
            :src="avatar"
            alt="Avatar"
          />
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 ml-1">{{ post.likes }} người đã thích</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useFeedStore } from '@/stores/useFeedStore'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const feedStore = useFeedStore()

const toggleLike = (post) => {
  const postIndex = feedStore.posts.findIndex(p => p.id === post.id)
  if (postIndex !== -1) {
    const currentPost = feedStore.posts[postIndex]
    if (currentPost.isLiked) {
      currentPost.isLiked = false
      currentPost.likes = Math.max(0, currentPost.likes - 1)
    } else {
      currentPost.isLiked = true
      currentPost.likes = (currentPost.likes || 0) + 1
    }
  }
}

const showComments = (post) => {
  // TODO: Implement comments modal
  console.log('Show comments for post:', post.id)
}

const sharePost = (post) => {
  if (navigator.share) {
    navigator.share({
      title: 'Family Bulletin Board',
      text: post.content,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err))
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Link đã được sao chép!')
  }
}
</script>

