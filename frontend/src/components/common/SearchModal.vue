<template>
  <div class="search-overlay" @click.self="$emit('close')">
    <div class="search-modal">
      <div class="search-header">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input ref="searchInput" v-model="keyword" type="text" class="search-input" placeholder="神识探查...输入关键词搜索文章" @input="handleSearch" @keydown.esc="$emit('close')" />
          <span v-if="keyword" class="search-clear" @click="clearSearch">✕</span>
        </div>
        <div class="search-hint"><kbd>ESC</kbd> 关闭<span class="hint-separator">·</span><kbd>Enter</kbd> 搜索</div>
      </div>
      <div class="search-body">
        <template v-if="!keyword">
          <div v-if="searchHistory.length" class="search-section">
            <div class="section-title"><span>最近搜索</span><button class="clear-btn" @click="clearHistory">清空</button></div>
            <div class="history-tags"><span v-for="item in searchHistory" :key="item" class="history-tag" @click="searchKeyword(item)">{{ item }}</span></div>
          </div>
          <div class="search-section">
            <div class="section-title">热门搜索</div>
            <div class="hot-tags"><span v-for="item in hotKeywords" :key="item" class="hot-tag" @click="searchKeyword(item)"><span class="hot-icon">🔥</span> {{ item }}</span></div>
          </div>
        </template>
        <template v-else>
          <div v-if="searchResults.length > 0" class="search-results">
            <div class="results-count">找到 <span class="count-num">{{ searchResults.length }}</span> 篇相关文章</div>
            <div class="result-list">
              <div v-for="article in searchResults" :key="article.id" class="result-item" @click="goToArticle(article)">
                <div class="result-type"><span class="type-icon">📄</span></div>
                <div class="result-info">
                  <h4 class="result-title" v-html="highlightKeyword(article.title)"></h4>
                  <p class="result-summary" v-html="highlightKeyword(article.summary)"></p>
                  <div class="result-meta"><span>{{ article.category }}</span><span>{{ formatDateCN(article.date) }}</span><span>👁 {{ formatViews(article.views) }}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-results"><div class="no-results-icon">🔮</div><p class="no-results-text">神识探查无果</p><p class="no-results-hint">换个关键词试试吧</p></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'
import { searchArticles, articles } from '../../mock/data'
import { formatDateCN, formatViews } from '../../utils'
const router = useRouter()
const appStore = useAppStore()
const searchInput = ref(null)
const keyword = ref('')
const searchResults = ref([])
const searchHistory = computed(() => appStore.searchHistory)
const hotKeywords = computed(() => {
  const tagCounts = {}
  articles.forEach(a => a.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 }))
  return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag]) => tag)
})
const handleSearch = () => { if (keyword.value.trim()) searchResults.value = searchArticles(keyword.value); else searchResults.value = [] }
const searchKeyword = (kw) => { keyword.value = kw; handleSearch(); appStore.addSearchHistory(kw) }
const clearSearch = () => { keyword.value = ''; searchResults.value = []; searchInput.value?.focus() }
const clearHistory = () => { appStore.clearSearchHistory() }
const goToArticle = (article) => { appStore.addSearchHistory(keyword.value); emit('close'); router.push(`/article/${article.id}`) }
const emit = defineEmits(['close'])
const highlightKeyword = (text) => { if (!keyword.value) return text; const regex = new RegExp(`(${keyword.value})`, 'gi'); return text.replace(regex, '<mark class="highlight">$1</mark>') }
onMounted(() => { searchInput.value?.focus() })
</script>

<style scoped>
.search-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--overlay-bg); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: flex-start; justify-content: center; padding-top: 10vh; animation: fadeIn 0.2s ease; }
.search-modal { width: 90%; max-width: 640px; background: var(--bg-secondary); border: 1px solid var(--accent-gold); border-radius: var(--radius-lg); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden; animation: slideDown 0.3s ease; }
@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.search-header { padding: 20px; border-bottom: 1px solid var(--border-color); }
.search-input-wrapper { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 16px; font-size: 1.2rem; color: var(--text-muted); }
.search-input { width: 100%; padding: 14px 16px 14px 48px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius); font-size: 1rem; color: var(--text-primary); transition: all var(--transition-fast); }
.search-input:focus { border-color: var(--accent-gold); box-shadow: 0 0 0 3px rgba(184, 155, 90, 0.1); }
.search-clear { position: absolute; right: 16px; cursor: pointer; color: var(--text-muted); font-size: 0.9rem; padding: 4px; }
.search-clear:hover { color: var(--accent-red); }
.search-hint { display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 0.8rem; color: var(--text-muted); }
kbd { padding: 2px 8px; background: var(--bg-tertiary); border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }
.hint-separator { color: var(--border-color); }
.search-body { max-height: 50vh; overflow-y: auto; padding: 16px 20px; }
.search-section { margin-bottom: 20px; }
.section-title { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; }
.clear-btn { font-size: 0.8rem; color: var(--accent-red); background: none; border: none; cursor: pointer; }
.history-tags, .hot-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.history-tag, .hot-tag { padding: 6px 14px; background: var(--bg-tertiary); border-radius: 20px; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); }
.history-tag:hover, .hot-tag:hover { background: var(--accent-jade); color: #fff; }
.hot-icon { margin-right: 4px; }
.results-count { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; }
.count-num { color: var(--accent-gold); font-weight: 600; }
.result-list { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; gap: 14px; padding: 14px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius); cursor: pointer; transition: all var(--transition-fast); }
.result-item:hover { border-color: var(--accent-gold); transform: translateX(4px); }
.result-type { flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--bg-tertiary); border-radius: var(--radius); font-size: 1.2rem; }
.result-info { flex: 1; min-width: 0; }
.result-title { font-size: 1rem; color: var(--title-color); margin-bottom: 6px; line-height: 1.4; }
.result-summary { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.result-meta { display: flex; gap: 12px; font-size: 0.75rem; color: var(--text-muted); }
:deep(.highlight) { background: rgba(184, 155, 90, 0.3); color: var(--accent-gold); padding: 0 2px; border-radius: 2px; }
.no-results { text-align: center; padding: 40px 20px; }
.no-results-icon { font-size: 3rem; margin-bottom: 16px; animation: float 2s ease-in-out infinite; }
.no-results-text { font-family: var(--font-title); font-size: 1.2rem; color: var(--title-color); margin-bottom: 8px; }
.no-results-hint { font-size: 0.9rem; color: var(--text-muted); }
</style>
