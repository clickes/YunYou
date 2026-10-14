<template>
  <div class="app" :class="{ 'reader-mode': isReaderMode }">
    <InkCursor v-if="!isReaderMode" />
    <SealClick v-if="!isReaderMode" />
    <SeasonDecoration v-if="!isReaderMode && !isHomePage" />
    <SiteStats v-if="!isReaderMode" />
    <Navbar v-if="!isReaderMode" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isReaderMode" />
    <SearchModal v-if="showSearch" @close="showSearch = false" />
    <div v-if="showBackTop && !isReaderMode" class="back-top" @click="scrollToTop" title="返回顶部">
      <div class="knot-cord" :style="{ height: cordHeight + 'px' }"></div>
      <img class="knot-img" src="/china-knot.png" alt="返回顶部" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import SearchModal from './components/common/SearchModal.vue'
import InkCursor from './components/common/InkCursor.vue'
import SiteStats from './components/common/SiteStats.vue'
import SealClick from './components/common/SealClick.vue'
import SeasonDecoration from './components/common/SeasonDecoration.vue'

const showSearch = ref(false)
const showBackTop = ref(false)
const isReaderMode = ref(false)
const cordHeight = ref(20)
let lastY = 0
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

provide('searchState', { showSearch, openSearch: () => { showSearch.value = true }, closeSearch: () => { showSearch.value = false } })
provide('readerMode', { isReaderMode, enterReader: () => { isReaderMode.value = true }, exitReader: () => { isReaderMode.value = false } })

const handleScroll = () => {
  const y = window.scrollY
  showBackTop.value = y > 300
  const diff = y - lastY
  if (diff > 2) {
    cordHeight.value = Math.max(10, cordHeight.value - Math.abs(diff) * 0.3)
  } else if (diff < -2) {
    cordHeight.value = Math.min(120, cordHeight.value + Math.abs(diff) * 0.5)
  }
  lastY = y
}
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); showSearch.value = !showSearch.value }
    if (e.key === 'Escape') showSearch.value = false
  })
})

onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; }
.main-content { flex: 1; padding-top: var(--nav-height); }
.page-enter-active, .page-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.page-enter-from { opacity: 0; transform: translateY(20px); }
.page-leave-to { opacity: 0; transform: translateY(-20px); }
.back-top {
  position: fixed; bottom: 30px; right: 30px;
  display: flex; flex-direction: column; align-items: center;
  cursor: pointer; z-index: 999;
  transition: transform 0.2s ease; animation: fadeIn 0.3s ease;
}
.back-top:hover { transform: translateY(-3px); }
.knot-cord {
  width: 2px;
  background: linear-gradient(180deg, transparent, #B84A3A 30%, #B84A3A);
  transition: height 0.15s ease-out;
}
.knot-img {
  width: 48px; height: auto;
  filter: drop-shadow(0 3px 8px rgba(184, 74, 58, 0.3));
}
.reader-mode .main-content { padding-top: 0; }
@media (max-width: 768px) {
  .back-top { bottom: 20px; right: 20px; }
  .knot-img { width: 40px; }
}
</style>
