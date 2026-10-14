<template>
  <div class="archive-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">文章归档</h1>
        <div class="title-lotus">
          <svg width="80" height="16" viewBox="0 0 80 16" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A84C" stroke-width="1" fill="none" opacity="0.7">
              <path d="M0 8 Q13 2 26 8 Q40 14 53 8 Q66 2 80 8" />
              <circle cx="40" cy="8" r="2.5" fill="#B84A3A" opacity="0.8" />
            </g>
          </svg>
        </div>
        <p class="page-subtitle">岁月留痕，记录学习轨迹</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="archive-stats">
        <div class="stat-item">
          <span class="stat-num title-font">{{ totalArticles }}</span>
          <span class="stat-label">篇文章</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num title-font">{{ Object.keys(archives).length }}</span>
          <span class="stat-label">个年度</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num title-font">{{ totalViews }}</span>
          <span class="stat-label">总阅读</span>
        </div>
      </div>
      <div class="archive-timeline">
        <div v-for="(yearData, year) in archives" :key="year" class="year-block">
          <div class="year-header">
            <h2 class="year-title title-font">{{ year }}</h2>
            <span class="year-count">{{ yearData.articles.length }} 篇</span>
          </div>
          <div class="month-list">
            <div v-for="(monthArticles, month) in yearData.months" :key="month" class="month-block">
              <h3 class="month-title">{{ month }}月</h3>
              <ul class="article-list">
                <li v-for="article in monthArticles" :key="article.id" class="archive-item">
                  <span class="article-date">{{ article.date.split('-')[2] }}日</span>
                  <router-link :to="`/article/${article.id}`" class="article-link">{{ article.title }}</router-link>
                  <span class="article-views">👁 {{ formatViews(article.views) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getArchives, articles } from '../mock/data'
import { formatViews } from '../utils'
const archives = computed(() => getArchives())
const totalArticles = computed(() => articles.length)
const totalViews = computed(() => formatViews(articles.reduce((sum, a) => sum + a.views, 0)))
</script>

<style scoped>
.archive-page { min-height: 100vh; }

/* 页面头部 */
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
  top: 0;
  left: 0;
  right: 0;
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

.page-body {
  padding: 50px 20px 70px;
  max-width: 900px;
}

/* 统计区域 */
.archive-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  padding: 35px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  position: relative;
  box-shadow: 0 4px 20px var(--shadow-color);
}
.archive-stats::before {
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
  border-radius: var(--radius) var(--radius) 0 0;
}
.stat-item { text-align: center; }
.stat-num {
  display: block;
  font-size: 2.8rem;
  color: var(--accent-gold);
  margin-bottom: 6px;
  letter-spacing: 2px;
}
.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, var(--border-color), transparent);
}

/* 时间线 */
.archive-timeline {
  position: relative;
  padding-left: 35px;
}
.archive-timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--accent-gold),
    var(--accent-shilu),
    var(--accent-jade),
    transparent);
}
.year-block {
  margin-bottom: 55px;
  position: relative;
}
.year-block::before {
  content: '';
  position: absolute;
  left: -35px;
  top: 10px;
  width: 18px;
  height: 18px;
  background: var(--accent-gold);
  border-radius: 50%;
  border: 3px solid var(--bg-card);
  box-shadow: 0 0 15px rgba(201, 168, 76, 0.4);
}
.year-header {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin-bottom: 28px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}
.year-title {
  font-size: 2.2rem;
  color: var(--title-color);
  letter-spacing: 4px;
}
.year-count {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}
.month-block {
  margin-bottom: 35px;
  padding-left: 24px;
}
.month-title {
  font-size: 1.2rem;
  color: var(--accent-jade);
  margin-bottom: 14px;
  font-family: var(--font-title);
  letter-spacing: 2px;
  padding-left: 12px;
  border-left: 3px solid var(--accent-gold);
}
.article-list { list-style: none; }
.archive-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 18px;
  border-radius: var(--radius);
  transition: all var(--transition-fast);
}
.archive-item:hover {
  background: var(--bg-secondary);
  padding-left: 26px;
}
.article-date {
  font-size: 0.85rem;
  color: var(--text-muted);
  min-width: 50px;
  font-family: var(--font-mono);
}
.article-link {
  flex: 1;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color var(--transition-fast);
}
.article-link:hover {
  color: var(--accent-gold);
}
.article-views {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* 响应式 */
@media (max-width: 600px) {
  .archive-stats { gap: 20px; padding: 25px 20px; }
  .stat-num { font-size: 1.8rem; }
  .stat-divider { height: 35px; }
  .archive-item { flex-wrap: wrap; }
  .article-views { width: 100%; padding-left: 68px; }
}
</style>
