<template>
  <div class="category-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">文章分类</h1>
        <div class="title-lotus">
          <svg width="80" height="16" viewBox="0 0 80 16" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A84C" stroke-width="1" fill="none" opacity="0.7">
              <path d="M0 8 Q13 2 26 8 Q40 14 53 8 Q66 2 80 8" />
              <circle cx="40" cy="8" r="2.5" fill="#B84A3A" opacity="0.8" />
            </g>
          </svg>
        </div>
        <p class="page-subtitle">分门别类，各取所需</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="category-grid">
        <div v-for="cat in categories" :key="cat.id" class="category-card" :class="{ active: currentCategory === cat.name }" @click="selectCategory(cat.name)">
          <div class="card-corner corner-tl"></div>
          <div class="card-corner corner-br"></div>
          <div class="cat-icon">{{ cat.icon }}</div>
          <h3 class="cat-name title-font">{{ cat.name }}</h3>
          <p class="cat-desc">{{ cat.description }}</p>
          <div class="cat-count">{{ cat.articleCount }} 篇文章</div>
        </div>
      </div>
      <div v-if="currentCategory" class="category-articles">
        <div class="section-header">
          <h2 class="section-title title-font">
            <span class="title-deco"></span>
            {{ currentCategory }} 下的文章
            <span class="title-deco right"></span>
          </h2>
          <button class="btn" @click="currentCategory = ''">查看全部分类</button>
        </div>
        <div v-if="filteredArticles.length" class="article-list">
          <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" />
        </div>
        <div v-else class="empty-state">
          <div class="empty-icon">📭</div>
          <p>该分类下暂无文章</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '../components/common/ArticleCard.vue'
import { categories, getArticlesByCategory } from '../mock/data'
const route = useRoute()
const router = useRouter()
const currentCategory = ref(route.params.name || '')
const filteredArticles = computed(() => currentCategory.value ? getArticlesByCategory(currentCategory.value) : [])
const selectCategory = (name) => { currentCategory.value = name; router.push(`/category/${name}`) }
watch(() => route.params.name, (val) => { currentCategory.value = val || '' })
</script>

<style scoped>
.category-page { min-height: 100vh; }
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 20px; }

.page-header {
  padding: 80px 0 50px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
}
.page-title {
  font-size: 2.5rem;
  color: var(--title-color);
  letter-spacing: 8px;
  margin-bottom: 15px;
}
.title-lotus {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  letter-spacing: 3px;
  font-family: var(--font-kai);
}

.page-body { padding: 50px 20px 70px; }

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
}
.category-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 30px 22px;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  box-shadow: 0 4px 20px var(--shadow-color);
}
.category-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-gold);
  box-shadow: 0 12px 35px var(--shadow-color);
}
.category-card.active {
  border-color: var(--accent-red);
  background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
}
.card-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
}
.corner-tl {
  top: 8px; left: 8px;
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L18 0 M0 0 L0 18' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23B84A3A'/%3E%3C/svg%3E");
}
.corner-br {
  bottom: 8px; right: 8px;
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 18 L0 18 M18 18 L18 0' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='14' cy='14' r='1.5' fill='%23B84A3A'/%3E%3C/svg%3E");
}
.category-card:hover .card-corner { opacity: 1; }
.cat-icon { font-size: 2.6rem; margin-bottom: 14px; }
.cat-name {
  font-size: 1.4rem;
  color: var(--title-color);
  margin: 0 0 10px;
  letter-spacing: 4px;
}
.cat-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0 0 16px;
  line-height: 1.7;
  font-family: var(--font-kai);
}
.cat-count {
  display: inline-block;
  padding: 4px 14px;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-jade));
  color: #fff;
  border-radius: 12px;
  font-size: 0.8rem;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}
.section-title {
  font-size: 1.7rem;
  color: var(--title-color);
  display: flex;
  align-items: center;
  gap: 20px;
  letter-spacing: 4px;
}
.title-deco {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-gold));
}
.title-deco.right {
  background: linear-gradient(90deg, var(--accent-gold), transparent);
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}
.empty-state p {
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .page-title { font-size: 2rem; letter-spacing: 5px; }
  .category-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .section-header { flex-direction: column; gap: 15px; align-items: flex-start; }
}
</style>
