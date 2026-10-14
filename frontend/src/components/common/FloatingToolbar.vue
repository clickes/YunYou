<template>
  <div class="floating-toolbar" v-show="visible">
    <button class="tool-btn" @click="scrollToComments" title="评论区">
      <span class="tool-icon">💬</span>
      <span class="tool-tip">评论</span>
    </button>
    <button class="tool-btn" @click="toggleToc" title="文章目录" :class="{ active: tocOpen }">
      <span class="tool-icon">📑</span>
      <span class="tool-tip">目录</span>
    </button>
    <button class="tool-btn" @click="handleShare" title="分享文章">
      <span class="tool-icon">🔗</span>
      <span class="tool-tip">分享</span>
    </button>
    <button class="tool-btn" @click="toggleReaderMode" title="阅读模式" :class="{ active: isReaderMode }">
      <span class="tool-icon">📖</span>
      <span class="tool-tip">阅读</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

const emit = defineEmits(['toggleToc'])
const visible = ref(false)
const tocOpen = ref(false)

const readerModeState = inject('readerMode', { isReaderMode: ref(false), enterReader: () => {}, exitReader: () => {} })
const isReaderMode = readerModeState.isReaderMode

const handleScroll = () => {
  visible.value = window.scrollY > 300
}

const scrollToComments = () => {
  const commentsSection = document.querySelector('.comments-section')
  if (commentsSection) {
    const top = commentsSection.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const toggleToc = () => {
  tocOpen.value = !tocOpen.value
  emit('toggleToc', tocOpen.value)
}

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToast('链接已复制')
  } catch (e) {
    showToast('复制失败，请手动复制')
  }
}

const toggleReaderMode = () => {
  if (isReaderMode.value) {
    readerModeState.exitReader()
  } else {
    readerModeState.enterReader()
  }
}

const showToast = (msg) => {
  const toast = document.createElement('div')
  toast.className = 'floating-toast'
  toast.textContent = msg
  toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--bg-card);color:var(--text-primary);padding:10px 20px;border-radius:4px;border:1px solid var(--accent-gold);z-index:9999;font-size:0.9rem;animation:fadeIn 0.3s ease;'
  document.body.appendChild(toast)
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s' }, 1500)
  setTimeout(() => { document.body.removeChild(toast) }, 2000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.floating-toolbar {
  position: fixed;
  right: 20px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 900;
  animation: fadeIn 0.3s ease;
}

.tool-btn {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  overflow: hidden;
}
.tool-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-red));
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.tool-btn:hover {
  border-color: var(--accent-gold);
  color: var(--accent-red);
  transform: translateX(-3px);
  box-shadow: -2px 4px 12px var(--shadow-color);
}
.tool-btn:hover::before { opacity: 1; }
.tool-btn.active {
  border-color: var(--accent-red);
  background: rgba(196, 30, 58, 0.08);
  color: var(--accent-red);
}
.tool-icon { font-size: 1.1rem; }
.tool-tip {
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-card);
  border: 1px solid var(--accent-gold);
  color: var(--text-primary);
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-fast);
  font-family: var(--font-kai);
}
.tool-btn:hover .tool-tip { opacity: 1; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (max-width: 768px) {
  .floating-toolbar { right: 12px; bottom: 80px; }
  .tool-btn { width: 38px; height: 38px; }
  .tool-tip { display: none; }
  .knot-icon { width: 30px; height: 40px; }
}
</style>
