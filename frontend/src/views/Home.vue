<template>
  <div class="home-page">
    <WelcomeAnimation />

    <!-- 顶部梅花雪景横幅 -->
    <section class="plum-banner">
      <PlumBlossomSnow />
      <div class="plum-banner-content">
        <h1 class="plum-title title-font">云游</h1>
        <p class="plum-sub">且将新火试新茶 · 诗酒趁年华</p>
      </div>
    </section>

    <div class="home-bg-decor"></div>

    <div class="container home-main">
      <div class="home-layout">
        <!-- 左侧主内容 -->
        <main class="content-area">
          <!-- 轮播大图 -->
          <div class="hero-carousel">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(item, index) in featuredArticles" :key="item.id" class="carousel-slide">
                <router-link :to="`/article/${item.id}`" class="slide-link">
                  <div class="slide-text">
                    <span class="slide-cat">{{ item.category }}</span>
                    <h3 class="slide-title">{{ item.title }}</h3>
                    <p class="slide-summary">{{ item.summary }}</p>
                    <div class="slide-meta">
                      <span>✍ {{ item.author }}</span>
                      <span>📅 {{ formatDateCN(item.date) }}</span>
                      <span>👁 {{ formatViews(item.views) }}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <button class="carousel-arrow prev" @click="prevSlide">‹</button>
            <button class="carousel-arrow next" @click="nextSlide">›</button>
          </div>

          <!-- 最新文章 两列卡片 -->
          <div class="section-header">
            <h2 class="section-title title-font">
              <span class="title-deco"></span>
              最新文章
              <span class="title-deco right"></span>
            </h2>
            <div class="title-lotus">
              <svg width="60" height="16" viewBox="0 0 60 16" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#C9A84C" stroke-width="1" fill="none" opacity="0.6">
                  <path d="M0 8 Q10 2 20 8 Q30 14 40 8 Q50 2 60 8" />
                  <circle cx="30" cy="8" r="2" fill="#B84A3A" opacity="0.7" />
                </g>
              </svg>
            </div>
          </div>

          <div class="article-grid">
            <ArticleCard v-for="article in pagedArticles" :key="article.id" :article="article" />
          </div>

          <nav v-if="totalPages > 1" class="pagination">
            <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">‹ 上一页</button>
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-btn"
              :class="{ active: p === currentPage }"
              @click="changePage(p)"
            >{{ p }}</button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页 ›</button>
          </nav>
        </main>

        <!-- 右侧边栏 -->
        <Sidebar class="sidebar-area" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ArticleCard from '../components/common/ArticleCard.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import WelcomeAnimation from '../components/common/WelcomeAnimation.vue'
import PlumBlossomSnow from '../components/common/PlumBlossomSnow.vue'
import { articles } from '../mock/data'
import { formatDateCN, formatViews } from '../utils'

const pageSize = 6
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(articles.length / pageSize))
const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return articles.slice(start, start + pageSize)
})
const changePage = (p) => { currentPage.value = p }

const featuredArticles = computed(() => articles.slice(0, 3))
const currentSlide = ref(0)
let slideTimer = null
const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % featuredArticles.value.length }
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + featuredArticles.value.length) % featuredArticles.value.length }
const goToSlide = (i) => { currentSlide.value = i }

onMounted(() => { slideTimer = setInterval(nextSlide, 5000) })
onUnmounted(() => { if (slideTimer) clearInterval(slideTimer) })
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
}
.plum-banner {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.plum-banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 5;
  pointer-events: none;
}
.plum-title {
  font-size: 4.5rem;
  color: #F5F0E6;
  letter-spacing: 20px;
  margin: 0 0 12px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.3);
}
.plum-sub {
  font-size: 1.05rem;
  color: rgba(245, 240, 230, 0.85);
  letter-spacing: 5px;
  font-family: var(--font-kai);
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
  margin: 0;
}
.home-bg-decor {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 20% 10%, rgba(201,168,76,0.08), transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(184,74,58,0.06), transparent 50%),
    var(--bg-primary);
  pointer-events: none;
}
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 20px; }
.home-main { padding: 30px 20px; }
.home-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  align-items: start;
}

/* ===== 轮播 ===== */
.hero-carousel {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 25px var(--shadow-color);
  min-height: 280px;
}
.hero-carousel::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-shilu), var(--accent-gold), var(--accent-lianban), var(--accent-gold), var(--accent-jade));
  z-index: 2;
}
.carousel-track { display: flex; transition: transform 0.6s ease; }
.carousel-slide { min-width: 100%; }
.slide-link {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 40px 50px;
  text-decoration: none;
  color: inherit;
  min-height: 280px;
  background:
    radial-gradient(circle at 90% 20%, rgba(201,168,76,0.12), transparent 50%),
    linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
}
.slide-text { flex: 1; }
.slide-cat {
  display: inline-block;
  padding: 4px 14px;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-jade));
  color: #fff;
  border-radius: 0 12px 12px 0;
  font-size: 0.78rem;
  font-family: var(--font-kai);
  letter-spacing: 2px;
  margin-bottom: 14px;
}
.slide-title {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 12px;
  line-height: 1.4;
  font-family: var(--font-title);
  letter-spacing: 1px;
}
.slide-summary {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.slide-meta {
  display: flex;
  gap: 18px;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid var(--accent-gold);
  background: var(--bg-card);
  color: var(--accent-gold);
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 3;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-arrow:hover { background: var(--accent-gold); color: #fff; }
.carousel-arrow.prev { left: 12px; }
.carousel-arrow.next { right: 12px; }
.carousel-dots-v {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;
}
.dot-v {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-color);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.dot-v.active {
  height: 24px;
  border-radius: 4px;
  background: var(--accent-red);
}

/* ===== 文章两列网格 ===== */
.section-header {
  text-align: center;
  margin: 30px 0 24px;
}
.section-title {
  font-size: 1.8rem;
  color: var(--title-color);
  display: inline-flex;
  align-items: center;
  gap: 18px;
  letter-spacing: 5px;
}
.title-deco {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-gold));
}
.title-deco.right {
  background: linear-gradient(90deg, var(--accent-gold), transparent);
}
.title-lotus { display: flex; justify-content: center; margin-top: 8px; }
.article-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
}
.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-family: var(--font-kai);
  letter-spacing: 1px;
  transition: all var(--transition-fast);
}
.page-btn:hover:not(:disabled):not(.active) {
  border-color: var(--accent-gold);
  color: var(--accent-red);
}
.page-btn.active {
  background: linear-gradient(135deg, var(--accent-red), var(--accent-zhusha));
  color: #fff;
  border-color: var(--accent-red);
  box-shadow: 0 3px 10px rgba(184, 74, 58, 0.3);
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
  .home-layout { grid-template-columns: 1fr; }
  .sidebar-area { order: -1; }
}
@media (max-width: 768px) {
  .article-grid { grid-template-columns: 1fr; }
  .slide-link { flex-direction: column; padding: 30px 24px; text-align: center; }
  .carousel-dots-v { flex-direction: row; right: 50%; transform: translateX(50%); top: auto; bottom: 12px; }
  .dot-v.active { width: 24px; height: 8px; }
}
.sidebar-area {
  position: sticky;
  top: calc(var(--nav-height) + 20px);
  align-self: start;
}
</style>
