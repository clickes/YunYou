<template>
  <div class="site-stats" :class="{ expanded: isExpanded }" @click="toggleExpand">
    <div class="stats-header">
      <span class="stats-icon">📜</span>
      <span class="stats-label kai-font">站点小筑</span>
      <span class="stats-toggle">{{ isExpanded ? '▾' : '▸' }}</span>
    </div>
    <transition name="expand">
      <div v-if="isExpanded" class="stats-body">
        <div class="stat-item">
          <span class="stat-value title-font">{{ siteDays }}</span>
          <span class="stat-unit">日</span>
          <span class="stat-label">运行</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value title-font">{{ articleCount }}</span>
          <span class="stat-unit">篇</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value title-font">{{ totalViews }}</span>
          <span class="stat-unit">次</span>
          <span class="stat-label">浏览</span>
        </div>
        <div class="stat-footer">
          <span class="stat-date">{{ currentDate }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { articles } from '../../mock/data'

const isExpanded = ref(false)
const siteStartDate = new Date('2024-01-01')

const siteDays = computed(() => {
  const now = new Date()
  const diff = Math.floor((now - siteStartDate) / (1000 * 60 * 60 * 24))
  return diff
})

const articleCount = computed(() => articles.length)

const totalViews = computed(() => {
  return articles.reduce((sum, a) => sum + (a.views || 0), 0)
})

const currentDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${year}年${month}月${day}日 星期${weekdays[now.getDay()]}`
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  setTimeout(() => { isExpanded.value = true }, 1500)
})
</script>

<style scoped>
.site-stats {
  position: fixed;
  left: 20px;
  bottom: 100px;
  z-index: 900;
  background: var(--bg-card);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
  box-shadow: 0 4px 20px var(--shadow-color);
  cursor: pointer;
  transition: all var(--transition-normal);
  min-width: 120px;
  overflow: hidden;
}
.site-stats::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold));
}
.site-stats:hover {
  box-shadow: 0 6px 25px var(--shadow-strong);
  transform: translateY(-2px);
}
.stats-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  font-size: 0.85rem;
  color: var(--title-color);
}
.stats-icon { font-size: 1rem; }
.stats-label { flex: 1; letter-spacing: 2px; }
.stats-toggle { font-size: 0.7rem; color: var(--accent-gold); }
.stats-body {
  padding: 0 14px 14px;
  border-top: 1px dashed var(--border-light);
}
.stat-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 8px 0;
}
.stat-value {
  font-size: 1.4rem;
  color: var(--accent-red);
  font-weight: bold;
  min-width: 40px;
}
.stat-unit {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-left: auto;
  font-family: var(--font-kai);
}
.stat-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-light), transparent);
}
.stat-footer {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-light);
  text-align: center;
}
.stat-date {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.expand-enter-to, .expand-leave-from {
  max-height: 300px;
}
@media (max-width: 768px) {
  .site-stats { display: none; }
}
</style>
