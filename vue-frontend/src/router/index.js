import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import FamilyTree from '../views/FamilyTree.vue'
import Events from '../views/Events.vue'
import Gallery from '../views/Gallery.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profile/:id?',
    name: 'profile',
    component: Profile
  },
  {
    path: '/family-tree',
    name: 'family-tree',
    component: FamilyTree
  },
  {
    path: '/events',
    name: 'events',
    component: Events
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

