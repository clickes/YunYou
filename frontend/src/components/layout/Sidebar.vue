<template>
  <aside class="sidebar">
    <div class="sidebar-card profile-card">
      <div class="profile-avatar">
        <div class="avatar-circle">
          <span class="avatar-text title-font">云</span>
        </div>
        <div class="avatar-ring"></div>
      </div>
      <h3 class="profile-name title-font">云游</h3>
      <p class="profile-desc">记录技术、生活与学习路上的点滴感悟</p>
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-num title-font">{{ totalArticles }}</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-item">
          <span class="stat-num title-font">{{ totalCategories }}</span>
          <span class="stat-label">分类</span>
        </div>
        <div class="stat-item">
          <span class="stat-num title-font">{{ totalViews }}</span>
          <span class="stat-label">阅读</span>
        </div>
      </div>
      <div class="profile-social">
        <a href="#" class="social-link" title="GitHub">🐙</a>
        <a href="#" class="social-link" title="邮箱">📧</a>
        <a href="#" class="social-link" title="微博">📱</a>
        <a href="#" class="social-link" title="RSS">📡</a>
      </div>
    </div>

    <DailyPoem />

    <!-- 文章分类 -->
    <div class="sidebar-card">
      <h4 class="card-title title-font">
        <span class="title-icon">📚</span> 文章分类
      </h4>
      <ul class="category-list">
        <li v-for="cat in categories" :key="cat.id">
          <router-link :to="`/category/${cat.name}`" class="category-link">
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
            <span class="cat-count">{{ cat.articleCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 归档 -->
    <div class="sidebar-card">
      <h4 class="card-title title-font">
        <span class="title-icon">🗓️</span> 文章归档
      </h4>
      <ul class="archive-list">
        <li v-for="(item, year) in archiveByYear" :key="year">
          <router-link to="/archive" class="archive-link">
            <span class="archive-year title-font">{{ year }}</span>
            <span class="archive-count">{{ item.length }} 篇</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 热门文章 -->
    <div class="sidebar-card">
      <h4 class="card-title title-font">
        <span class="title-icon">🔥</span> 热门文章
      </h4>
      <ul class="hot-list">
        <li v-for="(article, index) in hotArticles" :key="article.id">
          <router-link :to="`/article/${article.id}`" class="hot-link">
            <span class="hot-rank" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
            <span class="hot-title">{{ article.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { categories, articles, getHotArticles } from '../../mock/data'
import { formatViews } from '../../utils'
import DailyPoem from '../common/DailyPoem.vue'

const totalArticles = computed(() => articles.length)
const totalCategories = computed(() => categories.length)
const totalViews = computed(() => formatViews(articles.reduce((sum, a) => sum + a.views, 0)))
const hotArticles = computed(() => getHotArticles(5))
const archiveByYear = computed(() => {
  const map = {}
  articles.forEach(a => {
    const y = a.date.slice(0, 4)
    if (!map[y]) map[y] = []
    map[y].push(a)
  })
  return map
})
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sidebar-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 26px 22px;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}
.sidebar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
  opacity: 0.6;
}
.sidebar-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23C9A84C' stroke-width='1' fill='none' opacity='0.4'%3E%3Cpath d='M24 24 L24 0 M24 24 L0 24'/%3E%3Ccircle cx='18' cy='18' r='1.5' fill='%23B84A3A' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  transition: all var(--transition-fast);
}
.sidebar-card:hover {
  border-color: var(--accent-gold);
  box-shadow: 0 6px 25px var(--shadow-color);
}
.sidebar-card:hover::after { opacity: 1; }
.card-title {
  font-size: 1.15rem;
  color: var(--title-color);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 4px;
  position: relative;
}
.card-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 1px;
  background: var(--accent-gold);
}
.title-icon {
  font-size: 1.2rem;
}
.profile-card {
  text-align: center;
}
.profile-avatar {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 16px;
}
.avatar-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-gold), var(--accent-red));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--bg-card);
  box-shadow: 0 0 0 2px var(--accent-gold), 0 4px 15px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.avatar-text {
  font-size: 2.2rem;
  color: #fff;
}
.avatar-ring {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid var(--accent-gold);
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  to { transform: rotate(360deg); }
}
.profile-name {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 8px;
  letter-spacing: 6px;
}
.profile-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.7;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-top: 1px dashed var(--border-color);
  border-bottom: 1px dashed var(--border-color);
  margin-bottom: 16px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-num {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--accent-red);
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.profile-social {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}
.social-link:hover {
  border-color: var(--accent-red);
  background: var(--accent-red);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(184, 74, 58, 0.3);
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.search-box:hover {
  border-color: var(--accent-gold);
  box-shadow: 0 0 10px rgba(201, 168, 76, 0.2);
}
.search-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 0.9rem;
  color: var(--text-secondary);
  cursor: pointer;
}
.search-hint {
  font-size: 0.7rem;
  color: var(--text-muted);
  padding: 2px 6px;
  background: var(--bg-card);
  border-radius: 2px;
  font-family: var(--font-mono);
  flex-shrink: 0;
}
.category-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0; padding: 0;
}
.category-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
}
.category-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-red);
  padding-left: 18px;
}
.cat-icon { font-size: 1.1rem; }
.cat-name { flex: 1; font-size: 0.9rem; }
.cat-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: 10px;
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-item {
  padding: 5px 12px;
  background: var(--bg-tertiary);
  border-radius: 2px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 1px solid var(--border-light);
  font-family: var(--font-kai);
}
.tag-item:hover {
  background: var(--accent-red);
  color: #fff;
  border-color: var(--accent-red);
  transform: scale(1.05);
}
.hot-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0; padding: 0;
}
.hot-link {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-decoration: none;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}
.hot-link:hover { color: var(--accent-red); }
.hot-rank {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: 2px;
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-shrink: 0;
  font-family: var(--font-kai);
}
.hot-rank.top-three {
  background: linear-gradient(135deg, var(--accent-red), var(--accent-gold));
  color: #fff;
}
.hot-title {
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.recent-comments {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0; padding: 0;
}
.comment-item {
  display: flex;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--border-light);
}
.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.comment-avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-gold), var(--accent-red));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 0.8rem;
  font-family: var(--font-title);
}
.comment-body-sm {
  flex: 1;
  min-width: 0;
}
.comment-author-sm {
  font-size: 0.8rem;
  color: var(--accent-shilu);
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}
.comment-text-sm {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== 公告栏 ===== */
.announce-card {
  background: linear-gradient(160deg, var(--bg-card), var(--bg-secondary));
}
.announce-block {
  text-align: center;
  padding: 8px 0 14px;
}
.announce-divider {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 2px;
  margin: 8px 0;
  font-family: var(--font-kai);
}
.announce-link {
  display: inline-block;
  padding: 4px 12px;
  color: var(--accent-shilu);
  text-decoration: none;
  font-size: 0.88rem;
  border-bottom: 1px dashed var(--accent-gold);
  transition: all var(--transition-fast);
}
.announce-link:hover {
  color: var(--accent-red);
  border-bottom-color: var(--accent-red);
}
.announce-welcome {
  margin-top: 14px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(184,74,58,0.05));
  border-left: 3px solid var(--accent-gold);
  border-radius: 0 var(--radius) var(--radius) 0;
}
.welcome-title {
  font-size: 0.95rem;
  color: var(--accent-red);
  font-family: var(--font-title);
  letter-spacing: 2px;
  margin-bottom: 10px;
  text-align: center;
}
.announce-welcome p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 8px;
}
.announce-welcome strong {
  color: var(--accent-red);
  font-weight: 600;
}

/* ===== 归档 ===== */
.archive-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.archive-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: var(--radius);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.archive-link:hover {
  background: var(--bg-tertiary);
  padding-left: 18px;
}
.archive-year {
  font-size: 1.05rem;
  color: var(--title-color);
  letter-spacing: 2px;
}
.archive-link:hover .archive-year {
  color: var(--accent-red);
}
.archive-count {
  font-size: 0.78rem;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  padding: 2px 10px;
  border-radius: 10px;
}

/* ===== 公告 ===== */
.announce-text {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.9;
  margin: 0;
}

/* ===== 站点统计 ===== */
.site-stats {
  list-style: none;
  margin: 0;
  padding: 0;
}
.site-stats li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-light);
  font-size: 0.88rem;
}
.site-stats li:last-child { border-bottom: none; }
.site-stats span {
  color: var(--text-secondary);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.site-stats em {
  font-style: normal;
  color: var(--accent-red);
  font-family: var(--font-title);
  font-size: 1rem;
}
</style>
