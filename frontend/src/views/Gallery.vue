<template>
  <div class="gallery-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">画阁</h1>
        <p class="page-subtitle">山水画卷 · 光影留痕</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="gallery-filters">
        <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
          {{ cat }}
        </button>
      </div>
      <div class="gallery-grid">
        <div v-for="(item, index) in filteredGallery" :key="item.id" class="gallery-item" :style="{ animationDelay: index * 0.05 + 's' }" @click="openLightbox(item)">
          <div class="gallery-placeholder" :style="{ background: item.gradient }">
            <span class="gallery-icon">{{ item.icon }}</span>
          </div>
          <div class="gallery-overlay">
            <h4 class="gallery-title">{{ item.title }}</h4>
            <p class="gallery-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="lightboxItem" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <div class="lightbox-image" :style="{ background: lightboxItem.gradient }">
            <span class="lightbox-icon">{{ lightboxItem.icon }}</span>
          </div>
          <div class="lightbox-info">
            <h3 class="lightbox-title title-font">{{ lightboxItem.title }}</h3>
            <p class="lightbox-desc">{{ lightboxItem.desc }}</p>
            <span class="lightbox-category">{{ lightboxItem.category }}</span>
          </div>
          <button class="lightbox-close" @click="closeLightbox">✕</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ['全部', '山水', '花鸟', '人文', '静物']
const activeCategory = ref('全部')
const lightboxItem = ref(null)

const galleryItems = [
  { id: 1, title: '雪山远眺', desc: '皑皑白雪覆远山，苍茫天地一鉴开', category: '山水', icon: '🏔️', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '寒梅傲雪', desc: '墙角数枝梅，凌寒独自开', category: '花鸟', icon: '🌸', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '古寺晨钟', desc: '清晨入古寺，初日照高林', category: '人文', icon: '🏯', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, title: '清茶一盏', desc: '半壁山房待明月，一盏清茗酬知音', category: '静物', icon: '🍵', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, title: '江南烟雨', desc: '烟雨江南，水墨丹青', category: '山水', icon: '🌧️', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 6, title: '翠竹摇风', desc: '宁可食无肉，不可居无竹', category: '花鸟', icon: '🎋', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 7, title: '古城暮色', desc: '夕阳无限好，只是近黄昏', category: '人文', icon: '🌇', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 8, title: '砚台笔墨', desc: '笔落惊风雨，诗成泣鬼神', category: '静物', icon: '🖌️', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 9, title: '秋月平湖', desc: '湖光秋月两相和，潭面无风镜未磨', category: '山水', icon: '🌙', gradient: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)' },
  { id: 10, title: '兰草幽香', desc: '幽兰在山谷，本自无人识', category: '花鸟', icon: '🌿', gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { id: 11, title: '书院深深', desc: '风声雨声读书声，声声入耳', category: '人文', icon: '📚', gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)' },
  { id: 12, title: '古琴悠扬', desc: '泠泠七弦上，静听松风寒', category: '静物', icon: '🎐', gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)' }
]

const filteredGallery = computed(() => {
  if (activeCategory.value === '全部') return galleryItems
  return galleryItems.filter(item => item.category === activeCategory.value)
})

const openLightbox = (item) => {
  lightboxItem.value = item
}
const closeLightbox = () => {
  lightboxItem.value = null
}
</script>

<style scoped>
.gallery-page { min-height: 100vh; }
.page-header { padding: 60px 0 40px; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); text-align: center; }
.page-subtitle { color: var(--text-secondary); font-size: 1rem; margin-top: 10px; font-family: var(--font-kai); letter-spacing: 4px; }
.page-body { padding: 40px 20px 60px; }
.gallery-filters { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
.filter-btn { padding: 8px 20px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 2px; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-kai); font-size: 0.9rem; }
.filter-btn:hover { border-color: var(--accent-gold); color: var(--accent-red); }
.filter-btn.active { background: var(--accent-red); color: #fff; border-color: var(--accent-red); }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.gallery-item { position: relative; border-radius: var(--radius); overflow: hidden; cursor: pointer; aspect-ratio: 1; animation: fadeInUp 0.5s ease both; transition: transform var(--transition-normal); }
.gallery-item:hover { transform: translateY(-4px); }
.gallery-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.gallery-icon { font-size: 3rem; opacity: 0.8; }
.gallery-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); transform: translateY(100%); transition: transform var(--transition-normal); }
.gallery-item:hover .gallery-overlay { transform: translateY(0); }
.gallery-title { color: #fff; font-size: 1rem; margin-bottom: 4px; font-family: var(--font-title); }
.gallery-desc { color: rgba(255,255,255,0.8); font-size: 0.8rem; line-height: 1.4; }
.lightbox { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
.lightbox-content { position: relative; max-width: 600px; width: 100%; background: var(--bg-card); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--accent-gold); animation: scaleIn 0.3s ease; }
.lightbox-image { width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; }
.lightbox-icon { font-size: 5rem; }
.lightbox-info { padding: 24px; }
.lightbox-title { font-size: 1.5rem; color: var(--title-color); margin-bottom: 8px; }
.lightbox-desc { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px; }
.lightbox-category { display: inline-block; padding: 4px 12px; background: rgba(46, 92, 138, 0.1); color: var(--accent-shilu); border-radius: 2px; font-size: 0.8rem; font-family: var(--font-kai); }
.lightbox-close { position: absolute; top: 12px; right: 12px; width: 36px; height: 36px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; color: #fff; font-size: 1rem; cursor: pointer; transition: all var(--transition-fast); }
.lightbox-close:hover { background: var(--accent-red); }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } .lightbox-image { height: 200px; } }
</style>
