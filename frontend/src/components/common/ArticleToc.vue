<template>
  <div class="article-toc" v-if="headings.length > 0">
    <div class="toc-header">
      <span class="toc-icon">📑</span>
      <span class="toc-title title-font">文章目录</span>
    </div>
    <div class="toc-list">
      <div v-for="(heading, index) in headings" :key="index" class="toc-item" :class="{ active: activeIndex === index, [`level-${heading.level}`]: true }" @click="scrollToHeading(heading)">
        <span class="toc-dot"></span>
        <span class="toc-text">{{ heading.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  contentSelector: { type: String, default: '.article-content' }
})

const headings = ref([])
const activeIndex = ref(0)

const extractHeadings = () => {
  const container = document.querySelector(props.contentSelector)
  if (!container) return
  const elements = container.querySelectorAll('h2, h3')
  headings.value = Array.from(elements).map((el, index) => {
    const id = `heading-${index}`
    el.id = id
    return {
      id,
      text: el.textContent,
      level: el.tagName === 'H2' ? 2 : 3,
      element: el
    }
  })
}

const scrollToHeading = (heading) => {
  const el = document.getElementById(heading.id)
  if (el) {
    const offset = 100
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const updateActive = () => {
  if (headings.value.length === 0) return
  const scrollPos = window.scrollY + 150
  let currentIndex = 0
  for (let i = 0; i < headings.value.length; i++) {
    const el = headings.value[i].element
    if (el && el.offsetTop <= scrollPos) {
      currentIndex = i
    }
  }
  activeIndex.value = currentIndex
}

let scrollListener = null

onMounted(() => {
  nextTick(() => {
    extractHeadings()
    updateActive()
  })
  scrollListener = () => updateActive()
  window.addEventListener('scroll', scrollListener, { passive: true })
})

onUnmounted(() => {
  if (scrollListener) window.removeEventListener('scroll', scrollListener)
})

watch(() => props.contentSelector, () => {
  nextTick(() => extractHeadings())
})
</script>

<style scoped>
.article-toc {
  position: sticky;
  top: 100px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 20px 16px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}
.article-toc::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold));
  opacity: 0.5;
  border-radius: var(--radius) var(--radius) 0 0;
}
.toc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--border-color);
}
.toc-icon { font-size: 1.1rem; }
.toc-title {
  font-size: 1rem;
  color: var(--title-color);
  letter-spacing: 3px;
}
.toc-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 2px;
  transition: all var(--transition-fast);
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
.toc-item:hover {
  background: var(--bg-tertiary);
  color: var(--accent-red);
}
.toc-item.active {
  background: rgba(196, 30, 58, 0.08);
  color: var(--accent-red);
  font-weight: 500;
}
.toc-item.level-3 {
  padding-left: 24px;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.toc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-color);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}
.toc-item.active .toc-dot {
  background: var(--accent-red);
  box-shadow: 0 0 6px var(--accent-red);
}
.toc-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article-toc::-webkit-scrollbar { width: 4px; }
.article-toc::-webkit-scrollbar-track { background: transparent; }
.article-toc::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 2px; }
@media (max-width: 900px) {
  .article-toc { display: none; }
}
</style>
