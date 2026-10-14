<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-text title-font">云游</span>
        <span class="logo-seal">印</span>
      </router-link>
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-link" :class="{ active: isActive(item.path) }">
            <span class="link-text">{{ item.name }}</span>
            <span class="link-underline"></span>
          </router-link>
        </li>
        <li class="nav-more" @mouseenter="showMore = true" @mouseleave="showMore = false">
          <span class="nav-link more-trigger">
            <span class="link-text">更多</span>
            <span class="more-arrow">▾</span>
          </span>
          <transition name="dropdown">
            <ul v-if="showMore" class="more-dropdown">
              <li v-for="item in moreItems" :key="item.path">
                <router-link :to="item.path" class="dropdown-link" @click="showMore = false">
                  <span class="dropdown-icon">{{ item.icon }}</span>
                  <span class="dropdown-text">{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
      <div class="nav-actions">
        <button class="nav-btn" @click="openSearch" title="搜索 (Ctrl+K)"><span class="btn-icon">🔍</span></button>
        <div class="theme-switcher">
          <button class="nav-btn" @click="toggleThemePanel" title="主题切换"><span class="btn-icon">{{ themeIcon }}</span></button>
          <div v-if="showThemePanel" class="theme-panel">
            <div class="panel-title title-font">选择主题</div>
            <div class="theme-options">
              <div v-for="t in themes" :key="t.value" class="theme-option" :class="{ active: themeStore.theme === t.value }" @click="setTheme(t.value)">
                <div class="theme-preview" :style="{ background: t.gradient }"></div>
                <span>{{ t.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <button class="nav-btn mobile-menu-btn" @click="toggleMobileMenu"><span class="hamburger">{{ mobileMenuOpen ? '✕' : '☰' }}</span></button>
      </div>
    </div>
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="mobileMenuOpen = false"></div>
    </transition>
    <transition name="drawer">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-header">
          <span class="mobile-logo title-font">云游</span>
          <span class="mobile-seal">印</span>
          <button class="mobile-close" @click="mobileMenuOpen = false">✕</button>
        </div>
        <div class="mobile-menu-divider"></div>
        <ul class="mobile-nav-list">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path" class="mobile-nav-link" :class="{ active: isActive(item.path) }" @click="mobileMenuOpen = false">
              <span class="mobile-link-icon">❖</span>
              <span class="mobile-link-text">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
        <div class="mobile-menu-footer">
          <div class="mobile-poem">{{ currentShichen.name }} · {{ currentShichen.desc }}</div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '../../stores/theme'
import { getCurrentShichen } from '../../utils'

const route = useRoute()
const themeStore = useThemeStore()
const searchState = inject('searchState')
const openSearch = () => searchState.openSearch()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const showThemePanel = ref(false)
const showMore = ref(false)

const currentShichen = computed(() => getCurrentShichen())
const menuItems = [
  { path: '/', name: '首页' },
  { path: '/category', name: '分类' },
  { path: '/tag', name: '标签' },
  { path: '/archive', name: '归档' },
  { path: '/message', name: '留言' },
  { path: '/about', name: '关于' },
  { path: '/friends', name: '友链' }
]
const moreItems = [
  { path: '/gallery', name: '画阁', icon: '🎨' },
  { path: '/poetry', name: '诗苑', icon: '📜' },
  { path: '/solar-terms', name: '节气志', icon: '🌿' }
]
const themes = [
  { value: 'default', name: '敦煌壁画', gradient: 'linear-gradient(135deg, #F5EEDD, #B84A3A)' },
  { value: 'yueye', name: '敦煌月夜', gradient: 'linear-gradient(135deg, #1A2A3A, #4A9ABA)' }
]
const themeIcon = computed(() => {
  const map = { default: '🏜️', yueye: '🌙' }
  return map[themeStore.theme] || '🏜️'
})
const isActive = (path) => path === '/' ? route.path === '/' : route.path.startsWith(path)
const setTheme = (theme) => { themeStore.setTheme(theme); showThemePanel.value = false }
const toggleThemePanel = (e) => { e.stopPropagation(); showThemePanel.value = !showThemePanel.value }
const toggleMobileMenu = () => { mobileMenuOpen.value = !mobileMenuOpen.value }
const handleScroll = () => { isScrolled.value = window.scrollY > 20 }
const handleClickOutside = (e) => { if (!e.target.closest('.theme-switcher')) showThemePanel.value = false }

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  background: rgba(245, 239, 224, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-normal);
}
.navbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--accent-shilu) 10%,
    var(--accent-gold) 25%,
    var(--accent-lianban) 50%,
    var(--accent-gold) 75%,
    var(--accent-jade) 90%,
    transparent 100%);
  opacity: 0.7;
}
.navbar.scrolled {
  box-shadow: 0 4px 25px var(--shadow-color);
}
.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.logo-text {
  font-size: 1.9rem;
  color: var(--title-color);
  letter-spacing: 8px;
}
.logo-seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--accent-red);
  color: #fff;
  font-size: 0.85rem;
  border-radius: 3px;
  font-family: var(--font-title);
  animation: sealStamp 0.8s ease;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.25);
}
.nav-menu {
  display: flex;
  gap: 4px;
  list-style: none;
}
.nav-more {
  position: relative;
}
.more-trigger {
  cursor: pointer;
}
.more-arrow {
  font-size: 0.6rem;
  margin-left: 2px;
  transition: transform var(--transition-fast);
}
.nav-more:hover .more-arrow {
  transform: rotate(180deg);
}
.more-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-card);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
  padding: 10px;
  min-width: 150px;
  box-shadow: 0 10px 35px var(--shadow-color);
  z-index: 1001;
  list-style: none;
}
.more-dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--bg-card);
  border-left: 1px solid var(--accent-gold);
  border-top: 1px solid var(--accent-gold);
}
.dropdown-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius);
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  letter-spacing: 3px;
  font-size: 0.9rem;
}
.dropdown-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-red);
}
.dropdown-icon {
  font-size: 1rem;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  color: var(--text-secondary);
  text-decoration: none;
  position: relative;
  transition: all var(--transition-fast);
  font-size: 0.95rem;
  font-family: var(--font-kai);
  letter-spacing: 3px;
}
.nav-link:hover { color: var(--accent-red); }
.nav-link.active { color: var(--accent-red); }
.link-underline {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-red), transparent);
  transition: transform var(--transition-fast);
}
.nav-link:hover .link-underline,
.nav-link.active .link-underline {
  transform: translateX(-50%) scaleX(1);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid transparent;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  position: relative;
}
.nav-btn:hover {
  background: var(--bg-tertiary);
  color: var(--accent-red);
  border-color: var(--accent-gold);
}
.theme-switcher { position: relative; }
.theme-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: 0 10px 35px var(--shadow-color);
  z-index: 1001;
  animation: fadeIn 0.2s ease;
  min-width: 220px;
}
.theme-panel::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px;
  width: 20px; height: 20px;
  border-top: 2px solid var(--accent-red);
  border-left: 2px solid var(--accent-red);
  opacity: 0.6;
}
.theme-panel::after {
  content: '';
  position: absolute;
  bottom: -1px; right: -1px;
  width: 20px; height: 20px;
  border-bottom: 2px solid var(--accent-red);
  border-right: 2px solid var(--accent-red);
  opacity: 0.6;
}
.panel-title {
  font-size: 1rem;
  color: var(--title-color);
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 5px;
}
.theme-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: var(--radius);
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}
.theme-option:hover { background: var(--bg-tertiary); }
.theme-option.active { border-color: var(--accent-gold); }
.theme-preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
}
.theme-option span {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-kai);
}
.mobile-menu-btn { display: none; }
.hamburger { font-size: 1.3rem; }
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: 80vw;
  background: var(--bg-card);
  border-left: 2px solid var(--accent-gold);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -4px 0 25px rgba(0, 0, 0, 0.25);
}
.mobile-menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-shilu), var(--accent-gold), var(--accent-red), var(--accent-gold), var(--accent-jade));
}
.mobile-menu-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
}
.mobile-logo {
  font-size: 1.6rem;
  color: var(--title-color);
  letter-spacing: 5px;
}
.mobile-seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: var(--accent-red);
  color: #fff;
  font-size: 0.7rem;
  border-radius: 2px;
  font-family: var(--font-title);
}
.mobile-close {
  margin-left: auto;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  transition: all var(--transition-fast);
}
.mobile-close:hover {
  background: var(--accent-red);
  color: #fff;
  border-color: var(--accent-red);
}
.mobile-menu-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin-bottom: 16px;
}
.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius);
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  letter-spacing: 3px;
  font-size: 1rem;
  margin-bottom: 4px;
}
.mobile-nav-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-red);
  padding-left: 20px;
}
.mobile-nav-link.active {
  background: rgba(184, 74, 58, 0.1);
  color: var(--accent-red);
  border-left: 3px solid var(--accent-red);
}
.mobile-link-icon {
  color: var(--accent-gold);
  font-size: 0.8rem;
}
.mobile-menu-footer {
  padding-top: 16px;
  border-top: 1px dashed var(--border-color);
}
.mobile-poem {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: center;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.3s ease;
}
.drawer-enter-from, .drawer-leave-to {
  transform: translateX(100%);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@keyframes sealStamp {
  0% { transform: scale(1.5) rotate(-10deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}
@media (max-width: 900px) {
  .nav-menu { display: none; }
  .mobile-menu-btn { display: flex; }
}
@media (max-width: 480px) {
  .logo-text { font-size: 1.4rem; letter-spacing: 4px; }
  .nav-btn { width: 34px; height: 34px; }
}
</style>
