<template>
  <article class="article-card" @click="goToDetail">
    <div v-if="article.cover" class="card-cover">
      <img :src="article.cover" :alt="article.title" />
      <div class="cover-overlay"></div>
    </div>
    <div v-else class="card-cover card-cover-placeholder">
      <div class="cover-pattern"></div>
      <span class="cover-icon">{{ categoryIcon }}</span>
    </div>
    <div class="card-content">
      <div class="card-meta-top">
        <router-link :to="`/category/${article.category}`" class="card-category" @click.stop>
          <span>{{ categoryIcon }}</span>{{ article.category }}
        </router-link>
        <span class="card-date">{{ formatDateCN(article.date) }}</span>
      </div>
      <h3 class="card-title title-font">{{ article.title }}</h3>
      <p class="card-summary">{{ article.summary }}</p>
      <div class="card-footer">
        <div class="card-tags">
          <router-link v-for="tag in article.tags.slice(0, 2)" :key="tag" :to="`/tag/${tag}`" class="card-tag" @click.stop># {{ tag }}</router-link>
        </div>
        <div class="card-stats">
          <span class="stat" title="阅读量"><span class="stat-icon">👁</span> {{ formatViews(article.views) }}</span>
          <span class="stat" title="评论"><span class="stat-icon">💬</span> {{ article.comments }}</span>
        </div>
      </div>
    </div>
    <div class="card-corner corner-tl"></div>
    <div class="card-corner corner-br"></div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../../mock/data'
import { formatDateCN, formatViews } from '../../utils'

const props = defineProps({
  article: { type: Object, required: true }
})

const router = useRouter()
const categoryIcon = computed(() => {
  const cat = categories.find(c => c.name === props.article.category)
  return cat ? cat.icon : '📄'
})
const goToDetail = () => {
  router.push(`/article/${props.article.id}`)
}
</script>

<style scoped>
.article-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px var(--shadow-color);
}
.article-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-gold);
  box-shadow: 0 12px 40px var(--shadow-color), 0 0 20px rgba(201, 168, 76, 0.15);
}
.article-card:hover .card-title {
  color: var(--accent-red);
}
.card-cover {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 22px), 50% 100%, 0 calc(100% - 22px));
}
.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.15) 100%);
}
.article-card:hover .card-cover img {
  transform: scale(1.08);
}
.card-cover-placeholder {
  background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(184, 74, 58, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(42, 122, 154, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.08) 0%, transparent 50%);
}
.cover-icon {
  font-size: 3.5rem;
  opacity: 0.6;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
}
.card-content {
  padding: 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.card-meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.card-category {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 14px;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-jade));
  border-radius: 0 12px 12px 0;
  font-size: 0.8rem;
  color: #fff;
  text-decoration: none;
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  letter-spacing: 2px;
  position: relative;
  box-shadow: 2px 2px 6px rgba(42, 122, 154, 0.2);
}
.card-category::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: var(--bg-card);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
.card-category:hover {
  background: linear-gradient(135deg, var(--accent-red), var(--accent-zhusha));
  transform: translateX(3px);
}
.card-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.card-title {
  font-size: 1.35rem;
  color: var(--title-color);
  margin-bottom: 12px;
  line-height: 1.5;
  transition: color var(--transition-fast);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 1px;
}
.card-summary {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 18px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
  position: relative;
}
.card-footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 40px;
  height: 1px;
  background: var(--accent-gold);
}
.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.card-tag {
  padding: 3px 10px;
  font-size: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 10px;
  color: var(--text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.card-tag:hover {
  background: var(--accent-red);
  color: #fff;
  transform: scale(1.05);
}
.card-stats {
  display: flex;
  gap: 14px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.card-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
}
.corner-tl {
  top: 10px;
  left: 10px;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L20 0 M0 0 L0 20' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23B84A3A'/%3E%3C/svg%3E");
}
.corner-br {
  bottom: 10px;
  right: 10px;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L0 20 M20 20 L20 0' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='16' cy='16' r='1.5' fill='%23B84A3A'/%3E%3C/svg%3E");
}
.article-card:hover .card-corner {
  opacity: 1;
}
</style>
