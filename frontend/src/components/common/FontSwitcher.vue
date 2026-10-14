<template>
  <div class="font-switcher">
    <button class="font-trigger" @click="isOpen = !isOpen" title="切换字体">
      <span class="font-icon">字</span>
      <span class="font-current kai-font">{{ currentFontName }}</span>
    </button>
    <transition name="dropdown">
      <div v-if="isOpen" class="font-dropdown">
        <div class="dropdown-title title-font">字体</div>
        <div class="font-options">
          <button
            v-for="font in fonts"
            :key="font.key"
            class="font-option"
            :class="{ active: currentFont === font.key }"
            :style="{ fontFamily: font.family }"
            @click="selectFont(font.key)"
          >
            <span class="font-name">{{ font.name }}</span>
            <span class="font-preview">云游山水</span>
          </button>
        </div>
        <div class="font-size-control">
          <span class="size-label kai-font">字号</span>
          <button class="size-btn" @click="decreaseSize">A-</button>
          <span class="size-value">{{ fontSize }}px</span>
          <button class="size-btn" @click="increaseSize">A+</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetSelector: { type: String, default: 'body' }
})

const isOpen = ref(false)
const currentFont = ref('song')
const fontSize = ref(16)

const fonts = [
  { key: 'song', name: '宋体', family: "'Noto Serif SC', 'SimSun', serif" },
  { key: 'kai', name: '楷体', family: "'ZCOOL XiaoWei', 'KaiTi', serif" },
  { key: 'title', name: '行书', family: "'Ma Shan Zheng', 'ZCOOL XiaoWei', cursive" },
  { key: 'fangsong', name: '仿宋', family: "'FangSong', 'STFangsong', serif" },
  { key: 'hei', name: '黑体', family: "'Noto Sans SC', 'SimHei', sans-serif" }
]

const currentFontName = computed(() => {
  const font = fonts.find(f => f.key === currentFont.value)
  return font ? font.name : '宋体'
})

const applyFont = () => {
  const font = fonts.find(f => f.key === currentFont.value)
  if (font) {
    document.documentElement.style.setProperty('--reader-font', font.family)
    document.documentElement.style.setProperty('--reader-font-size', fontSize.value + 'px')
  }
}

const selectFont = (key) => {
  currentFont.value = key
  applyFont()
  isOpen.value = false
}

const increaseSize = () => {
  if (fontSize.value < 24) {
    fontSize.value += 2
    applyFont()
  }
}

const decreaseSize = () => {
  if (fontSize.value > 12) {
    fontSize.value -= 2
    applyFont()
  }
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.font-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  applyFont()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.font-switcher {
  position: relative;
}
.font-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.font-trigger:hover {
  border-color: var(--accent-gold);
}
.font-icon {
  width: 22px;
  height: 22px;
  background: var(--accent-red);
  color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-family: var(--font-title);
}
.font-current {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.font-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background: var(--bg-card);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
  box-shadow: 0 8px 30px var(--shadow-strong);
  z-index: 1000;
  padding: 14px;
}
.dropdown-title {
  font-size: 0.9rem;
  color: var(--title-color);
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--border-light);
  letter-spacing: 2px;
}
.font-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}
.font-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid transparent;
}
.font-option:hover {
  background: var(--bg-tertiary);
}
.font-option.active {
  background: rgba(196, 30, 58, 0.08);
  border-color: var(--accent-red);
}
.font-name {
  font-size: 0.85rem;
  color: var(--text-primary);
}
.font-preview {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.font-size-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px dashed var(--border-light);
}
.size-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.size-btn {
  width: 28px;
  height: 28px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.size-btn:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}
.size-value {
  font-size: 0.8rem;
  color: var(--text-muted);
  min-width: 40px;
  text-align: center;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
