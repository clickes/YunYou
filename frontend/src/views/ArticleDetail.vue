<template>
  <div class="article-detail-page" v-if="article">
    <div class="article-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="article-breadcrumb"><router-link to="/">首页</router-link><span class="separator">/</span><router-link :to="`/category/${article.category}`">{{ article.category }}</router-link></div>
        <h1 class="article-title title-font">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-item"><span class="meta-icon">👤</span>{{ article.author }}</span>
          <span class="meta-item"><span class="meta-icon">📅</span>{{ formatDateCN(article.date) }}</span>
          <span class="meta-item"><span class="meta-icon">👁</span>{{ formatViews(article.views) }} 阅读</span>
          <span class="meta-item"><span class="meta-icon">⏱</span>{{ calcReadTime(article.wordCount) }}</span>
        </div>
      </div>
    </div>
    <div class="article-body container">
      <div class="article-layout">
        <div class="article-content-area">
          <div class="reading-toolbar">
            <div class="toolbar-left">
              <button class="toolbar-btn" :class="{ active: isVerticalMode }" @click="toggleVertical" title="竖排阅读">
                <span class="toolbar-icon">📜</span>
                <span class="toolbar-text">{{ isVerticalMode ? '横排' : '竖排' }}</span>
              </button>
            </div>
            <div class="toolbar-right">
              <FontSwitcher />
            </div>
          </div>
          <article class="article-content" :class="{ 'vertical-mode': isVerticalMode }" v-html="renderedContent"></article>
          <div class="article-tags">
            <span class="tags-label">标签：</span>
            <router-link v-for="tag in article.tags" :key="tag" :to="`/tag/${tag}`" class="article-tag"># {{ tag }}</router-link>
          </div>
          <div class="article-actions">
            <button class="action-btn" :class="{ active: appStore.isLiked(article.id) }" @click="handleLike">
              <span class="action-icon">{{ appStore.isLiked(article.id) ? '❤️' : '🤍' }}</span>
              <span class="action-count">{{ article.likes + (appStore.isLiked(article.id) ? 1 : 0) }}</span>
              <span class="action-text">点赞</span>
            </button>
            <button class="action-btn" :class="{ active: appStore.isFavorite(article.id) }" @click="handleFavorite">
              <span class="action-icon">{{ appStore.isFavorite(article.id) ? '⭐' : '☆' }}</span>
              <span class="action-text">{{ appStore.isFavorite(article.id) ? '已收藏' : '收藏' }}</span>
            </button>
            <button class="action-btn" @click="handleShare"><span class="action-icon">🔗</span><span class="action-text">分享</span></button>
          </div>
          <div class="article-nav">
            <div v-if="prevArticle" class="nav-item prev"><span class="nav-label">上一篇</span><router-link :to="`/article/${prevArticle.id}`" class="nav-link">{{ prevArticle.title }}</router-link></div>
            <div v-if="nextArticle" class="nav-item next"><span class="nav-label">下一篇</span><router-link :to="`/article/${nextArticle.id}`" class="nav-link">{{ nextArticle.title }}</router-link></div>
          </div>
          <div v-if="relatedArticles.length > 0" class="related-section">
            <h3 class="related-title title-font"><span class="title-icon">📖</span> 相关推荐</h3>
            <div class="related-list">
              <router-link v-for="item in relatedArticles" :key="item.id" :to="`/article/${item.id}`" class="related-card">
                <div class="related-card-header">
                  <span class="related-category">{{ item.category }}</span>
                  <span class="related-views">{{ formatViews(item.views) }} 阅读</span>
                </div>
                <h4 class="related-card-title">{{ item.title }}</h4>
                <p class="related-card-summary">{{ item.summary }}</p>
              </router-link>
            </div>
          </div>
          <div class="comments-section">
            <h3 class="comments-title title-font">评论交流 ({{ comments.length }})</h3>
            <div class="comment-form">
              <textarea v-model="newComment" placeholder="留下你的见解..." class="comment-input" rows="3"></textarea>
              <div class="comment-actions"><button class="btn btn-primary" @click="submitComment">发表评论</button></div>
            </div>
            <div class="comment-list">
              <div v-for="comment in localComments" :key="comment.id" class="comment-item">
                <div class="comment-avatar"><span class="avatar-letter">{{ comment.author.charAt(0) }}</span></div>
                <div class="comment-body">
                  <div class="comment-header"><span class="comment-author">{{ comment.author }}</span><span v-if="comment.isAuthor" class="author-badge">作者</span><span class="comment-date">{{ comment.date }}</span></div>
                  <p class="comment-content">{{ comment.content }}</p>
                  <div class="comment-footer"><button class="comment-like" @click="comment.likes++"><span>👍</span> {{ comment.likes }}</button><button class="comment-reply">回复</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-area">
          <ArticleToc content-selector=".article-content" />
          <Sidebar />
        </div>
      </div>
    </div>
    <FloatingToolbar @toggle-toc="handleTocToggle" />
  </div>
  <div v-else class="not-found container"><p>文章不存在</p></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import Sidebar from '../components/layout/Sidebar.vue'
import ArticleToc from '../components/common/ArticleToc.vue'
import FloatingToolbar from '../components/common/FloatingToolbar.vue'
import FontSwitcher from '../components/common/FontSwitcher.vue'
import { getArticleById, articles, comments as mockComments } from '../mock/data'
import { useAppStore } from '../stores/app'
import { formatDateCN, formatViews, calcReadTime, copyToClipboard } from '../utils'
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const searchState = inject('searchState')
const article = computed(() => getArticleById(route.params.id))
const renderedContent = computed(() => article.value ? marked(article.value.content) : '')
const comments = computed(() => mockComments[route.params.id] || [])
const localComments = ref([...comments.value])
const newComment = ref('')
const isVerticalMode = ref(false)
const toggleVertical = () => { isVerticalMode.value = !isVerticalMode.value }
const prevArticle = computed(() => { const idx = articles.findIndex(a => a.id === parseInt(route.params.id)); return idx > 0 ? articles[idx - 1] : null })
const nextArticle = computed(() => { const idx = articles.findIndex(a => a.id === parseInt(route.params.id)); return idx < articles.length - 1 ? articles[idx + 1] : null })
const relatedArticles = computed(() => {
  if (!article.value) return []
  const currentTags = article.value.tags
  const currentCategory = article.value.category
  return articles
    .filter(a => a.id !== article.value.id)
    .map(a => {
      let score = 0
      if (a.category === currentCategory) score += 2
      a.tags.forEach(t => { if (currentTags.includes(t)) score += 1 })
      return { ...a, score }
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
})
const handleLike = () => { appStore.toggleLike(article.value.id) }
const handleFavorite = () => { appStore.toggleFavorite(article.value.id) }
const handleShare = async () => { await copyToClipboard(window.location.href); alert('链接已复制到剪贴板') }
const submitComment = () => { if (!newComment.value.trim()) return; localComments.value.unshift({ id: Date.now(), author: '匿名访客', content: newComment.value, date: new Date().toLocaleDateString(), likes: 0, replies: [] }); newComment.value = '' }
const handleCopy = (e) => {
  const selection = window.getSelection()
  const selectedText = selection.toString()
  if (selectedText.length < 20) return
  e.preventDefault()
  const copyright = `\n\n—— 原文出自「云游博客」\n作者：${article.value?.author || '云游'}\n链接：${window.location.href}\n转载请注明出处。`
  const textWithCopyright = selectedText + copyright
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textWithCopyright)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = textWithCopyright
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
const handleTocToggle = (open) => {
  const tocEl = document.querySelector('.article-toc')
  if (tocEl) {
    tocEl.style.display = open ? 'block' : 'none'
  }
}
const handleKeydown = (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return
  if (e.key === 'j' && prevArticle.value) {
    router.push(`/article/${prevArticle.value.id}`)
  } else if (e.key === 'k' && nextArticle.value) {
    router.push(`/article/${nextArticle.value.id}`)
  } else if (e.key === '/') {
    e.preventDefault()
    searchState.openSearch()
  } else if (e.key === 't') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
watch(() => route.params.id, () => { localComments.value = [...(mockComments[route.params.id] || [])] })
onMounted(() => {
  const contentEl = document.querySelector('.article-content')
  if (contentEl) contentEl.addEventListener('copy', handleCopy)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  const contentEl = document.querySelector('.article-content')
  if (contentEl) contentEl.removeEventListener('copy', handleCopy)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.article-detail-page { min-height: 100vh; }

/* ===== 文章头部 Hero ===== */
.article-hero {
  position: relative;
  padding: 90px 0 70px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  overflow: hidden;
}
.article-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg,
    var(--accent-shilu) 0%,
    var(--accent-gold) 25%,
    var(--accent-lianban) 50%,
    var(--accent-gold) 75%,
    var(--accent-jade) 100%);
  opacity: 0.7;
}
.article-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(42, 122, 154, 0.08), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(74, 138, 122, 0.08), transparent 50%),
    radial-gradient(circle at 50% 0%, rgba(201, 168, 76, 0.1), transparent 40%);
}
.hero-content { position: relative; z-index: 1; }
.article-breadcrumb {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 24px;
  font-family: var(--font-kai);
}
.article-breadcrumb a { color: var(--text-muted); transition: color var(--transition-fast); }
.article-breadcrumb a:hover { color: var(--accent-gold); }
.separator { margin: 0 10px; color: var(--accent-gold); opacity: 0.5; }

/* 标题莲花装饰 */
.article-title {
  font-size: 2.8rem;
  color: var(--title-color);
  line-height: 1.4;
  margin-bottom: 28px;
  letter-spacing: 3px;
  position: relative;
  padding-bottom: 20px;
}
.article-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-gold), transparent 60%);
}
.article-title::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 80px;
  height: 1px;
  background: var(--accent-gold);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: var(--font-kai);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(245, 239, 224, 0.5);
  border-radius: 20px;
  border: 1px solid var(--border-light);
}

/* ===== 文章主体 ===== */
.article-body { padding: 50px 20px; }
.article-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}
.article-content-area { min-width: 0; }

/* 阅读工具栏 */
.reading-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  margin-bottom: 28px;
  position: sticky;
  top: calc(var(--nav-height) + 10px);
  z-index: 10;
  box-shadow: 0 2px 10px var(--shadow-color);
}
.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: var(--font-kai);
}
.toolbar-btn:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}
.toolbar-btn.active {
  background: linear-gradient(135deg, var(--accent-red), #9A3020);
  border-color: var(--accent-red);
  color: #fff;
}
.toolbar-icon { font-size: 1rem; }

/* 竖排模式 */
.article-content.vertical-mode {
  writing-mode: vertical-rl;
  text-orientation: upright;
  height: 70vh;
  overflow-x: auto;
  overflow-y: hidden;
  line-height: 2.2;
  letter-spacing: 4px;
  padding: 20px 0;
}
.article-content.vertical-mode :deep(h2) {
  margin: 0 20px;
  border-bottom: none;
  border-left: 3px solid var(--accent-gold);
  padding-bottom: 0;
  padding-left: 10px;
}
.article-content.vertical-mode :deep(p) {
  margin: 0 20px;
}
.article-content.vertical-mode :deep(ul),
.article-content.vertical-mode :deep(ol) {
  padding-left: 0;
  padding-right: 24px;
  margin: 0 20px;
}
.article-content.vertical-mode :deep(blockquote) {
  border-left: none;
  border-right: 4px solid var(--accent-gold);
  margin: 0 20px;
  padding: 12px 16px;
}
.sidebar-area { display: flex; flex-direction: column; gap: 20px; }

/* 正文样式 - 敦煌信笺 */
.article-content {
  font-size: 1.08rem;
  line-height: 2;
  color: var(--text-primary);
  background: var(--bg-card);
  padding: 40px 50px;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  position: relative;
  box-shadow: 0 4px 20px var(--shadow-color);
}
.article-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
  border-radius: var(--radius) var(--radius) 0 0;
}
.article-content :deep(h2) {
  font-family: var(--font-title);
  font-size: 1.7rem;
  color: var(--title-color);
  margin: 36px 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  letter-spacing: 2px;
}
.article-content :deep(h2)::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--accent-gold);
}
.article-content :deep(h3) {
  font-size: 1.35rem;
  color: var(--title-color);
  margin: 28px 0 14px;
  padding-left: 12px;
  border-left: 3px solid var(--accent-red);
}
.article-content :deep(p) { margin-bottom: 18px; text-indent: 2em; }
.article-content :deep(code) {
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--accent-red);
}
.article-content :deep(pre) {
  background: var(--bg-tertiary);
  padding: 18px;
  border-radius: var(--radius);
  overflow-x: auto;
  margin: 18px 0;
  border: 1px solid var(--border-color);
}
.article-content :deep(pre code) { background: none; padding: 0; color: var(--text-primary); }
.article-content :deep(ul), .article-content :deep(ol) {
  padding-left: 28px;
  margin-bottom: 18px;
}
.article-content :deep(li) { margin-bottom: 10px; }
.article-content :deep(blockquote) {
  border-left: 4px solid var(--accent-gold);
  padding: 14px 22px;
  background: linear-gradient(90deg, rgba(201, 168, 76, 0.08), transparent);
  margin: 20px 0;
  color: var(--text-secondary);
  font-style: italic;
}

/* 文章标签 */
.article-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 45px 0;
  padding: 22px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
.tags-label {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.article-tag {
  padding: 5px 14px;
  background: var(--bg-tertiary);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
}
.article-tag:hover {
  background: linear-gradient(135deg, var(--accent-jade), var(--accent-shilu));
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(74, 138, 122, 0.3);
}

/* 文章操作按钮 */
.article-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 45px;
}
.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 28px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 90px;
  box-shadow: 0 2px 8px var(--shadow-color);
}
.action-btn:hover {
  border-color: var(--accent-gold);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--shadow-color);
}
.action-btn.active {
  border-color: var(--accent-red);
  background: rgba(184, 74, 58, 0.05);
}
.action-icon { font-size: 1.5rem; }
.action-count { font-size: 0.9rem; color: var(--text-secondary); }
.action-text { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-kai); }

/* 上下篇导航 */
.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 45px;
}
.nav-item {
  padding: 18px 22px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}
.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--accent-gold);
}
.nav-item:hover {
  border-color: var(--accent-gold);
  box-shadow: 0 4px 15px var(--shadow-color);
}
.nav-item.next { text-align: right; }
.nav-item.next::before {
  left: auto;
  right: 0;
}
.nav-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.nav-link {
  color: var(--title-color);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.6;
}
.nav-link:hover { color: var(--accent-gold); }

/* 相关推荐 */
.related-section { margin-bottom: 45px; }
.related-title {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 3px;
}
.related-title::after {
  content: '';
  position: absolute;
}
.title-icon { font-size: 1.2rem; }
.related-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.related-card {
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  text-decoration: none;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}
.related-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-shilu), var(--accent-gold), var(--accent-jade));
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.related-card:hover {
  border-color: var(--accent-gold);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px var(--shadow-color);
}
.related-card:hover::before { opacity: 1; }
.related-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.related-category {
  font-size: 0.75rem;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-jade));
  padding: 3px 10px;
  border-radius: 0 10px 10px 0;
  font-family: var(--font-kai);
}
.related-views { font-size: 0.75rem; color: var(--text-muted); }
.related-card-title {
  font-size: 1rem;
  color: var(--title-color);
  margin-bottom: 10px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.related-card-summary {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 评论区 */
.comments-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 35px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
}
.comments-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
}
.comments-title {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 3px;
}
.comment-form { margin-bottom: 35px; }
.comment-input {
  width: 100%;
  padding: 14px 18px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-primary);
  resize: vertical;
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  line-height: 1.8;
}
.comment-input:focus {
  border-color: var(--accent-gold);
  box-shadow: 0 0 10px rgba(201, 168, 76, 0.15);
  outline: none;
}
.comment-actions { text-align: right; margin-top: 14px; }
.comment-list { display: flex; flex-direction: column; gap: 28px; }
.comment-item {
  display: flex;
  gap: 16px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border-light);
}
.comment-item:last-child { border-bottom: none; padding-bottom: 0; }
.comment-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-gold), var(--accent-jade), var(--accent-shilu));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.avatar-letter {
  color: #fff;
  font-size: 1.2rem;
  font-family: var(--font-title);
}
.comment-body { flex: 1; min-width: 0; }
.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.comment-author {
  font-weight: 600;
  color: var(--title-color);
  font-family: var(--font-kai);
}
.author-badge {
  padding: 2px 10px;
  background: linear-gradient(135deg, var(--accent-red), #9A3020);
  color: #fff;
  font-size: 0.7rem;
  border-radius: 10px;
}
.comment-date { font-size: 0.8rem; color: var(--text-muted); }
.comment-content {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 12px;
}
.comment-footer { display: flex; gap: 20px; }
.comment-like, .comment-reply {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color var(--transition-fast);
}
.comment-like:hover, .comment-reply:hover { color: var(--accent-gold); }

/* 响应式 */
@media (max-width: 900px) {
  .article-layout { grid-template-columns: 1fr; }
  .sidebar-area { order: -1; }
  .article-title { font-size: 2rem; }
  .article-nav { grid-template-columns: 1fr; }
  .article-content { padding: 28px 24px; }
  .related-list { grid-template-columns: 1fr; }
}
</style>
